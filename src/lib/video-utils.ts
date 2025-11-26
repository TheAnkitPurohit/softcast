import ffmpegStatic from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import os from 'os'
import path from 'path'

ffmpeg.setFfmpegPath(ffmpegStatic as string)

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
