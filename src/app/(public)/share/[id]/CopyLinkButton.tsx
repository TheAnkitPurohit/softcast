'use client'
import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'

function CopyLinkButton() {
  const link = typeof window !== 'undefined' ? window.location.href : ''
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      title={copied ? 'Copied!' : 'Copy Link'}
      className='flex items-center justify-center w-9 h-9 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95'
    >
      {copied ? (
        <Check className='w-4 h-4 text-green-600 dark:text-green-400' />
      ) : (
        <Copy className='w-4 h-4' />
      )}
    </button>
  )
}

export default CopyLinkButton
