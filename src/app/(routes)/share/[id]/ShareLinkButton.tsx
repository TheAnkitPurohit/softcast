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
        className='px-5 py-2.5 bg-primary rounded-full inline-flex justify-start items-center gap-1.5'
      >
        <Share2 size={18} className='text-white' />
        <span className="text-center justify-center text-white text-sm font-semibold font-['Karla'] leading-tight">
          {shared ? 'Shared!' : 'Share'}
        </span>
      </button>
      {shared && (
        <span className='text-xs text-green-600 mt-1'>Link copied!</span>
      )}
    </div>
  )
}

export default ShareLinkButton
