'use client'

import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
import { createThumbnailClientSide } from '@/lib/utils'

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

  // Upload handler — moved into a guarded effect below so it runs exactly once

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

  // Ensure the upload starts exactly once after recording successfully stopped and a blob is available.
  const uploadInProgressRef = useRef(false)
  useEffect(() => {
    if (!isRecordingSuccess || !recordedBlob) return
    if (uploadInProgressRef.current) return

    uploadInProgressRef.current = true

    const doUpload = async () => {
      setIsUploading(true)
      try {
        // Create a file from the blob
        const file = new File(
          [recordedBlob],
          `screen-recording-${Date.now()}.webm`,
          { type: recordedBlob.type }
        )

        // Try to create a thumbnail on the client (best-effort) and include in form data so server
        // doesn't have to run ffmpeg. This helps environments where ffmpeg isn't available.

        const formData = new FormData()
        formData.append('file', file)

        // generate thumbnail on client (best-effort)
        const thumbFile = await createThumbnailClientSide(recordedBlob)

        if (thumbFile) formData.append('thumbnail', thumbFile)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        if (!response.ok) throw new Error('Upload failed')

        const result = await response.json()
        if (result.success) {
          // navigate to share page — this will unmount the component in most cases
          router.push(`/share/${result.data.id}`)
        } else {
          throw new Error(result.error || 'Upload failed')
        }
      } catch (error) {
        toast.error('Failed to upload video. Please try again.')
      } finally {
        setIsUploading(false)
        // reset recording state so this effect doesn't re-run repeatedly
        try {
          resetRecording()
        } catch (e) {
          // ignore
        }
        uploadInProgressRef.current = false
      }
    }

    doUpload()
    // include resetRecording in deps so it's safe to call
  }, [isRecordingSuccess, recordedBlob, resetRecording, router])

  const checkPermissions = async () => {
    // Helper: try to ask for missing permissions using getUserMedia
    const requestMissingPermissions = async (
      needAudio: boolean,
      needVideo: boolean
    ) => {
      try {
        const constraints: MediaStreamConstraints = {
          audio: needAudio,
          video: needVideo,
        }

        // If no new permissions needed, return false so caller can decide
        if (!needAudio && !needVideo) return false

        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        // Close tracks immediately — we only requested to get permissions
        stream.getTracks().forEach((t) => t.stop())
        return true
      } catch (e) {
        return false
      }
    }

    try {
      // If Permissions API is not supported, fallback to requesting media directly
      if (!navigator.permissions || !navigator.mediaDevices) {
        const got = await requestMissingPermissions(true, true)
        if (got) setIsOpen(true)
        else
          toast.error(
            'Permission denied. Please allow camera and microphone permissions and try again.'
          )
        return got
      }

      // Query availability states for camera & microphone
      // Using `as any` to work with broader PermissionName unions across environments
      const cameraPerm = await navigator.permissions.query({
        name: 'camera',
      })
      const micPerm = await navigator.permissions.query({
        name: 'microphone',
      })

      const cameraGranted = cameraPerm.state === 'granted'
      const micGranted = micPerm.state === 'granted'

      // If both granted — open modal
      if (cameraGranted && micGranted) {
        setIsOpen(true)
        return true
      }

      // If either one is already granted, allow open now (we can prompt for the missing permission later)
      if (cameraGranted || micGranted) {
        setIsOpen(true)
        // still attempt to request missing permission in the background (best-effort)
        requestMissingPermissions(!micGranted, !cameraGranted).then(
          (succeeded) => {
            if (!succeeded) {
              // don't block the UI but inform the user that one of the permissions remains unavailable
              toast(
                'Some permissions are still restricted; recordings that require both audio and video may behave differently.'
              )
            }
          }
        )
        return true
      }

      // If none are granted, ask the user for both permissions
      const requested = await requestMissingPermissions(true, true)
      if (requested) {
        setIsOpen(true)
        return true
      }

      toast.error(
        'Permission denied. Please allow camera and microphone permissions and try again.'
      )
      return false
    } catch (err) {
      toast.error(
        'Permission check failed. Please confirm your browser allows camera and microphone access for this site.'
      )
      return false
    }
  }

  return (
    <>
      <button
        onClick={checkPermissions}
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
                  src='/assets/icons/logo.png'
                  alt='SoftCast Logo'
                  width={32}
                  height={32}
                />
                <div className='flex flex-col leading-tight'>
                  <h1 className='font-black text-blue-100 text-xl'>SkyCast</h1>
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
              if (isUploading) return
              setIsUploading(true)
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
