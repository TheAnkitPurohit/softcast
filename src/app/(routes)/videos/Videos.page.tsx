'use client'

import React, { useEffect, useState } from 'react'

import EmptyState from '@/components/EmptyState'
import LoadingSpinner from '@/components/loader/LoadingSpinner'
import SharedHeader from '@/components/SharedHeader'
import VideoCard from '@/components/VideoCard'
import videoService from '@/services/video.service'

const VideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await videoService.getVideos()
      setVideos(response?.data?.videos)
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <div className='flex-1 flex flex-col'>
      <SharedHeader subHeader='Public Library' title='All Videos' />

      <main className='flex-1 p-6'>
        {loading ? (
          <div className='flex justify-center items-center h-full'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {videos?.length > 0 ? (
              <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {videos?.map((video) => (
                  <VideoCard
                    key={video?._id}
                    id={video?._id}
                    title={video?.title}
                    thumbnail={video?.thumbnailUrl ?? ''}
                    createdAt={video?.createdAt}
                    views={video?.views}
                    isPublic={video?.isPublic}
                  />
                ))}
              </section>
            ) : (
              <EmptyState
                icon='/assets/icons/video.svg'
                title='No Videos Found'
                description='Try adjusting your search.'
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default VideosPage
