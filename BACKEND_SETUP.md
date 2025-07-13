# Backend Setup Guide

This guide will help you set up the MongoDB backend for your Softcast project.

## Prerequisites

1. Node.js and pnpm installed
2. MongoDB database (local or MongoDB Atlas)
3. Clerk authentication setup (already configured)

## Installation

1. Install the new dependencies:

```bash
pnpm install
```

2. Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/softcast
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/softcast

# AWS S3 Configuration (existing)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name

# Clerk Configuration (existing)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Database Models

### Video Model

- `title`: Video title (required)
- `description`: Video description (optional)
- `fileName`: Original file name (required)
- `s3Url`: S3 URL for the video (required)
- `fileSize`: File size in bytes (required)
- `contentType`: MIME type (required)
- `duration`: Video duration in seconds (optional)
- `thumbnailUrl`: Thumbnail image URL (optional)
- `userId`: Clerk user ID (required)
- `isPublic`: Whether video is public (default: true)
- `tags`: Array of tags (optional)
- `views`: View count (default: 0)
- `likes`: Like count (default: 0)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### User Model

- `clerkId`: Clerk user ID (required, unique)
- `email`: User email (required, unique)
- `firstName`: First name (required)
- `lastName`: Last name (required)
- `avatarUrl`: Profile picture URL (optional)
- `bio`: User bio (optional)
- `isActive`: Account status (default: true)
- `preferences`: User preferences object
- `stats`: User statistics object
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### Videos

- `GET /api/videos` - Get all videos with pagination and filtering
- `POST /api/videos` - Create a new video
- `GET /api/videos/[id]` - Get a specific video
- `PUT /api/videos/[id]` - Update a video
- `DELETE /api/videos/[id]` - Delete a video
- `POST /api/videos/[id]/like` - Like/unlike a video

### Users

- `GET /api/users` - Get current user profile
- `POST /api/users` - Create or update user profile

### Search

- `GET /api/search` - Search videos by title, description, and tags

### Statistics

- `GET /api/stats` - Get video and user statistics

## Query Parameters

### Videos API

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `userId`: Filter by user ID
- `isPublic`: Filter by public status
- `search`: Search in title and description
- `tags`: Filter by tags (comma-separated)

### Search API

- `q`: Search query
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `tags`: Filter by tags (comma-separated)
- `userId`: Filter by user ID

### Stats API

- `type`: 'global' or 'user' (default: 'user')

## Authentication

All API endpoints (except public video viewing) require authentication using Clerk. The user ID is automatically extracted from the Clerk session.

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Success Responses

All API endpoints return consistent success responses:

```json
{
  "success": true,
  "message": "Optional message",
  "data": {}
}
```

## Pagination

Paginated responses include pagination metadata:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Development

1. Start the development server:

```bash
pnpm dev
```

2. The API endpoints will be available at `http://localhost:3000/api/`

## Production

1. Set up your MongoDB database (local or MongoDB Atlas)
2. Configure environment variables
3. Build and deploy:

```bash
pnpm build
pnpm start
```

## Database Indexes

The following indexes are automatically created for better performance:

- Video: `userId`, `isPublic`, `tags`, text search on `title` and `description`
- User: `clerkId`, `email`, `isActive`
