import TrackPlayer, { Event } from "react-native-track-player"

module.exports = async function () {
  try {
    TrackPlayer.addEventListener(Event.RemotePlay, async () => await TrackPlayer.play())
    TrackPlayer.addEventListener(Event.RemotePause, async () => await TrackPlayer.pause())
    TrackPlayer.addEventListener(Event.RemoteNext, async () => await TrackPlayer.skipToNext())
    TrackPlayer.addEventListener(Event.RemotePrevious, async () => await TrackPlayer.skipToPrevious())
    TrackPlayer.addEventListener(Event.RemoteStop, async () => await TrackPlayer.stop())
    TrackPlayer.addEventListener(Event.RemoteSeek, async ({ position }) => await TrackPlayer.seekTo(position))

    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (data) => {
      if (data.track) {
        await TrackPlayer.updateNowPlayingMetadata({
          artist: data.track.artist,
          artwork: data.track.artwork,
          title: data.track.title
        })
      }
    })
  }
  catch (object: unknown) {
    const error = object as Error
    console.error("React Native Track Player Service Error\n", error)
  }
}
