'use client'

import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ICONS } from '@/constants'
import { useScreenRecording } from '@/hooks/useScreenRecording'

const CAPTURE_TYPES = [
  { label: 'Current Tab', value: 'tab' },
  { label: 'Window', value: 'window' },
  { label: 'Full Screen', value: 'screen' },
]

const RecordScreen = () => {
  const router = useRouter()

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
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
    pauseRecording,
    resumeRecording,
    isPaused,
    isRecordingSuccess,
    handleStopAndUpload,
  } = useScreenRecording()

  const closeModal = () => {
    resetRecording()
    setIsOpen(false)
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

  // Format duration as mm:ss
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleDeleteRecording = () => {
    stopRecording()
    setIsOpen(false)
  }

  useEffect(() => {
    if (isRecordingSuccess && recordedBlob) {
      goToUpload()
    }
  }, [isRecordingSuccess, recordedBlob, goToUpload])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='px-5 py-2.5 bg-primary rounded-full inline-flex justify-start items-center gap-1.5'
      >
        <Image src={ICONS.record} alt='record' width={16} height={16} />
        <span className="text-center justify-center text-white text-sm font-semibold font-['Karla'] leading-tight">
          Record a video
        </span>
      </button>

      {isOpen && !isRecording && (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) {
              closeModal()
              resetRecording()
            }
          }}
        >
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
                  <h1 className='font-black text-blue-100 text-xl'>
                    Screencast
                  </h1>
                  <span className='text-xs text-gray-100 font-medium'>
                    by softcolon
                  </span>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className='w-full  flex flex-col justify-start items-start gap-5'>
              <div className='w-full flex flex-col justify-start items-start gap-2'>
                <div className="justify-center text-gray-500 text-sm font-medium font-['Karla'] leading-tight">
                  Video settings
                </div>
                <Select
                  value={captureType}
                  onValueChange={(value) =>
                    setCaptureType(value as CaptureType)
                  }
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
          </DialogContent>
        </Dialog>
      )}

      {/* Floating Recording Control Bar */}
      {isRecording && (
        <div
          className='fixed left-1/2 bottom-8 z-[200] -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full shadow-lg bg-neutral-900 text-white border border-neutral-800'
          style={{ minWidth: 250 }}
        >
          {/* First Button: Stop & Upload */}
          <button
            onClick={() => {
              handleStopAndUpload()
              setIsOpen(false)
            }}
            title='Stop & Upload'
            className='flex items-center justify-center w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-md focus:outline-none'
            disabled={isUploading}
          >
            <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
              <rect width='14' height='14' x='3' y='3' rx='3' fill='white' />
            </svg>
          </button>

          {/* Second Button: Play/Pause */}
          <button
            onClick={isPaused ? resumeRecording : pauseRecording}
            title={isPaused ? 'Resume Recording' : 'Pause Recording'}
            className='flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-md focus:outline-none'
            disabled={isUploading}
          >
            {isPaused ? (
              // Play icon
              <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
                <polygon points='6,4 16,10 6,16' fill='white' />
              </svg>
            ) : (
              // Pause icon
              <svg width='20' height='20' fill='none' viewBox='0 0 20 20'>
                <rect x='4' y='4' width='4' height='12' rx='1' fill='white' />
                <rect x='12' y='4' width='4' height='12' rx='1' fill='white' />
              </svg>
            )}
          </button>

          {/* Third Button: Timer */}
          <span className='mx-2 font-mono text-base tracking-widest select-none'>
            {formatDuration(recordingDuration)}
          </span>

          <Separator
            orientation='vertical'
            className='h-8 mx-2 bg-neutral-700'
          />

          <button
            onClick={handleDeleteRecording}
            title='Delete Recording'
            className='flex items-center justify-center w-10 h-10 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors shadow-md focus:outline-none'
          >
            <Trash className='w-5 h-5' />
          </button>
        </div>
      )}
    </>
  )
}

export default RecordScreen
