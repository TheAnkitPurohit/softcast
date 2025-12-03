'use server'

import { headers } from 'next/headers'

import { auth } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Video from '@/models/Video.model'

export const getVideoById = async (id: string, viewerClerkId?: string) => {
  await dbConnect()

  // Find the video
  let video = await Video.findById(id, { key: 0 })

  if (!video) return null

  // If a logged-in user (by clerkId) views the video, add them to viewers if missing
  if (viewerClerkId && viewerClerkId != video?.userId) {
    // // Resolve the user document from clerkId
    // const viewerUser = await User.findOne(
    //   { clerkId: viewerClerkId },
    //   '_id clerkId firstName lastName avatarUrl'
    // )
    // if (viewerUser) {
    //   const viewerId = viewerUser._id
    //   // Normalize current viewers to an array of strings (to handle populated docs or ObjectIds)
    //   const currentViewerIds = (video.viewers || []).map((v: IUser) =>
    //     String(v._id ?? v)
    //   )
    //   if (!currentViewerIds.includes(String(viewerId))) {
    //     // Add the viewer and increment views
    //     video.viewers = [...(video.viewers || []), viewerId]
    //     video.views = (video.views || 0) + 1
    //     await video.save()
    //   }
    // }
  }

  // Return video with owner details attached
  return {
    ...video.toObject(),
  }
}

export const updateVideoTitle = async (
  videoId: string,
  newTitle: string,
  userId: string
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.session?.userId) {
      console.log('No session found')
      return { success: false, error: 'Unauthorized' }
    }

    await dbConnect()

    // Find the video
    const video = await Video.findById(videoId)
    if (!video) {
      return { success: false, error: 'Video not found' }
    }

    // Validate title
    if (!newTitle || newTitle.trim().length === 0) {
      return { success: false, error: 'Title cannot be empty' }
    }

    if (newTitle.length > 100) {
      return { success: false, error: 'Title cannot exceed 100 characters' }
    }

    // Update the title
    video.title = newTitle.trim()
    await video.save()

    return { success: true, title: video.title }
  } catch (error) {
    console.error('Error updating video title:', error)
    return { success: false, error: 'Failed to update title' }
  }
}
