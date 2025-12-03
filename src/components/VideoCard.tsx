'use client'
import { Check, Eye, Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import ImageWithFallback from '@/components/ImageWithFallback'
import authClient from '@/lib/auth-client'

const VideoCard = ({
  id,
  title,
  thumbnail,
  createdAt,
  views,
  isPublic,
}: VideoCardProps) => {
  const { data, isPending } = authClient.useSession()

  const { user } = data || {}

  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard.writeText(`${window.location.origin}/share/${id}`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <Link
      href={`/share/${id}`}
      className='group relative flex flex-col bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300'
    >
      {/* Thumbnail */}
      <div className='relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800'>
        <Image
          src={
            thumbnail && thumbnail != ''
              ? thumbnail
              : '/assets/images/video1.png'
          }
          fill
          alt='thumbnail'
          className='object-cover group-hover:scale-105 transition-transform duration-300'
        />

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className='absolute top-2 right-2 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100'
        >
          {copied ? (
            <Check className='w-4 h-4 text-green-400' />
          ) : (
            <LinkIcon className='w-4 h-4 text-white' />
          )}
        </button>
      </div>

      {/* Content */}
      <div className='flex flex-col gap-3 p-4'>
        {/* User Info & Views */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-2 flex-1 min-w-0'>
            <ImageWithFallback
              src={user?.image ?? ''}
              width={32}
              height={32}
              alt='avatar'
              className='rounded-full aspect-square flex-shrink-0'
            />
            <div className='flex flex-col min-w-0'>
              <h3 className='text-sm font-medium text-zinc-900 dark:text-white truncate'>
                {user?.name}
              </h3>
              <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                {isPublic ? 'Public' : 'Private'}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-1 text-zinc-500 dark:text-zinc-400 flex-shrink-0'>
            <Eye className='w-4 h-4' />
            <span className='text-sm'>{views || 0}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className='text-base font-semibold text-zinc-900 dark:text-white line-clamp-2'>
          {title}
        </h2>

        {/* Date */}
        {createdAt && (
          <p className='text-xs text-zinc-500 dark:text-zinc-400'>
            {new Date(createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
    </Link>
  )
}

export default VideoCard
