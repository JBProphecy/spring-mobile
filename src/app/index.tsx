////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useMemo, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer, { Capability } from "react-native-track-player";
import { JaxConstants } from "../application/modules/jax/constants/master";
import { HorizontalNavigationBarScreen } from "../development/components/horizontal-navigation-bar-screen";
import { initializeRootDirectory, useRootDirectory } from "../development/random/mk-02";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generatePlatformMessage() {
  return "The current platform [" + Platform.OS + "] is missing necessary implementations."
}

async function initializePlatform(): Promise<void> {
  console.log("Platform: [" + Platform.OS + "]")
  if (Platform.OS === "android") {
    initializeRootDirectory()
  }
  else if (Platform.OS === "ios") {
    Alert.alert(generatePlatformMessage())
  }
  else if (Platform.OS === "macos") {
    Alert.alert(generatePlatformMessage())
  }
  else if (Platform.OS === "web") {
    window.alert(generatePlatformMessage())
  }
  else if (Platform.OS === "windows") {
    Alert.alert(generatePlatformMessage())
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type PrimaryScreenProps = {
  children?: React.ReactNode
}

function PrimaryScreen({ children }: PrimaryScreenProps) {
  return (
    <SafeAreaView
      style={PrimaryScreenStyles.screen}
      edges={["bottom", "left", "right", "top"]}
    >
      {children}
    </SafeAreaView>
  )
}

const PrimaryScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: JaxConstants.RGB[12]
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LoadingScreen() {
  return (
    <View style={LoadingScreenStyles.screen}>
      <Text style={LoadingScreenStyles.text}>Loading Root Directory</Text>
    </View>
  )
}

const LoadingScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: JaxConstants.RGB[208],
    fontWeight: "bold",
    fontSize: 24
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ErrorScreenProps = {
  message: string
}

function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <View style={ErrorScreenStyles.screen}>
      <Text style={ErrorScreenStyles.text}>{message}</Text>
    </View>
  )
}

const ErrorScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: JaxConstants.RGB[208],
    fontWeight: "bold",
    fontSize: 24
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type AppState =
  | { status: "loading" }
  | { status: "error", message: string }
  | { status: "success" }

export default function Index()
{
  const { isLoading, error } = useRootDirectory()
  // useEffect(() => { initializePlatform() }, [])

  const appState = useMemo<AppState>(() => {
    if (isLoading) return { status: "loading" }
    if (error !== null) return { status: "error", message: error }
    return { status: "success" }
  }, [isLoading, error])

  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false)

  useEffect(() => {
    async function setup() {
      try {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.SeekTo
          ],
          compactCapabilities: [Capability.Play, Capability.Pause],
          notificationCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.SeekTo
          ],
          forwardJumpInterval: 15,
          backwardJumpInterval: 15
        })
        setIsPlayerReady(true)
      }
      catch (object: unknown) {
        const error = object as Error
        console.error("Error Seting Up React Native Track Player\n", error)
      }
    }
    setup()
  }, [])

  return (
    <PrimaryScreen>
      {appState.status === "loading" && <LoadingScreen />}
      {appState.status === "error" && <ErrorScreen message={appState.message} />}
      {appState.status === "success" && isPlayerReady && <HorizontalNavigationBarScreen />}
    </PrimaryScreen>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
