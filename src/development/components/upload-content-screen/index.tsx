import { JaxConstants } from "@/src/application/modules/jax/constants/master";
import { BasicField } from "@/src/forgotten/v1/vanilla/components/basic-field/basic-field";
import * as FileSystem from "expo-file-system";
import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Extension } from "../../../application/modules/file/extension";
import { isMimeType, MimeType } from "../../../application/modules/file/mime-type";
import { getExtensionFromUnknownMimeType } from "../../../application/modules/file/mime-type-extension";
import { useRootDirectory } from "../../random/mk-02";
import { AudioSelection, pickAudioAsync } from "../../utilities/pick-audio-async";
import { ImageSelection, pickImageAsync } from "../../utilities/pick-image-async";
import { AudioSelector } from "./audio-selector";
import { ImageSelector } from "./image-selector";

export function doesChildExist(parent: FileSystem.Directory, childName: string): boolean {
  const list = parent.list()
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.name === childName) {
      return true
    }
  }
  return false
}

function Divider(): React.JSX.Element {
  return <View style={{
    width: "100%",
    height: 1,
    backgroundColor: JaxConstants.RGB[24],
    marginVertical: 8
  }}/>
}

type ButtonProps = {
  onPress: () => void
}

function BackButton({ onPress }: ButtonProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress}>
      <Text style={ButtonStyles.text}>Back</Text>
    </Pressable>
  )
}
function SubmitButton({ onPress }: ButtonProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress}>
      <Text style={ButtonStyles.text}>Submit</Text>
    </Pressable>
  )
}

namespace ButtonConstants {
  export const FontSize = 20
  export const PaddingHorizontal = 7/8 * FontSize
  export const PaddingVertical = 3/8 * FontSize
}

const ButtonStyles = StyleSheet.create({
  text: {
    color: JaxConstants.RGB[208],
    fontSize: ButtonConstants.FontSize,
    paddingHorizontal: ButtonConstants.PaddingHorizontal,
    paddingVertical: ButtonConstants.PaddingVertical
  }
})

type Test = Omit<ImageSelection, "mimeType"> & { mimeType: string }

export function UploadContentScreen() {
  const [name, setName] = useState<string>("")
  const [cover, setCover] = useState<Omit<ImageSelection, "mimeType"> & { mimeType: MimeType, extension: Extension } | null>(null)
  const [audio, setAudio] = useState<Omit<AudioSelection, "mimeType"> & { mimeType: MimeType, extension: Extension } | null>(null)

  const { uri: rootDirectoryUri } = useRootDirectory()
  if (rootDirectoryUri === null) {
    Alert.alert("Missing Root Directory", "Please reload the app.")
    return
  }
  const rootDirectory = useMemo<FileSystem.Directory>(() => new FileSystem.Directory(rootDirectoryUri), [rootDirectoryUri])

  const handleUpload = async () => {
    if (!name) {
      Alert.alert("Missing Name", "Please enter a name.")
      return
    }
    if (cover === null) {
      Alert.alert("Missing Cover", "Please select an image file.")
      return
    }
    if (audio === null) {
      Alert.alert("Missing Audio", "Please select an audio file.")
      return
    }
    if (doesChildExist(rootDirectory, name)) {
      Alert.alert("Existing Directory", "The name you chose already exists. Please enter a different name.")
      return
    }
    let contentDirectory: FileSystem.Directory
    try {
      contentDirectory = rootDirectory.createDirectory(name)
      // contentDirectory.createFile(".nomedia", "application/octet-stream")
    }
    catch (object: unknown) {
      console.log(object as Error)
      throw new Error(`Error creating directory named [${name}]`)
    }
    try {
      const sourceFile = new FileSystem.File(cover.uri)
      const destinationFile = contentDirectory.createFile(`cover.${cover.extension}`, cover.mimeType)
      const content = await sourceFile.bytes()
      destinationFile.write(content)
    }
    catch (object: unknown) {
      console.error(object as Error)
      throw new Error("Error creating cover file")
    }
    try {
      const sourceFile = new FileSystem.File(audio.uri)
      const destinationFile = contentDirectory.createFile(`audio.${audio.extension}`, audio.mimeType)
      const content = await sourceFile.bytes()
      destinationFile.write(content)
    }
    catch (object: unknown) {
      console.error(object as Error)
      throw new Error("Error creating audio file")
    }
  }

  const handleImageSelection = async () => {
    const selection = await pickImageAsync()
    if (selection === null) return
    const mimeType = selection.mimeType
    if (mimeType === undefined) {
      handleUndefinedMimeType()
      return
    }
    if (!isMimeType(mimeType)) {
      handleUnsupportedMimeType(mimeType)
      return
    }
    setCover({
      uri: selection.uri,
      mimeType: mimeType,
      extension: getExtensionFromUnknownMimeType(mimeType)
    })
  }

  const clearImageSelection = () => {
    if (cover !== null) { setCover(null) }
  }

  const handleAudioSelection = async () => {
    const selection = await pickAudioAsync()
    if (selection === null) return
    const mimeType = selection.mimeType
    if (mimeType === undefined) {
      handleUndefinedMimeType()
      return
    }
    if (!isMimeType(mimeType)) {
      handleUnsupportedMimeType(mimeType)
      return
    }
    setAudio({
      uri: selection.uri,
      name: selection.name,
      mimeType: mimeType,
      extension: getExtensionFromUnknownMimeType(mimeType)
    })
  }

  const clearAudioSelection = () => {
    if (audio !== null) { setAudio(null) }
  }

  const handleUndefinedMimeType = () => {
    Alert.alert("Undefiend Mime Type", "The mime type of the file you chose is undefined. Please choose another file.")
  }
  const handleUnsupportedMimeType = (mimeType: string | undefined) => {
    Alert.alert("Unsupported Mime Type", `The mime type of the file you chose is not supported [${mimeType}]. Please choose another file.`)
  }

  const handleBack = () => {}
  const handleSubmit = () => {
    handleUpload()
  }

  return (
    <View style={UploadContentScreenStyles.screen}>
      <BasicField value={name} onChangeText={setName} optionalProps={{
        textInputProps: {
          placeholder: "Name"
        }
      }}/>
      <Divider />
      <ImageSelector selection={cover} handleImageSelection={handleImageSelection} clearImageSelection={clearImageSelection}/>
      <Divider />
      <AudioSelector selection={audio} handleAudioSelection={handleAudioSelection} clearAudioSelection={clearAudioSelection}/>
      <Divider />
      <View style={UploadContentScreenStyles.buttons}>
        <BackButton onPress={handleBack}/>
        <SubmitButton onPress={handleSubmit} />
      </View>
    </View>
  )
}

export const UploadContentScreenStyles = StyleSheet.create({
  screen: {
    flex: 1
  },
  buttons: {}
})
