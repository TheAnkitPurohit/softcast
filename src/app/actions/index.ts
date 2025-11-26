'use server'

import dbConnect from '@/lib/mongodb'
import User, { IUser } from '@/models/User.model'
import Video from '@/models/Video.model'

export const getVideoById = async (id: string, viewerClerkId?: string) => {
  await dbConnect()

  // Find the video and populate viewers for display
  let video = await Video.findById(id, { key: 0 })

  if (!video) return null

  // If a logged-in user (by clerkId) views the video, add them to viewers if missing
  if (viewerClerkId) {
    // Resolve the user document from clerkId
    const viewerUser = await User.findOne(
      { clerkId: viewerClerkId },
      '_id clerkId firstName lastName avatarUrl'
    )
    if (viewerUser) {
      const viewerId = viewerUser._id

      // Normalize current viewers to an array of strings (to handle populated docs or ObjectIds)
      const currentViewerIds = (video.viewers || []).map((v: IUser) =>
        String(v._id ?? v)
      )
      if (!currentViewerIds.includes(String(viewerId))) {
        // Add the viewer and increment views
        video.viewers = [...(video.viewers || []), viewerId]
        video.views = (video.views || 0) + 1
        await video.save()

        // repopulate viewers to include user fields for the updated entry
      }
    }
  }

  return video
}

export const getUserById = async (id: string) => {
  await dbConnect()
  const user = await User.findOne(
    { clerkId: id },
    {
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      avatarUrl: 1,
      isActive: 1,
    }
  )

  if (user) {
    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      isActive: user.isActive,
    }
  }

  return null
}
