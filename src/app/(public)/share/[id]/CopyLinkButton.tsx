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
      className='px-5 py-2.5 bg-primary rounded-full inline-flex justify-start items-center gap-1.5'
    >
      <Copy size={18} className='text-white' />
      <span className="text-center justify-center text-white text-sm font-semibold font-['Karla'] leading-tight">
        {copied ? 'Copied!' : 'Copy'}
      </span>
    </button>
  )
}

export default CopyLinkButton
