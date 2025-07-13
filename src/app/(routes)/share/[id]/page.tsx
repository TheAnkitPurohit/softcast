import { auth } from '@clerk/nextjs/server'

import CopyLinkButton from '@/app/(routes)/share/[id]/CopyLinkButton'
import ShareLinkButton from '@/app/(routes)/share/[id]/ShareLinkButton'
import VideoPlayer from '@/app/(routes)/share/[id]/VideoPlayer'
import { getVideoById } from '@/app/actions'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  if (!id) {
    return <div>Invalid ID</div>
  }

  const video = await getVideoById(id)

  if (!video) {
    return <div>Video not found</div>
  }

  const { userId } = await auth()

  const videoUrl = video.s3Url || video.videoUrl

  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] px-4 py-8'>
      <div className='w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6'>
        <div className='video-player aspect-video w-full rounded-2xl overflow-hidden bg-black'>
          <VideoPlayer videoUrl={videoUrl} />
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold text-dark-100'>{video.title}</h1>
          {video.description && (
            <p className='text-gray-600'>{video.description}</p>
          )}
        </div>
        <div className='flex gap-4 mt-2'>
          <CopyLinkButton />
          <ShareLinkButton />
        </div>
      </div>
    </div>
  )
}

export default Page
