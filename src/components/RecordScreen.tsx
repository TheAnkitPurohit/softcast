'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  { label: 'Current Tab', value: 'tab' },
  { label: 'Window', value: 'window' },
  { label: 'Full Screen', value: 'screen' },
]

const RecordScreen = () => {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const [captureType, setCaptureType] = useState<CaptureType>('tab')
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

  const recordAgain = async () => {
    resetRecording()
    await startRecording(
      captureType,
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

  const handleStartRecording = async () => {
    await startRecording(
      captureType,
      selectedMic === 'none' || microphones.length === 0 ? 'none' : selectedMic
    )
  }

  console.log({ recordingDuration })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) closeModal()
      }}
    >
      <DialogTrigger className='px-5 py-2.5 bg-primary rounded-full inline-flex justify-start items-center gap-1.5'>
        <Image src={ICONS.record} alt='record' width={16} height={16} />
        <span className="text-center justify-center text-white text-sm font-semibold font-['Karla'] leading-tight">
          Record a video
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2.5'>
            <Image
              src='/assets/icons/logo.svg'
              alt='SoftCast Logo'
              width={32}
              height={32}
            />
            <div className='flex flex-col leading-tight'>
              <h1 className='font-black text-blue-100 text-xl'>Screencast</h1>
              <span className='text-xs text-gray-100 font-medium'>
                by softcolon
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {isRecording ? (
          <div>
            <div className='flex w-full justify-center items-center'>
              <div className='w-32 h-32 flex justify-center items-center rounded-full bg-primary text-white'>
                Recording...
              </div>
            </div>

            <div className='w-full flex justify-center items-center gap-4'>
              <button
                onClick={stopRecording}
                className='py-2.5 px-6 bg-red-500 text-white rounded-4xl font-medium flex items-center gap-2'
                disabled={isUploading}
              >
                <Image src={ICONS.record} alt='record' width={16} height={16} />
                Stop Recording
              </button>
              <button
                onClick={recordAgain}
                className='py-2.5 px-6 bg-red-500 text-white rounded-4xl font-medium flex items-center gap-2'
                disabled={isUploading}
              >
                <Image src={ICONS.record} alt='record' width={16} height={16} />
                Record Again
              </button>
            </div>
          </div>
        ) : (
          <div className='w-full  flex flex-col justify-start items-start gap-5'>
            <div className='w-full flex flex-col justify-start items-start gap-2'>
              <div className="justify-center text-gray-500 text-sm font-medium font-['Karla'] leading-tight">
                Video settings
              </div>
              <Select
                value={captureType}
                onValueChange={(value) => setCaptureType(value as CaptureType)}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue>
                    {CAPTURE_TYPES.find((t) => t.value === captureType)
                      ?.label || 'Current Tab'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {CAPTURE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='w-full flex flex-col justify-start items-start gap-2'>
              <div className="justify-center text-gray-500 text-sm font-medium font-['Karla'] leading-tight">
                Recording device
              </div>
              <Select value={selectedMic} onValueChange={setSelectedMic}>
                <SelectTrigger className='w-full'>
                  <SelectValue>
                    {microphones.find((m) => m.deviceId === selectedMic)
                      ?.label || 'No microphone'}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent className='bg-white'>
                  <SelectItem value='none'>No microphone</SelectItem>
                  {microphones.map((mic) => (
                    <SelectItem key={mic.deviceId} value={mic.deviceId}>
                      {mic.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              className='w-full px-5 py-2.5 bg-primary rounded-full flex justify-center items-center'
              onClick={handleStartRecording}
            >
              <div className="text-center justify-center text-white text-sm font-semibold font-['Karla'] leading-tight">
                Start recording
              </div>
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default RecordScreen
