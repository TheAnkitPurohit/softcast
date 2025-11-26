import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IVideo extends Document {
  title: string
  description?: string
  key: string
  s3Url: string
  fileSize: number
  contentType: string
  duration?: number
  thumbnailUrl?: string
  userId: string
  isPublic: boolean
  tags: string[]
  views: number
  likes: number
  viewers?: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const VideoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    key: {
      type: String,
      required: [true, 'File name is required'],
    },
    s3Url: {
      type: String,
      required: [true, 'S3 URL is required'],
    },
    fileSize: {
      type: Number,
      required: [true, 'File size is required'],
    },
    contentType: {
      type: String,
      required: [true, 'Content type is required'],
    },
    duration: {
      type: Number,
      min: [0, 'Duration cannot be negative'],
    },
    thumbnailUrl: {
      type: String,
    },
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    likes: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative'],
    },
    viewers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Create indexes for better query performance
VideoSchema.index({ userId: 1, createdAt: -1 })
VideoSchema.index({ isPublic: 1, createdAt: -1 })
VideoSchema.index({ tags: 1 })
VideoSchema.index({ title: 'text', description: 'text' })

export default mongoose.models.Video ||
  mongoose.model<IVideo>('Video', VideoSchema)
