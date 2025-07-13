'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import ImageWithFallback from '@/components/ImageWithFallback'
import { useUser } from '@/contexts/UserContext'

const VideoCard = ({
  id,
  title,
  thumbnail,
  createdAt,
  views,
  isPublic,
}: VideoCardProps) => {
  const { user } = useUser()

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
    <Link href={`/share/${id}`} className='video-card'>
      <Image
        src={
          thumbnail && thumbnail != '' ? thumbnail : '/assets/images/video1.png'
        }
        width={290}
        height={160}
        alt='thumbnail'
        className='thumbnail'
      />
      <article>
        <div>
          <figure>
            <ImageWithFallback
              src={user?.avatarUrl ?? ''}
              width={34}
              height={34}
              alt='avatar'
              className='rounded-full aspect-square'
            />
            <figcaption>
              <h3>
                {user?.firstName} {user?.lastName}
              </h3>
              <p>{isPublic ? 'Public' : 'Private'}</p>
            </figcaption>
          </figure>
          <aside>
            <Image
              src='/assets/icons/eye.svg'
              alt='views'
              width={16}
              height={16}
            />
            <span>{views}</span>
          </aside>
        </div>
        <h2>{title}</h2>
        {createdAt && (
          <p className='text-sm text-gray-500'>
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        )}
      </article>
      <button onClick={handleCopy} className='copy-btn'>
        <Image
          src={
            copied ? '/assets/icons/checkmark.svg' : '/assets/icons/link.svg'
          }
          alt='Copy Link'
          width={18}
          height={18}
        />
      </button>
    </Link>
  )
}

export default VideoCard
