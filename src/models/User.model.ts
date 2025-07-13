import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  clerkId: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  bio?: string
  isActive: boolean
  preferences: {
    emailNotifications: boolean
    publicProfile: boolean
  }
  stats: {
    totalVideos: number
    totalViews: number
    totalLikes: number
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: [true, 'Clerk ID is required'],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot be more than 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot be more than 50 characters'],
    },
    avatarUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
