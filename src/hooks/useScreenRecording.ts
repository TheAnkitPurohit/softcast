import { useEffect, useRef, useState } from 'react'

import {
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
  const elapsedRef = useRef<number>(0) // milliseconds accumulated before current run
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      stopRecording()
      if (state.recordedVideoUrl) URL.revokeObjectURL(state.recordedVideoUrl)
      audioContextRef.current?.close().catch(console.error)
    }
  }, [state.recordedVideoUrl])

  const handleRecordingStop = () => {
    const { blob, url } = createRecordingBlob(chunksRef.current)
    // calculate total duration = elapsed before + current run (if any)
    const durationMs =
      elapsedRef.current +
      (startTimeRef.current ? Date.now() - startTimeRef.current : 0)
    const duration = Math.round(durationMs / 1000)

    // clear running timer
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }

    setState((prev) => ({
      ...prev,
      recordedBlob: blob,
      recordedVideoUrl: url,
      recordingDuration: duration,
      isRecording: false,
    }))
    // reset time trackers
    startTimeRef.current = null
    elapsedRef.current = 0
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
      // reset elapsed tracker and set start time
      elapsedRef.current = 0
      startTimeRef.current = Date.now()

      // start updating duration every second
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
      }
      timerRef.current = window.setInterval(() => {
        const now = Date.now()
        const ms =
          elapsedRef.current +
          (startTimeRef.current ? now - startTimeRef.current : 0)
        setState((prev) => ({
          ...prev,
          recordingDuration: Math.floor(ms / 1000),
        }))
      }, 1000) as unknown as number
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
    // stop any running duration timer
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }

    // when stopping, we don't reset elapsedRef here — handleRecordingStop will set recorded duration
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
    elapsedRef.current = 0
  }

  const pauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.pause()
      // accumulate elapsed time up to pause
      if (startTimeRef.current) {
        elapsedRef.current += Date.now() - startTimeRef.current
        startTimeRef.current = null
      }
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
      setState((prev) => ({ ...prev, isPaused: true }))
    }
  }

  const resumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'paused'
    ) {
      mediaRecorderRef.current.resume()
      // resume timing
      startTimeRef.current = Date.now()
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = window.setInterval(() => {
        const now = Date.now()
        const ms =
          elapsedRef.current +
          (startTimeRef.current ? now - startTimeRef.current : 0)
        setState((prev) => ({
          ...prev,
          recordingDuration: Math.floor(ms / 1000),
        }))
      }, 1000) as unknown as number
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
