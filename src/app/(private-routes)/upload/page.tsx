'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UploadedVideo {
  url: string
  name: string
  type: string
  size: number
  duration: number
}

export default function UploadPage() {
  const router = useRouter()
  const [uploadedVideo, setUploadedVideo] = useState<UploadedVideo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const videoData = sessionStorage.getItem('recordedVideo')
    if (videoData) {
      try {
        const parsed = JSON.parse(videoData)
        setUploadedVideo(parsed)
      } catch (error) {
        console.error('Error parsing video data:', error)
      }
    }
    setLoading(false)
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
          <p className='mt-4'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!uploadedVideo) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>No Video Found</h1>
          <p className='mb-4'>No uploaded video was found in your session.</p>
          <button
            onClick={() => router.push('/')}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Video Uploaded Successfully</h1>

        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='mb-6'>
            <video
              src={uploadedVideo.url}
              controls
              className='w-full rounded-lg'
              preload='metadata'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>Video Details</h2>

              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>File Name:</span>
                  <span className='text-gray-600'>{uploadedVideo.name}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>File Size:</span>
                  <span className='text-gray-600'>
                    {formatFileSize(uploadedVideo.size)}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>Duration:</span>
                  <span className='text-gray-600'>
                    {formatDuration(uploadedVideo.duration)}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>Type:</span>
                  <span className='text-gray-600'>{uploadedVideo.type}</span>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>S3 Information</h2>

              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Storage:</span>
                  <span className='text-gray-600'>AWS S3</span>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>Status:</span>
                  <span className='text-green-600 font-medium'>Uploaded</span>
                </div>

                <div className='mt-4'>
                  <a
                    href={uploadedVideo.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
                  >
                    View in S3
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-8 pt-6 border-t'>
            <button
              onClick={() => router.push('/')}
              className='px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
            >
              Record Another Video
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
