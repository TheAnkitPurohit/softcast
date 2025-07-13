'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import { ICONS } from '@/constants'
import { useScreenRecording } from '@/hooks/useScreenRecording'

const RecordScreen = () => {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const {
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording()

  const closeModal = () => {
    resetRecording()
    setIsOpen(false)
  }

  const handleStart = async () => {
    await startRecording()
  }

  const recordAgain = async () => {
    resetRecording()
    await startRecording()
    if (recordedVideoUrl && videoRef.current)
      videoRef.current.src = recordedVideoUrl
  }

  const [isUploading, setIsUploading] = useState(false)

  const goToUpload = async () => {
    if (!recordedBlob) return

    setIsUploading(true)

    try {
      // Create a file from the blob
      const file = new File(
        [recordedBlob],
        `screen-recording-${Date.now()}.webm`,
        {
          type: recordedBlob.type,
        }
      )

      // Create FormData
      const formData = new FormData()
      formData.append('file', file)

      // Upload to S3
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()

      if (result.success) {
        router.push(`/share/${result.data.id}`)
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      toast.error('Failed to upload video. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='record'>
      <button onClick={() => setIsOpen(true)} className='primary-btn'>
        <Image src={ICONS.record} alt='record' width={16} height={16} />
        <span className='truncate'>Record a video</span>
      </button>

      {isOpen && (
        <section className='dialog'>
          <div className='overlay-record' onClick={closeModal} />
          <div className='dialog-content'>
            <figure>
              <h3>Screen Recording</h3>
              <button onClick={closeModal}>
                <Image src={ICONS.close} alt='Close' width={20} height={20} />
              </button>
            </figure>

            <section>
              {isRecording ? (
                <article>
                  <div />
                  <span>Recording in progress...</span>
                </article>
              ) : recordedVideoUrl ? (
                <video ref={videoRef} src={recordedVideoUrl} controls />
              ) : (
                <p>Click record to start capturing your screen</p>
              )}
            </section>

            <div className='record-box'>
              {!isRecording && !recordedVideoUrl && (
                <button onClick={handleStart} className='record-start'>
                  <Image
                    src={ICONS.record}
                    alt='record'
                    width={16}
                    height={16}
                  />
                  Record
                </button>
              )}
              {isRecording && (
                <button onClick={stopRecording} className='record-stop'>
                  <Image
                    src={ICONS.record}
                    alt='record'
                    width={16}
                    height={16}
                  />
                  Stop Recording
                </button>
              )}
              {recordedVideoUrl && (
                <>
                  <button
                    onClick={recordAgain}
                    className='record-again'
                    disabled={isUploading}
                  >
                    Record Again
                  </button>
                  <button
                    onClick={goToUpload}
                    className='record-upload'
                    disabled={isUploading}
                  >
                    <Image
                      src={ICONS.upload}
                      alt='Upload'
                      width={16}
                      height={16}
                    />
                    {isUploading ? 'Uploading...' : 'Continue to Upload'}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default RecordScreen
