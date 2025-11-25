////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { View } from "react-native";
import { JaxConstants } from "../modules/jax/constants/master";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function DashPlayer()
{
  const dashURL = "http://192.168.111.6:8080/example_video/manifest.mpd"

  const videoSource: VideoSource = {
    uri: dashURL,
    contentType: 'dash',  // This triggers DASH parsing
    useCaching: true,     // Optional: Enables caching for better perf
  };

  const player = useVideoPlayer(videoSource, (playerInstance) => {
    playerInstance.loop = false;
  });

  return (
    <View style={[JaxConstants.Style.fullFlexCenter, { backgroundColor: JaxConstants.RGB[0] }]}>
      <VideoView
        player={player}
        style={JaxConstants.Style.fullFlex}
        contentFit="contain"
      />
    </View>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
