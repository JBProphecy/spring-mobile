////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { StyleSheet } from "react-native";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function DashPlayer()
{
  const ip = "192.168.111.6" // subject to change
  const port = "8080"
  const dashURL = `http://${ip}:${port}/example_video/manifest.mpd`

  const videoSource: VideoSource = {
    uri: dashURL,
    contentType: 'dash',  // This triggers DASH parsing
    useCaching: true,     // Optional: Enables caching for better perf
  };

  const player = useVideoPlayer(videoSource, (playerInstance) => {
    playerInstance.loop = false;
  });

  return (
    <VideoView
      player={player}
      style={DashPlayerStyles.video}
      contentFit="contain"
    />
  )
}

export const DashPlayerStyles = StyleSheet.create({
  video: {
    flex: 1,
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
