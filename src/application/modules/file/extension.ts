import { Jax } from "../jax/master"

export const ExtensionArray = [
  "aac",
  "bin",
  "flac",
  "gif",
  "jpg",
  "m4a",
  "mov",
  "mp3",
  "mp4",
  "ogg",
  "png",
  "wav",
  "webm",
  "webp"
] as const

export const ExtensionSet = new Set(ExtensionArray)

export type Extension = Jax.Types.SetValues<typeof ExtensionSet>
