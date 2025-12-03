import { headers } from 'next/headers'

import CommentsSection from '@/app/(public)/share/[id]/CommentsSection'
import CopyLinkButton from '@/app/(public)/share/[id]/CopyLinkButton'
import ShareNavbar from '@/app/(public)/share/[id]/ShareNavbar'
import VideoPlayer from '@/app/(public)/share/[id]/VideoPlayer'
import { getVideoById } from '@/app/actions'
import { auth } from '@/lib/auth'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  if (!id) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white dark:bg-zinc-950'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-zinc-900 dark:text-white mb-2'>
            Invalid Video ID
          </h1>
          <p className='text-zinc-500 dark:text-zinc-400'>
            The video you're looking for doesn't exist.
          </p>
        </div>
      </div>
    )
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { user } = session || {}

  const userId = user?.id
  const video = await getVideoById(id, userId ?? undefined)

  if (!video) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white dark:bg-zinc-950'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-zinc-900 dark:text-white mb-2'>
            Video Not Found
          </h1>
          <p className='text-zinc-500 dark:text-zinc-400'>
            This video may have been removed or is no longer available.
          </p>
        </div>
      </div>
    )
  }

  console.log({ video })

  const videoUrl = video.s3Url || video.url

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-950'>
      {/* Navbar */}
      <ShareNavbar
        videoId={id}
        title={video.title}
        ownerName={video.userName ? `${video?.userName} ` : 'system'}
        createdAt={video.createdAt}
        views={video.views || 0}
        copyButton={<CopyLinkButton />}
        currentUserId={user?.id ?? undefined}
        videoOwnerId={video.userId}
        currentUserName={user?.name ?? undefined}
        currentUserImage={user?.image ?? undefined}
      />

      {/* Main Content */}
      <div className='flex flex-col lg:flex-row h-[calc(100vh-64px)]'>
        {/* Video Section - 70% on desktop */}
        <div className='flex-1 lg:w-[70%] p-4 sm:p-6 lg:p-8 overflow-y-auto'>
          <div className='max-w-5xl mx-auto'>
            {/* Video Player */}
            <div className='aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl border border-zinc-200 dark:border-zinc-800'>
              <VideoPlayer videoUrl={videoUrl} />
            </div>

            {/* Video Details - Mobile Only */}
            <div className='lg:hidden mt-6 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800'>
              <h1 className='text-xl font-bold text-zinc-900 dark:text-white mb-3'>
                {video.title}
              </h1>
              {video.description && (
                <p className='text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap'>
                  {video.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section - 30% on desktop, full width on mobile */}
        <div className='lg:w-[30%] h-[500px] lg:h-full'>
          <CommentsSection
            videoId={id}
            currentUserName={user?.name ?? undefined}
            currentUserImage={user?.image ?? undefined}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
