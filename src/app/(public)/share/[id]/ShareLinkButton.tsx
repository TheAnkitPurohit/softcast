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
    <button
      onClick={handleShare}
      className='flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
    >
      <Share2 className='w-4 h-4' />
      <span>{shared ? 'Shared!' : 'Share'}</span>
    </button>
  )
}

export default ShareLinkButton
