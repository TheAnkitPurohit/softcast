import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongodb'
import Video from '@/models/Video.model'

// GET /api/videos/[id] - Get a specific video
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const video = await Video.findById(params.id).lean()

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    // Increment views
    await Video.findByIdAndUpdate(params.id, { $inc: { views: 1 } })

    return NextResponse.json({
      success: true,
      data: video,
    })
  } catch (error) {
    console.error('Error fetching video:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    )
  }
}

// PUT /api/videos/[id] - Update a video
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    // Check if video exists and user owns it
    const existingVideo = await Video.findById(params.id)

    if (!existingVideo) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    if (existingVideo.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { title, description, isPublic, tags, thumbnailUrl } = body

    // Update video
    const updatedVideo = await Video.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        isPublic,
        tags,
        thumbnailUrl,
      },
      { new: true, runValidators: true }
    )

    return NextResponse.json({
      success: true,
      message: 'Video updated successfully',
      data: updatedVideo,
    })
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    )
  }
}

// DELETE /api/videos/[id] - Delete a video
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    // Check if video exists and user owns it
    const video = await Video.findById(params.id)

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    if (video.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete video
    await Video.findByIdAndDelete(params.id)

    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    )
  }
}
