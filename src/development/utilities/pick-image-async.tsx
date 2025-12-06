import * as ImagePicker from "expo-image-picker"
import { Alert } from "react-native"

export type ImageSelection = {
  uri: string
  mimeType: string | undefined
}

export async function pickImageAsync(): Promise<ImageSelection | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== ImagePicker.PermissionStatus.GRANTED) {
    Alert.alert("Permission Required", "We need permission to access your photos.")
    return null
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    exif: false
  })
  if (result.canceled) return null
  if (result.assets.length < 0) return null
  const asset = result.assets[0]
  return {
    uri: asset.uri,
    mimeType: asset.mimeType
  }
}
