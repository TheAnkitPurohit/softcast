import { S3Client } from '@aws-sdk/client-s3'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongodb'
import Video from '@/models/Video.model'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

interface VideoQuery {
  userId?: string
  isPublic?: boolean
  $text?: { $search: string }
  tags?: { $in: string[] }
}

// GET /api/videos - Get all videos (with pagination and filtering)
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    console.log({ userId })

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build query
    const query: VideoQuery = {}

    if (search) {
      query.$text = { $search: search }
    }

    query.userId = userId

    // Execute query with pagination
    const videos = await Video.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count for pagination
    const total = await Video.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: {
        videos,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

// // POST /api/videos - Create a new video
// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth()

//     if (!userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     await dbConnect()

//     const body = await request.json()
//     const {
//       title,
//       description,
//       fileName,
//       s3Url,
//       fileSize,
//       contentType,
//       duration,
//       thumbnailUrl,
//       isPublic = true,
//       tags = [],
//     } = body

//     // Validate required fields
//     if (!title || !fileName || !s3Url || !fileSize || !contentType) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       )
//     }

//     // Create new video
//     let finalThumbnailUrl = thumbnailUrl
//     if (!finalThumbnailUrl && s3Url) {
//       try {
//         // fetch remote video from S3 (public URL) and generate thumbnail
//         const resp = await fetch(s3Url)
//         if (resp.ok) {
//           const ab = await resp.arrayBuffer()
//           const buf = Buffer.from(ab)
//           const thumb = await generateThumbnailFromBuffer(buf)
//           if (thumb?.buffer) {
//             const thumbKey = `thumbnails/${userId}/${Date.now()}-${thumb.fileName}`
//             await s3Client.send(
//               new PutObjectCommand({
//                 Bucket: process.env.AWS_S3_BUCKET_NAME!,
//                 Key: thumbKey,
//                 Body: thumb.buffer,
//                 ContentType: 'image/png',
//               })
//             )
//             finalThumbnailUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${thumbKey}`
//           }
//         }
//       } catch (e) {
//         console.warn(
//           'Failed to generate thumbnail for provided s3Url (continuing):',
//           e
//         )
//       }
//     }

//     const video = new Video({
//       title,
//       description,
//       fileName,
//       s3Url,
//       fileSize,
//       contentType,
//       duration,
//       thumbnailUrl: finalThumbnailUrl,
//       userId,
//       isPublic,
//       tags,
//     })

//     await video.save()

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Video created successfully',
//         data: video,
//       },
//       { status: 201 }
//     )
//   } catch (error) {
//     console.error('Error creating video:', error)
//     return NextResponse.json(
//       { error: 'Failed to create video' },
//       { status: 500 }
//     )
//   }
// }
