import * as DocumentPicker from "expo-document-picker";

export type AudioSelection = {
  uri: string
  name: string
  mimeType: string | undefined
}

export async function pickAudioAsync(): Promise<AudioSelection | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: "audio/*",
    copyToCacheDirectory: false
  })
  if (result.canceled) return null
  if (result.assets.length < 0) return null
  const asset = result.assets[0]
  return {
    uri: asset.uri,
    name: asset.name,
    mimeType: asset.mimeType,
  }
}
