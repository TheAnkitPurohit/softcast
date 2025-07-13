import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongodb'
import Video from '@/models/Video.model'

interface VideoQuery {
  userId?: string
  isPublic?: boolean
  $text?: { $search: string }
  tags?: { $in: string[] }
}

// GET /api/videos - Get all videos (with pagination and filtering)
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

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

// POST /api/videos - Create a new video
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const body = await request.json()
    const {
      title,
      description,
      fileName,
      s3Url,
      fileSize,
      contentType,
      duration,
      thumbnailUrl,
      isPublic = true,
      tags = [],
    } = body

    // Validate required fields
    if (!title || !fileName || !s3Url || !fileSize || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new video
    const video = new Video({
      title,
      description,
      fileName,
      s3Url,
      fileSize,
      contentType,
      duration,
      thumbnailUrl,
      userId,
      isPublic,
      tags,
    })

    await video.save()

    return NextResponse.json(
      {
        success: true,
        message: 'Video created successfully',
        data: video,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}
