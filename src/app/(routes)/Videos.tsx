import React from 'react'

import EmptyState from '@/components/EmptyState'
import SharedHeader from '@/components/SharedHeader'
import VideoCard from '@/components/VideoCard'

const Videos = async () => {
  interface Video {
    video: {
      id: string
      title: string
      thumbnailUrl: string
      createdAt: Date
      views: number
      duration: number
      visibility: Visibility
    }
    user: {
      name: string
      image: string
    }
  }
  const videos: Video[] = []

  const pagination = {
    currentPage: 1,
    totalPages: 1,
    totalVideos: 0,
    pageSize: 10,
  }

  return (
    <main className='wrapper page w-full'>
      <SharedHeader subHeader='Public Library' title='All Videos' />

      {videos?.length > 0 ? (
        <section className='video-grid'>
          {videos.map(({ video, user }) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnailUrl}
              createdAt={video.createdAt}
              userImg={user?.image ?? ''}
              username={user?.name ?? 'Guest'}
              views={video.views}
              visibility={video.visibility}
              duration={video.duration}
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
