import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const ffmpegPath = (await import('@ffmpeg-installer/ffmpeg')).default.path

  return NextResponse.json({
    status: 'ok',
    ffmpegPath,
  })
}
