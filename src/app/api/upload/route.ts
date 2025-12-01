import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import {
  convertWebmToMp4,
  generateThumbnailFromBuffer,
} from '@/lib/video-utils'
import Video from '@/models/Video.model'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const userId = session?.user?.id

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file)
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only video files are allowed.' },
        { status: 400 }
      )
    }

    // read bytes
    let buffer = Buffer.from(await file.arrayBuffer())
    let contentType = file.type
    let fileName = file.name || `recording-${Date.now()}.webm`

    // convert webm -> mp4 when applicable
    const shouldConvert =
      file.type === 'video/webm' || file.name?.toLowerCase().endsWith('.webm')
    if (shouldConvert) {
      try {
        console.log('Trying to convert to mp4')
        const converted = await convertWebmToMp4(buffer)
        if (converted && converted.length > 0) {
          // ensure we assign a Buffer<ArrayBuffer> (create a new Buffer from the converted data)
          buffer = Buffer.from(converted)
          contentType = 'video/mp4'
          fileName = fileName.replace(/\.webm$/i, '') + '.mp4'
        }

        console.log('mp4 converted')
      } catch (err) {
        console.warn('FFmpeg conversion failed, uploading original file:', err)
      }
    }

    // Thumbnail: prefer provided thumbnail
    let thumbnailUrl: string | undefined
    const providedThumb = formData.get('thumbnail') as File | null
    if (providedThumb && providedThumb.size > 0) {
      try {
        const thumbBuffer = Buffer.from(await providedThumb.arrayBuffer())
        const thumbKey = `thumbnails/${userId}/${Date.now()}-${providedThumb.name || 'thumb.png'}`
        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: thumbKey,
            Body: thumbBuffer,
            ContentType: providedThumb.type || 'image/png',
          })
        )

        thumbnailUrl = `${process.env.AWS_CLOUDFRONT_URL}/${thumbKey}`
      } catch (err) {
        console.warn('Failed to upload provided thumbnail (continuing):', err)
      }
    } else {
      try {
        const thumb = await generateThumbnailFromBuffer(buffer)
        if (thumb?.buffer) {
          const thumbKey = `thumbnails/${userId}/${Date.now()}-${thumb.fileName}`
          await s3Client.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET_NAME!,
              Key: thumbKey,
              Body: thumb.buffer,
              ContentType: 'image/png',
            })
          )

          thumbnailUrl = `${process.env.AWS_CLOUDFRONT_URL}/${thumbKey}`
        }
      } catch (err) {
        console.warn('Thumbnail generation failed (continuing):', err)
      }
    }

    // Upload video
    const timestamp = Date.now()
    const key = `screen-recordings/${userId}/${timestamp}-${fileName}`

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        Metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
          fileSize: buffer.length.toString(),
        },
      })
    )

    const url = `${process.env.AWS_CLOUDFRONT_URL}/${key}`

    const title = `New Message - ${new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })}`

    const video = new Video({
      title,
      key,
      url,
      fileSize: buffer.length,
      contentType,
      thumbnailUrl,
      userId,
    })

    const savedVideo = await video.save()

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: { id: savedVideo._id },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
