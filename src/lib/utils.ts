import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DEFAULT_VIDEO_CONFIG, DEFAULT_RECORDING_CONFIG } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const updateURLParams = (
  currentParams: URLSearchParams,
  updates: Record<string, string | null | undefined>,
  basePath: string = "/"
): string => {
  const params = new URLSearchParams(currentParams.toString());

  // Process each parameter update
  Object.entries(updates).forEach(([name, value]) => {
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
  });

  return `${basePath}?${params.toString()}`;
};

// Get env helper function
export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env: ${key}`);
  return value;
};

export const getMediaStreams = async (
  captureType: CaptureType,
  micDeviceId: MicDeviceId,
  faceDeviceId?: string | null
): Promise<MediaStreams> => {
  const displayStream = await navigator.mediaDevices.getDisplayMedia({
    video: {
      ...DEFAULT_VIDEO_CONFIG,
      displaySurface: captureType,
    },
    audio: true,
  });

  const hasDisplayAudio = displayStream.getAudioTracks().length > 0;
  let micStream: MediaStream | null = null;

  if (micDeviceId && micDeviceId !== 'none') {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: micDeviceId } });
    micStream
      .getAudioTracks()
      .forEach((track: MediaStreamTrack) => (track.enabled = true));
  }

  let faceStream: MediaStream | null = null
  // If a face / webcam device was provided, try to get the video stream
  if (faceDeviceId && faceDeviceId !== 'none') {
    try {
      faceStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: faceDeviceId },
        audio: false,
      })
    } catch (e) {
      faceStream = null
    }
  }

  return { displayStream, micStream, faceStream, hasDisplayAudio };
};

/**
 * Create a composited MediaStream by drawing the display video and an optional
 * face (webcam) video onto a canvas. The resulting stream will contain a single
 * video track (canvas output); it does not include audio — caller should add
 * audio tracks separately (e.g., from an audio mixer destination).
 */
export const createCompositeStream = async (
  displayStream: MediaStream,
  faceStream: MediaStream | null,
  options: { frameRate?: number; faceWidthPct?: number; facePadding?: number } = {}
): Promise<ExtendedMediaStream> => {
  const frameRate = options.frameRate ?? 30
  const faceWidthPct = options.faceWidthPct ?? 0.22 // camera will take 22% of width
  const facePadding = options.facePadding ?? 16

  const displayVideo = document.createElement('video')
  displayVideo.srcObject = displayStream
  displayVideo.muted = true
  displayVideo.playsInline = true

  const faceVideo = faceStream ? document.createElement('video') : null
  if (faceVideo && faceStream) {
    faceVideo.srcObject = faceStream
    faceVideo.muted = true
    faceVideo.playsInline = true
  }

  // Wait for metadata so we can size the canvas correctly
  await new Promise<void>((resolve) => {
    const onLoaded = () => resolve()
    displayVideo.addEventListener('loadedmetadata', onLoaded, { once: true })
    // In some browsers display media may already be ready; call play to trigger metadata in that case
    displayVideo.play().catch(() => {})
  })

  // Create canvas sized to display video
  const canvas = document.createElement('canvas')
  canvas.width = displayVideo.videoWidth || 1280
  canvas.height = displayVideo.videoHeight || 720
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('2D canvas not available')

  // If we have face video, ensure metadata loaded
  if (faceVideo) {
    try {
      await new Promise<void>((resolve) => {
        const onLoaded = () => resolve()
        faceVideo.addEventListener('loadedmetadata', onLoaded, { once: true })
        faceVideo.play().catch(() => {})
      })
    } catch {}
  }

  let running = true

  const drawFrame = () => {
    if (!running) return
    try {
      // draw main display
      ctx.drawImage(displayVideo, 0, 0, canvas.width, canvas.height)

      // draw face video as a rounded rectangle overlay in bottom-right
      if (faceVideo && faceStream) {
        const faceW = Math.round(canvas.width * faceWidthPct)
        const faceH = Math.round((faceVideo.videoHeight / (faceVideo.videoWidth || 1)) * faceW)
        const x = canvas.width - faceW - facePadding
        const y = canvas.height - faceH - facePadding

        // rounded rect background
        const radius = 12
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.arcTo(x + faceW, y, x + faceW, y + faceH, radius)
        ctx.arcTo(x + faceW, y + faceH, x, y + faceH, radius)
        ctx.arcTo(x, y + faceH, x, y, radius)
        ctx.arcTo(x, y, x + faceW, y, radius)
        ctx.closePath()
        ctx.fillStyle = 'rgba(0,0,0,0.35)'
        ctx.fill()
        // draw video inside rounded rect
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.arcTo(x + faceW, y, x + faceW, y + faceH, radius)
        ctx.arcTo(x + faceW, y + faceH, x, y + faceH, radius)
        ctx.arcTo(x, y + faceH, x, y, radius)
        ctx.arcTo(x, y, x + faceW, y, radius)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(faceVideo, x, y, faceW, faceH)
        ctx.restore()
      }
    } catch (e) {
      // ignore transient draw errors
    }
    // schedule next frame
    setTimeout(() => requestAnimationFrame(drawFrame), 1000 / frameRate)
  }

  requestAnimationFrame(drawFrame)

  const canvasStream = (canvas as HTMLCanvasElement).captureStream(frameRate)
  const out = canvasStream as ExtendedMediaStream
  // keep reference to original streams so cleanup can stop them
  out._originalStreams = [displayStream, ...(faceStream ? [faceStream] : [])]

  // attach a stop handler to stop drawing loop when canvas track ends
  const videoTrack = canvasStream.getVideoTracks()[0]
  videoTrack.addEventListener('ended', () => {
    running = false
  })

  return out
}

export const createAudioMixer = (
  ctx: AudioContext,
  displayStream: MediaStream,
  micStream: MediaStream | null,
  hasDisplayAudio: boolean
) => {
  if (!hasDisplayAudio && !micStream) return null;

  const destination = ctx.createMediaStreamDestination();
  const mix = (stream: MediaStream, gainValue: number) => {
    const source = ctx.createMediaStreamSource(stream);
    const gain = ctx.createGain();
    gain.gain.value = gainValue;
    source.connect(gain).connect(destination);
  };

  if (hasDisplayAudio) mix(displayStream, 0.7);
  if (micStream) mix(micStream, 1.5);

  return destination;
};

export const setupMediaRecorder = (stream: MediaStream) => {
  try {
    return new MediaRecorder(stream, DEFAULT_RECORDING_CONFIG);
  } catch {
    return new MediaRecorder(stream);
  }
};

export const getVideoDuration = (url: string): Promise<number | null> =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const duration =
        isFinite(video.duration) && video.duration > 0
          ? Math.round(video.duration)
          : null;
      URL.revokeObjectURL(video.src);
      resolve(duration);
    };
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      resolve(null);
    };
    video.src = url;
  });

export const setupRecording = (
  stream: MediaStream,
  handlers: RecordingHandlers
): MediaRecorder => {
  const recorder = new MediaRecorder(stream, DEFAULT_RECORDING_CONFIG);
  recorder.ondataavailable = handlers.onDataAvailable;
  recorder.onstop = handlers.onStop;
  return recorder;
};

export const cleanupRecording = (
  recorder: MediaRecorder | null,
  stream: MediaStream | null,
  originalStreams: MediaStream[] = []
) => {
  if (recorder?.state !== "inactive") {
    recorder?.stop();
  }

  stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop());
  originalStreams.forEach((s) =>
    s.getTracks().forEach((track: MediaStreamTrack) => track.stop())
  );
};

export const createRecordingBlob = (
  chunks: Blob[]
): { blob: Blob; url: string } => {
  const blob = new Blob(chunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  return { blob, url };
};

export const calculateRecordingDuration = (startTime: number | null): number =>
  startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

export function parseTranscript(transcript: string): TranscriptEntry[] {
  const lines = transcript.replace(/^WEBVTT\s*/, "").split("\n");
  const result: TranscriptEntry[] = [];
  let tempText: string[] = [];
  let startTime: string | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    const timeMatch = trimmedLine.match(
      /(\d{2}:\d{2}:\d{2})\.\d{3}\s-->\s(\d{2}:\d{2}:\d{2})\.\d{3}/
    );

    if (timeMatch) {
      if (tempText.length > 0 && startTime) {
        result.push({ time: startTime, text: tempText.join(" ") });
        tempText = [];
      }
      startTime = timeMatch[1] ?? null;
    } else if (trimmedLine) {
      tempText.push(trimmedLine);
    }

    if (tempText.length >= 3 && startTime) {
      result.push({ time: startTime, text: tempText.join(" ") });
      tempText = [];
      startTime = null;
    }
  }

  if (tempText.length > 0 && startTime) {
    result.push({ time: startTime, text: tempText.join(" ") });
  }

  return result;
}

export function daysAgo(inputDate: Date): string {
  const input = new Date(inputDate);
  const now = new Date();

  const diffTime = now.getTime() - input.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "1 day ago";
  } else {
    return `${diffDays} days ago`;
  }
}

export const createIframeLink = (videoId: string) =>
  `https://iframe.mediadelivery.net/embed/421422/${videoId}?autoplay=true&preload=true`;



