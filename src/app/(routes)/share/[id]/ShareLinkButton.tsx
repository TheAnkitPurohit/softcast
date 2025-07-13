'use client'

import { Share2 } from 'lucide-react'
import { useState } from 'react'

function ShareLinkButton() {
  const link = typeof window !== 'undefined' ? window.location.href : ''
  const [shared, setShared] = useState(false)
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ url: link, title: 'Check out this video!' })
    } else {
      await navigator.clipboard.writeText(link)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }
  return (
    <div className='flex flex-col items-start'>
      <button
        onClick={handleShare}
        className='flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition'
      >
        <Share2 size={18} />
        Share
      </button>
      {shared && (
        <span className='text-xs text-green-600 mt-1'>Link copied!</span>
      )}
    </div>
  )
}

export default ShareLinkButton
