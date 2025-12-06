import { Jax } from "../jax/master";

export const MimeTypeArray = [
  "audio/aac",
  "audio/flac",
  "audio/mp3",
  "audio/mp4",
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
  "audio/x-m4a",
  "audio/x-wav",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime"
] as const

export const MimeTypeSet = new Set(MimeTypeArray)

export type MimeType = Jax.Types.SetValues<typeof MimeTypeSet>;

export function isMimeType(mimeType: string): mimeType is MimeType {
  return MimeTypeSet.has(mimeType as MimeType)
}
