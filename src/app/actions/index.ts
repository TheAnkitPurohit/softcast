'use server'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User.model'
import Video from '@/models/Video.model'

export const getVideoById = async (id: string) => {
  await dbConnect()
  const video = await Video.findById(id, {
    key: 0,
  })
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
