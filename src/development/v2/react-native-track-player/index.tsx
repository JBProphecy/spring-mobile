import { buildNeutralRGB } from "@/src/application/modules/jax/utils/color";
import { Pressable, Text, View } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import { Songs } from "../../components/song-views/song-data";

export type ReactNativeTrackPlayerTestProps = {
  audio: string
}

export function ReactNativeTrackPlayerTest({ audio }: ReactNativeTrackPlayerTestProps) {
  const start = async () => {
    const track: Track = {
      id: Songs.One.id,
      url: audio,
      title: Songs.One.name,
      artist: Songs.One.artists.primary.map(a => a.name).join(", "),
      artwork: Songs.One.cover.uri
    }
    await TrackPlayer.add(track)
    await TrackPlayer.play()
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable style={{

      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          lineHeight: 20,
          color: buildNeutralRGB(176),
          borderColor: buildNeutralRGB(176),
          borderWidth: 3,
          padding: 5
        }}>Play Test</Text>
      </Pressable>
    </View>
  )
}