'use client'

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <video autoPlay controls className='w-full h-full'>
      <source src={videoUrl} type='video/webm' />
    </video>
  )
}

export default VideoPlayer
