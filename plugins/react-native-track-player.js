const { withInfoPlist, withAndroidManifest } = require("expo/config-plugins");

module.exports = function withTrackPlayer(config, props = {}) {
  // IOS
  config = withInfoPlist(config, (config) => {
    config.modResults.UIBackgroundModes = [
      ...(config.modResults.UIBackgroundModes || []),
      "audio"
    ]
    return config
  })
  // Android
  config = withAndroidManifest(config, (config) => {
    const app = config.modResults.manifest.application?.[0]
    if (app === undefined) return config
    if (!app.service) app.service = []
    app.service.push({
      $: {
        "android:name": "com.guichaguri.trackplayer.service.MusicService",
        "android:exported": "false"
      }
    })
    return config
  })
  return config
}
