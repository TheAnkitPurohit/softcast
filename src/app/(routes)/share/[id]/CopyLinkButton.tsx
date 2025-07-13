'use client'
import { Copy } from 'lucide-react'
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
      className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition'
    >
      <Copy size={18} />
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  )
}

export default CopyLinkButton
