'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ICONS } from '@/constants'
import { useScreenRecording } from '@/hooks/useScreenRecording'

const CAPTURE_TYPES = [
  { label: 'Full Screen', value: 'screen' },
  { label: 'Window', value: 'window' },
  { label: 'Current Tab', value: 'tab' },
]

const RecordScreen = () => {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [captureType, setCaptureType] = useState('screen')
  const [microphones, setMicrophones] = useState<
    Array<{ deviceId: string; label: string }>
  >([])
  const [selectedMic, setSelectedMic] = useState<string>('default')

  useEffect(() => {
    async function fetchMicrophones() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const mics = devices.filter((d) => d.kind === 'audioinput')
        setMicrophones(
          mics.map((m) => ({
            deviceId: m.deviceId,
            label: m.label || 'Microphone',
          }))
        )
      } catch (e) {
        setMicrophones([])
      }
    }
    if (isOpen) fetchMicrophones()
  }, [isOpen])

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
    await startRecording(
      captureType as 'screen' | 'window' | 'tab',
      selectedMic === 'none' || microphones.length === 0 ? 'none' : selectedMic
    )
  }

  const recordAgain = async () => {
    resetRecording()
    await startRecording(
      captureType as 'screen' | 'window' | 'tab',
      selectedMic === 'none' || microphones.length === 0 ? 'none' : selectedMic
    )
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
        <section className='dialog dialog-top-right'>
          <div className='overlay-record' onClick={closeModal} />
          <div className='dialog-content'>
            <div
              className='capture-type-selector'
              style={{ display: 'flex', gap: 8, marginBottom: 16 }}
            >
              {CAPTURE_TYPES.map((type) => (
                <button
                  key={type.value}
                  className={`capture-type-btn${captureType === type.value ? ' selected' : ''}`}
                  onClick={() => setCaptureType(type.value)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 6,
                    border:
                      captureType === type.value
                        ? '2px solid #6366f1'
                        : '1px solid #ccc',
                    background: captureType === type.value ? '#eef2ff' : '#fff',
                    color: '#222',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <div className='mic-select' style={{ marginBottom: 16 }}>
              <label
                htmlFor='mic-select'
                style={{ fontWeight: 500, marginRight: 8 }}
              >
                Microphone:
              </label>
              <Select value={selectedMic} onValueChange={setSelectedMic}>
                <SelectTrigger id='mic-select' style={{ minWidth: 180 }}>
                  <SelectValue>
                    {microphones.find((m) => m.deviceId === selectedMic)
                      ?.label || 'No microphone'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='none'>No microphone</SelectItem>
                  {microphones.map((mic) => (
                    <SelectItem key={mic.deviceId} value={mic.deviceId}>
                      {mic.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
