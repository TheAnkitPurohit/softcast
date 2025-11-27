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
