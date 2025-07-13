'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

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
  const [uploadProgress, setUploadProgress] = useState(0)

  const goToUpload = async () => {
    if (!recordedBlob) return

    setIsUploading(true)
    setUploadProgress(0)

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
        // Store the S3 URL and metadata
        sessionStorage.setItem(
          'recordedVideo',
          JSON.stringify({
            url: result.data.s3Url,
            name: result.data.fileName,
            type: result.data.contentType,
            size: result.data.fileSize,
            duration: recordingDuration || 0,
          })
        )

        // Navigate to upload page
        router.push('/upload')
        closeModal()
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      // You can replace this with a proper toast notification or error state
      console.error('Failed to upload video. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
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
