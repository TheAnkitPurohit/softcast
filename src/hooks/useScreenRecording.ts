import { useEffect, useRef, useState } from 'react'

import {
  calculateRecordingDuration,
  cleanupRecording,
  createAudioMixer,
  createRecordingBlob,
  getMediaStreams,
  setupRecording,
} from '@/lib/utils'

export const useScreenRecording = () => {
  const [state, setState] = useState<BunnyRecordingState>({
    isRecording: false,
    recordedBlob: null,
    recordedVideoUrl: '',
    recordingDuration: 0,
    isPaused: false,
    isRecordingSuccess: false,
  })

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<ExtendedMediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      stopRecording()
      if (state.recordedVideoUrl) URL.revokeObjectURL(state.recordedVideoUrl)
      audioContextRef.current?.close().catch(console.error)
    }
  }, [state.recordedVideoUrl])

  const handleRecordingStop = () => {
    const { blob, url } = createRecordingBlob(chunksRef.current)
    const duration = calculateRecordingDuration(startTimeRef.current)

    setState((prev) => ({
      ...prev,
      recordedBlob: blob,
      recordedVideoUrl: url,
      recordingDuration: duration,
      isRecording: false,
    }))
  }

  const startRecording = async (
    captureType: CaptureType = 'screen',
    micDeviceId: MicDeviceId = 'default'
  ) => {
    try {
      stopRecording()

      const { displayStream, micStream, hasDisplayAudio } =
        await getMediaStreams(captureType, micDeviceId)
      const combinedStream = new MediaStream() as ExtendedMediaStream

      displayStream
        .getVideoTracks()
        .forEach((track: MediaStreamTrack) => combinedStream.addTrack(track))

      audioContextRef.current = new AudioContext()
      const audioDestination = createAudioMixer(
        audioContextRef.current,
        displayStream,
        micStream,
        hasDisplayAudio
      )

      audioDestination?.stream
        .getAudioTracks()
        .forEach((track: MediaStreamTrack) => combinedStream.addTrack(track))

      combinedStream._originalStreams = [
        displayStream,
        ...(micStream ? [micStream] : []),
      ]
      streamRef.current = combinedStream

      mediaRecorderRef.current = setupRecording(combinedStream, {
        onDataAvailable: (e) => e.data.size && chunksRef.current.push(e.data),
        onStop: handleRecordingStop,
      })

      chunksRef.current = []
      startTimeRef.current = Date.now()
      mediaRecorderRef.current.start(1000)
      setState((prev) => ({ ...prev, isRecording: true }))
      return true
    } catch (error) {
      console.error('Recording error:', error)
      return false
    }
  }

  const stopRecording = () => {
    cleanupRecording(
      mediaRecorderRef.current,
      streamRef.current,
      streamRef.current?._originalStreams
    )
    streamRef.current = null
    setState((prev) => ({
      ...prev,
      isRecording: false,
    }))
  }

  const resetRecording = () => {
    stopRecording()
    if (state.recordedVideoUrl) URL.revokeObjectURL(state.recordedVideoUrl)
    setState({
      isRecording: false,
      recordedBlob: null,
      recordedVideoUrl: '',
      recordingDuration: 0,
      isPaused: false,
      isRecordingSuccess: false,
    })
    startTimeRef.current = null
  }

  const pauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.pause()
      setState((prev) => ({ ...prev, isPaused: true }))
    }
  }

  const resumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'paused'
    ) {
      mediaRecorderRef.current.resume()
      setState((prev) => ({ ...prev, isPaused: false }))
    }
  }

  const handleStopAndUpload = async () => {
    stopRecording()
    setState((prev) => ({ ...prev, isRecordingSuccess: true }))
  }

  return {
    ...state,
    startRecording,
    stopRecording,
    resetRecording,
    pauseRecording,
    resumeRecording,
    isPaused: state.isPaused,
    handleStopAndUpload,
  }
}
