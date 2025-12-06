import { Extension } from "./extension";
import { isMimeType, MimeType } from "./mime-type";

export const MimeTypeExtensionMap = {
  "audio/aac": "aac",
  "audio/flac": "flac",
  "audio/mp3": "mp3",
  "audio/mp4": "m4a",
  "audio/mpeg": "mp3",
  "audio/ogg": "ogg",
  "audio/wav": "wav",
  "audio/webm": "webm",
  "audio/x-m4a": "m4a",
  "audio/x-wav": "wav",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/quicktime": "mov"
} as const satisfies Record<MimeType, Extension>

export function getExtensionFromUnknownMimeType(mimeType: string): Extension | null {
  return isMimeType(mimeType) ? MimeTypeExtensionMap[mimeType] : null
}
