import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { useMemo } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRootDirectory } from "../../random/mk-02";
import { ReactNativeTrackPlayerTest } from "../../v2/react-native-track-player";

export function ContentScreen() {
  const { uri: rootDirectoryUri } = useRootDirectory()
  if (rootDirectoryUri === null) { throw new Error("Missing Root Directory URI") }
  const rootDirectory = useMemo<FileSystem.Directory>(() => new FileSystem.Directory(rootDirectoryUri), [rootDirectoryUri])

  const processItem = (item: FileSystem.Directory | FileSystem.File) => {
    if (item instanceof FileSystem.File) { return processFile(item) }
    else { return processDirectory(item) }
  }

  const processDirectory = (directory: FileSystem.Directory) => {
    const name = directory.name
    let coverFile: FileSystem.File | null = null
    let audioFile: FileSystem.File | null = null
    for (const item of directory.list()) {
      if (item instanceof FileSystem.File) {
        if (item.name.startsWith("cover.")) {
          coverFile = item
        }
        if (item.name.startsWith("audio.")) {
          audioFile = item
        }
      }
    }
    return { name, coverFile, audioFile }
  }
  const processFile = (file: FileSystem.File) => {}

  const handlePress = async (audioFile: FileSystem.File | null | undefined) => {
    if (audioFile == null) { return }
    try {
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: audioFile.uri,
        type: audioFile.type,
        flags: 1
      })
    }
    catch (object: unknown) {
      const error = object as Error
      Alert.alert("Error", "Something")
    }
  }

  return (
    <View style={ContentScreenStyles.screen}>
      {rootDirectory.list().map((item, index) => {
        if (item instanceof FileSystem.Directory) {
          const { name, coverFile, audioFile } = processDirectory(item)
          // return <ContentCard key={index} name={name} imageSrc={coverFile?.uri} onPress={async () => await handlePress(audioFile)}/>
          return <ReactNativeTrackPlayerTest key={index} audio={audioFile? audioFile.uri : ""} />
        }
        return <></>
      })}
    </View>
  )
}

export const ContentScreenStyles = StyleSheet.create({
  screen: {
    flex: 1
  }
})