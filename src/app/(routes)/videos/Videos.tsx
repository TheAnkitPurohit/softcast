'use client'

import React, { useEffect, useState } from 'react'

import EmptyState from '@/components/EmptyState'
import LoadingSpinner from '@/components/loader/LoadingSpinner'
import SharedHeader from '@/components/SharedHeader'
import VideoCard from '@/components/VideoCard'
import videoService from '@/services/video.service'

const Videos = () => {
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
    <main className='wrapper page w-full'>
      <SharedHeader subHeader='Public Library' title='All Videos' />

      {loading ? (
        <div className='flex justify-center items-center h-full'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {videos?.length > 0 ? (
            <section className='video-grid'>
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

      {/* {pagination?.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              queryString={query}
              filterString={filter}
            />
          )} */}
    </main>
  )
}

export default Videos
