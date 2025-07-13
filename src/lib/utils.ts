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
  micDeviceId: MicDeviceId
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

  return { displayStream, micStream, hasDisplayAudio };
};

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

