'use client'

import ReactPlayer from 'react-player'

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ReactPlayer
      url={videoUrl}
      controls
      width='100%'
      height='100%'
      style={{ borderRadius: '1rem', background: '#000' }}
    />
  )
}

export default VideoPlayer