export    const createThumbnailClientSide = async (
          blob: Blob
        ): Promise<File | null> => {
          try {
            const url = URL.createObjectURL(blob)
            const videoEl = document.createElement('video')
            videoEl.preload = 'metadata'
            videoEl.src = url

            await new Promise<void>((resolve, reject) => {
              const onLoaded = () => resolve()
              const onError = () =>
                reject(new Error('Video load failed for thumbnail'))
              videoEl.addEventListener('loadedmetadata', onLoaded, {
                once: true,
              })
              videoEl.addEventListener('error', onError, { once: true })
            })

            const duration = Math.max(
              0,
              Math.min(1, Math.floor(videoEl.duration) || 0)
            )
            // Seek to a safe timestamp (if video is shorter, 0 will be used)
            const seekTo = Math.min(1, Math.max(0, duration))

            await new Promise<void>((resolve) => {
              const onSeek = () => resolve()
              videoEl.currentTime = seekTo
              videoEl.addEventListener('seeked', onSeek, { once: true })
            })

            const canvas = document.createElement('canvas')
            const targetWidth = 1280
            const ratio = videoEl.videoWidth
              ? videoEl.videoHeight / videoEl.videoWidth
              : 9 / 16
            const targetHeight = Math.round(targetWidth * ratio)
            canvas.width = targetWidth
            canvas.height = targetHeight
            const ctx = canvas.getContext('2d')
            if (!ctx) throw new Error('Canvas context is unavailable')
            ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)

            const thumbnailBlob: Blob | null = await new Promise((resolve) =>
              canvas.toBlob((b) => resolve(b), 'image/png')
            )

            URL.revokeObjectURL(url)

            if (!thumbnailBlob) return null
            const thumbnailFile = new File(
              [thumbnailBlob],
              `thumb-${Date.now()}.png`,
              { type: 'image/png' }
            )
            return thumbnailFile
          } catch (e) {
            console.warn('Client-side thumbnail generation failed:', e)
            return null
          }
        }