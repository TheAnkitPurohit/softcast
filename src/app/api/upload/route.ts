import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only video files are allowed.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileName = `screen-recordings/${timestamp}-${file.name}`

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to S3
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        fileSize: file.size.toString(),
      },
    })

    await s3Client.send(uploadCommand)

    // Generate the S3 URL
    const s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        fileName,
        s3Url,
        fileSize: file.size,
        contentType: file.type,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
