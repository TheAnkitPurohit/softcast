'use client'

import { MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'

import ImageWithFallback from '@/components/ImageWithFallback'

interface Comment {
  id: string
  userName: string
  userImage?: string
  text: string
  createdAt: string
}

interface CommentsSectionProps {
  videoId: string
  currentUserName?: string
  currentUserImage?: string
}

const CommentsSection = ({
  videoId,
  currentUserName,
  currentUserImage,
}: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)

    // TODO: Implement actual API call to save comment
    const comment: Comment = {
      id: Date.now().toString(),
      userName: currentUserName || 'Anonymous',
      userImage: currentUserImage,
      text: newComment,
      createdAt: new Date().toISOString(),
    }

    setComments([comment, ...comments])
    setNewComment('')
    setIsSubmitting(false)
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className='h-full flex flex-col bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800'>
      {/* Header */}
      <div className='px-6 py-4 border-b border-zinc-200 dark:border-zinc-800'>
        <div className='flex items-center gap-2'>
          <MessageSquare className='w-5 h-5 text-purple-600' />
          <h2 className='text-lg font-semibold text-zinc-900 dark:text-white'>
            Comments
          </h2>
          <span className='text-sm text-zinc-500 dark:text-zinc-400'>
            ({comments.length})
          </span>
        </div>
      </div>

      {/* Comment Input */}
      <div className='px-6 py-4 border-b border-zinc-200 dark:border-zinc-800'>
        <form onSubmit={handleSubmitComment} className='flex flex-col gap-3'>
          <div className='flex items-start gap-3'>
            <ImageWithFallback
              src={currentUserImage ?? ''}
              width={36}
              height={36}
              alt={currentUserName || 'User'}
              className='rounded-full flex-shrink-0'
            />
            <div className='flex-1'>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Add a comment...'
                rows={3}
                className='w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all'
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={!newComment.trim() || isSubmitting}
              className='flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:hover:shadow-md'
            >
              <Send className='w-4 h-4' />
              <span>{isSubmitting ? 'Posting...' : 'Post'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className='flex-1 overflow-y-auto px-6 py-4'>
        {comments.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full text-center py-12'>
            <MessageSquare className='w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-3' />
            <p className='text-sm font-medium text-zinc-500 dark:text-zinc-400'>
              No comments yet
            </p>
            <p className='text-xs text-zinc-400 dark:text-zinc-500 mt-1'>
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {comments.map((comment) => (
              <div key={comment.id} className='flex gap-3 group'>
                <ImageWithFallback
                  src={comment.userImage ?? ''}
                  width={32}
                  height={32}
                  alt={comment.userName}
                  className='rounded-full flex-shrink-0'
                />
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <span className='text-sm font-semibold text-zinc-900 dark:text-white'>
                      {comment.userName}
                    </span>
                    <span className='text-xs text-zinc-400 dark:text-zinc-500'>
                      {formatTimeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className='text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap break-words'>
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentsSection
