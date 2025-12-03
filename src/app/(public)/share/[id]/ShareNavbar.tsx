'use client'

import { Calendar, Check, Edit2, Eye, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { updateVideoTitle } from '@/app/actions'
import AppLogo from '@/components/app/AppLogo'
import ImageWithFallback from '@/components/ImageWithFallback'
import { ThemeToggle } from '@/components/ThemeToggle'
import authClient from '@/lib/auth-client'

interface ShareNavbarProps {
  videoId: string
  title: string
  ownerName: string
  createdAt: string
  views: number
  copyButton: React.ReactNode
  currentUserId?: string
  videoOwnerId: string
  currentUserName?: string
  currentUserImage?: string
}

const ShareNavbar = ({
  videoId,
  title,
  ownerName,
  createdAt,
  views,
  copyButton,
  currentUserId,
  videoOwnerId,
  currentUserName,
  currentUserImage,
}: ShareNavbarProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [isSaving, setIsSaving] = useState(false)

  const isOwner = currentUserId === videoOwnerId

  console.log({ currentUserId, videoOwnerId })

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const handleSaveTitle = async () => {
    if (!editedTitle.trim() || editedTitle === title) {
      setIsEditing(false)
      setEditedTitle(title)
      return
    }

    setIsSaving(true)
    try {
      const result = await updateVideoTitle(videoId, editedTitle, videoOwnerId)
      if (result.success) {
        toast.success('Title updated successfully')
        console.log({ editedTitle })
        setIsEditing(false)
      } else {
        toast.error(result.error || 'Failed to update title')
        setEditedTitle(title)
      }
    } catch (error) {
      toast.error('Failed to update title')
      setEditedTitle(title)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedTitle(title)
  }

  const [loading, setLoading] = useState(false)

  async function handleSocialSignIn() {
    setLoading(true)

    const { error } = await authClient.signIn.social(
      {
        provider: 'google',
        callbackURL: '/share/' + videoId,
      },
      {
        onSuccess(context) {
          console.log('Sign-in successful!', context)
        },
        onError(err) {
          console.error('Sign-in error:', err)
        },
      }
    )

    setLoading(false)
  }

  return (
    <nav className='sticky top-0 z-50 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 shadow-sm'>
      <div className='max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 gap-4'>
          {/* Left Side: Logo */}
          <Link
            href='/videos'
            className='flex items-center gap-2.5 flex-shrink-0'
          >
            <AppLogo />
          </Link>

          {/* Center: Title, Owner, Date - Hidden on mobile */}
          <div className='hidden lg:flex items-center gap-4 flex-1 min-w-0 px-6'>
            {/* Title - Editable for owner */}
            <div className='flex items-center gap-2 min-w-0 flex-1 max-w-md'>
              {isEditing ? (
                <div className='flex items-center gap-2 flex-1'>
                  <input
                    type='text'
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveTitle()
                      if (e.key === 'Escape') handleCancelEdit()
                    }}
                    disabled={isSaving}
                    className='flex-1 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    autoFocus
                  />
                  <button
                    onClick={handleSaveTitle}
                    disabled={isSaving}
                    className='p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50'
                    title='Save'
                  >
                    <Check className='w-4 h-4' />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                    className='p-1.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-900 dark:text-white rounded-lg transition-colors disabled:opacity-50'
                    title='Cancel'
                  >
                    <X className='w-4 h-4' />
                  </button>
                </div>
              ) : (
                <div className='flex items-center gap-2 min-w-0 flex-1 group'>
                  <h1 className='text-base font-semibold text-zinc-900 dark:text-white truncate'>
                    {editedTitle}
                  </h1>
                  {isOwner && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className='opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-all'
                      title='Edit title'
                    >
                      <Edit2 className='w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400' />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className='h-6 w-px bg-zinc-200 dark:bg-zinc-700 flex-shrink-0' />

            {/* Owner Info */}
            <div className='flex items-center gap-2 flex-shrink-0'>
              <span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                {ownerName}
              </span>
            </div>

            {/* Date */}
            <div className='flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 flex-shrink-0'>
              <Calendar className='w-4 h-4' />
              <span className='text-sm'>{formattedDate}</span>
            </div>
          </div>

          {/* Right Side: Views, Copy, Theme, Profile/Login */}
          <div className='flex items-center gap-3'>
            {/* Views */}
            <div className='hidden sm:flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400'>
              <Eye className='w-4 h-4' />
              <span className='text-sm font-medium'>{views}</span>
            </div>

            {/* Copy Button */}
            {copyButton}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile or Login */}
            {currentUserId ? (
              <Link
                href='/settings'
                className='flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-all duration-200'
              >
                <ImageWithFallback
                  src={currentUserImage ?? ''}
                  width={24}
                  height={24}
                  alt={currentUserName || 'User'}
                  className='rounded-full'
                />
                <span className='hidden md:block text-sm font-medium text-zinc-900 dark:text-white'>
                  {currentUserName}
                </span>
              </Link>
            ) : (
              <button
                onClick={handleSocialSignIn}
                className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Info */}
        <div className='lg:hidden pb-3 flex flex-col gap-2'>
          {/* Title */}
          <div className='flex items-center gap-2'>
            {isEditing ? (
              <div className='flex items-center gap-2 flex-1'>
                <input
                  type='text'
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveTitle()
                    if (e.key === 'Escape') handleCancelEdit()
                  }}
                  disabled={isSaving}
                  className='flex-1 px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  autoFocus
                />
                <button
                  onClick={handleSaveTitle}
                  disabled={isSaving}
                  className='p-1 bg-green-600 text-white rounded'
                >
                  <Check className='w-3 h-3' />
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className='p-1 bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-white rounded'
                >
                  <X className='w-3 h-3' />
                </button>
              </div>
            ) : (
              <>
                <h1 className='text-sm font-semibold text-zinc-900 dark:text-white line-clamp-1 flex-1'>
                  {editedTitle}
                </h1>
                {isOwner && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className='p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded'
                  >
                    <Edit2 className='w-3 h-3 text-zinc-500' />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Owner, Date, Views */}
          <div className='flex items-center gap-3 text-xs'>
            <div className='flex items-center gap-1.5'>
              <span className='text-zinc-700 dark:text-zinc-300'>
                {ownerName}
              </span>
            </div>
            <span className='text-zinc-500 dark:text-zinc-400'>
              {formattedDate}
            </span>
            <div className='flex items-center gap-1'>
              <Eye className='w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400' />
              <span className='text-zinc-500 dark:text-zinc-400'>{views}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default ShareNavbar
