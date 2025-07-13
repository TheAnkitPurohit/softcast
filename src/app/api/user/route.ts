import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User.model'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()

    const type = body?.type
    const newUserBody = body?.data

    const firstName = newUserBody?.first_name
    const lastName = newUserBody?.last_name
    const imageUrl = newUserBody?.image_url
    const id = newUserBody?.id

    if (type === 'user.created') {
      const emailAddress = newUserBody?.email_addresses?.[0]?.email_address

      const user = new User({
        clerkId: id,
        email: emailAddress,
        firstName: firstName,
        lastName: lastName,
        avatarUrl: imageUrl,
      })

      await user.save()

      return NextResponse.json({ message: 'User created' }, { status: 200 })
    }

    if (type === 'user.updated') {
      const user = await User.findOne({ clerkId: id })

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }

      user.firstName = firstName
      user.lastName = lastName
      user.avatarUrl = imageUrl

      await user.save()

      return NextResponse.json({ message: 'User updated' }, { status: 200 })
    }

    if (type === 'user.deleted') {
      const user = await User.findOne({ clerkId: id })

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }

      await user.deleteOne({ clerkId: id })

      return NextResponse.json({ message: 'User deleted' }, { status: 200 })
    }

    return NextResponse.json({ message: 'No type provided' }, { status: 500 })
  } catch (error) {
    console.error('Error creating/updating user:', error)
    return NextResponse.json(
      { error: 'Failed to create/update user' },
      { status: 500 }
    )
  }
}
