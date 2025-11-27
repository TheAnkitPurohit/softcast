import ffmpegStatic from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import os from 'os'
import path from 'path'

export const runtime = 'nodejs'

if (!ffmpegStatic) {
  throw new Error('ffmpeg-static path is undefined. Check bundling/runtime.')
}

console.log('FFmpeg Binary:', ffmpegStatic)
console.log('Exists:', fs.existsSync(ffmpegStatic?.path))

ffmpeg.setFfmpegPath(ffmpegStatic?.path)

export async function generateThumbnailFromBuffer(
  buffer: Buffer,
  opts?: { atSeconds?: number; size?: string }
) {
  const tmpDir = os.tmpdir()
  const videoFile = path.join(
    tmpDir,
    `upload-${Date.now()}-${Math.random().toString(36).slice(2)}.webm`
  )
  const thumbFile = path.join(
    tmpDir,
    `thumb-${Date.now()}-${Math.random().toString(36).slice(2)}.png`
  )
  const atSeconds = typeof opts?.atSeconds === 'number' ? opts?.atSeconds : 1
  const size = opts?.size ?? '1280x?' // flexible height

  try {
    await fs.promises.writeFile(videoFile, buffer)

    await new Promise<void>((resolve, reject) => {
      ffmpeg(videoFile)
        .screenshots({
          timestamps: [atSeconds],
          filename: path.basename(thumbFile),
          folder: path.dirname(thumbFile),
          size,
        })
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
    })

    const thumbBuffer = await fs.promises.readFile(thumbFile)
    return { buffer: thumbBuffer, fileName: path.basename(thumbFile) }
  } finally {
    // cleanup files, best effort
    try {
      if (fs.existsSync(videoFile)) fs.unlinkSync(videoFile)
    } catch (e) {}
    try {
      if (fs.existsSync(thumbFile)) fs.unlinkSync(thumbFile)
    } catch (e) {}
  }
}

export async function convertWebmToMp4(buffer: Buffer) {
  const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'upload-'))
  const inPath = path.join(tmpDir, `in-${Date.now()}.webm`)
  const outPath = path.join(tmpDir, `out-${Date.now()}.mp4`)

  try {
    await fs.promises.writeFile(inPath, buffer)

    await new Promise<void>((resolve, reject) => {
      ffmpeg(inPath)
        .outputOptions([
          '-c:v libx264',
          '-preset veryfast',
          '-crf 23',
          '-c:a aac',
          '-movflags +faststart',
        ])
        .output(outPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run()
    })

    const outBuf = await fs.promises.readFile(outPath)
    return outBuf
  } finally {
    // best-effort cleanup
    try {
      await Promise.all([
        fs.promises.rm(inPath).catch(() => {}),
        fs.promises.rm(outPath).catch(() => {}),
        fs.promises.rmdir(tmpDir).catch(() => {}),
      ])
    } catch {}
  }
}
