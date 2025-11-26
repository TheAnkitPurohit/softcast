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

  // if there's an authenticated user viewing the page, pass their clerk id so we can record the view
  const { userId } = await auth()
  const video = await getVideoById(id, userId ?? undefined)

  if (!video) {
    return <div>Video not found</div>
  }

  console.log({ video })

  const videoUrl = video.s3Url || video.videoUrl

  return (
    <main className='wrapper page w-full'>
      <div className='flex flex-col w-full gap-3'>
        <div className='w-full flex flex-col md:flex-row justify-between '>
          <div className='w-full flex gap-4'>
            <h1 className='text-2xl font-bold text-dark-100'>{video.title}</h1>
          </div>

          <div className=' flex gap-4'>
            <CopyLinkButton />
            <ShareLinkButton />
          </div>
        </div>

        {/* video  */}
        <div className='w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6'>
          <div className='video-player aspect-video w-full rounded-2xl overflow-hidden bg-black'>
            <VideoPlayer videoUrl={videoUrl} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page
