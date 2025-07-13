declare interface User {
  name: string
  email: string
  emailVerified: boolean
  image?: string | null
  createdAt: Date
  updatedAt: Date
  id: string
}

type VideoFormValues = {
  title: string
  description: string
  tags: string
  visibility: 'public' | 'private'
}

declare interface FormFieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void
  placeholder?: string
  as?: 'input' | 'textarea' | 'select'
  options?: Array<{ value: string; label: string }>
}

declare interface FileInputProps {
  id: string
  label: string
  accept: string
  file: File | null
  previewUrl: string | null
  inputRef: React.RefObject<HTMLInputElement | null>
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
  type: 'video' | 'image'
}

declare interface TranscriptEntry {
  time: string
  text: string
}

declare interface VideoFormValues {
  title: string
  description: string
  tags: string
  visibility: 'public' | 'private'
}
declare interface NavbarProps {
  user: User | undefined
}

declare interface VideoCardProps {
  id: string
  title: string
  thumbnail: string
  createdAt: Date
  views: number
  isPublic: boolean
}

declare interface VideoDetailHeaderProps {
  title: string
  createdAt: Date
  userImg: string | null | undefined
  username?: string
  videoId: string
  ownerId: string
  visibility: string
  thumbnailUrl: string
}

declare interface VideoPlayerProps {
  videoId: string
  className?: string
}
declare interface VideoInfoProps {
  transcript?: string
  title: string
  createdAt: Date
  description: string
  videoId: string
  videoUrl: string
}

declare interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  fallback?: string
  alt: string
  src: string | null
}

type Visibility = 'public' | 'private'

declare interface VideoDetails {
  videoId: string
  title: string
  description: string
  thumbnailUrl: string
  tags: string | string[]
  visibility: Visibility
  duration?: number | null
}

declare interface VideoUploadUrlResponse {
  videoId: string
  uploadUrl: string
  accessKey: string
}

declare interface ThumbnailUploadUrlResponse {
  uploadUrl: string
  cdnUrl: string
  accessKey: string
}

declare interface VideoProcessingStatus {
  isProcessed: boolean
  encodingProgress: number
  status: number
}

declare interface VideoWithUserResult {
  video: {
    id: string
    videoId: string
    title: string
    description: string
    thumbnailUrl: string
    videoUrl: string
    userId: string
    views: number
    tags: string[]
    visibility: Visibility
    createdAt: Date
    updatedAt: Date
  }
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

declare interface VideoObject {
  id: string
  videoId: string
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  userId: string
  views: number
  tags: string[]
  visibility: Visibility
  createdAt: Date
  updatedAt: Date
}

declare interface UserWithVideos {
  user: {
    id: string
    name: string | null
    image: string | null
    email: string | null
  }
  videos: VideoObject[]
  count: number
}

declare interface ExtendedMediaStream extends MediaStream {
  _originalStreams?: MediaStream[]
}

declare interface SharedHeaderProps {
  subHeader: string
  title: string
  userImg?: string
}

declare interface SharedHeaderProps {
  subHeader: string
  title: string
  userImg?: string
}

declare interface Params {
  params: Promise<Record<string, string>>
}

declare interface SearchParams {
  searchParams: Promise<Record<string, string | undefined>>
}

declare interface ParamsWithSearch {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string | undefined>>
}

declare interface DropdownListProps {
  options: string[]
  selectedOption: string
  onOptionSelect: (option: string) => void
  triggerElement: ReactNode
}

declare interface EmptyStateProps {
  icon: string
  title: string
  description: string
}

declare interface MediaStreams {
  displayStream: MediaStream
  micStream: MediaStream | null
  hasDisplayAudio: boolean
}

declare interface BunnyRecordingState {
  isRecording: boolean
  recordedBlob: Blob | null
  recordedVideoUrl: string
  recordingDuration: number
}

declare interface ExtendedMediaStream extends MediaStream {
  _originalStreams?: MediaStream[]
}

// Types
interface VideoQueryResult {
  video: typeof videos.$inferSelect
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

interface PaginationResult<T> {
  data: T[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number | unknown
  }
}

declare interface RecordingHandlers {
  onDataAvailable: (e: BlobEvent) => void
  onStop: () => void
}

declare interface ApiResponse<T> {
  success: boolean
  statusCode: number
  request: {
    ip: string
    method: string
    url: string
  }
  message: string
  data: T
}

declare interface PaginatedList<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

interface Video {
  _id: string
  title: string
  description?: string
  key: string
  s3Url: string
  fileSize: number
  contentType: string
  duration?: number
  thumbnailUrl?: string
  userId: string
  isPublic: boolean
  tags: string[]
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}

declare interface VideoResponse {
  pagination: {
    limit: number
    page: number
    pages: number
    total: number
  }
  videos: Video[]
}
