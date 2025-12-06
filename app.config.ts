export default {
  name: "spring-mobile",
  slug: "spring-mobile",
  version: "1.0.0",
  orientation: "default",
  icon: "./assets/custom/images/indigo_gem.svg", // attempt
  scheme: "springmobile",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE", // temporary
      foregroundImage: "./assets/images/android-icon-foreground.png", // temporary
      backgroundImage: "./assets/images/android-icon-background.png", // temporary
      monochromeImage: "./assets/images/android-icon-monochrome.png" // temporary
    },
    // edgeToEdgeEnabled: true,
    permissions: [
      "android.permission.FOREGROUND_SERVICE",
      "android.permission.WAKE_LOCK"
    ],
    package: "com.anonymous.springmobile" // temporary
  },
  web: {
    output: "static",
    favicon: "./assets/custom/images/indigo_gem.svg"
  },
  plugins: [
    [
      "expo-build-properties",
      {
        "android": {
          "kotlinVersion": "1.9.25",
          "compileSdkVersion": 36,
          "targetSdkVersion": 36,
          "minSdkVersion": 24,
          "buildToolsVersion": "36.1.0",
          "gradleWrapperVersion": "8.10",
          "androidGradlePluginVersion": "8.7.2"
        }
      }
    ],
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#fff",
        dark: {
          backgroundColor: "#000"
        }
      }
    ],
    "expo-font",
    "./plugins/react-native-track-player"
    // [
    //   "react-native-track-player",
    //   {
    //     backgroundModes: ["audio"],
    //     ios: {
    //       category: "playback",
    //       capabilities: [
    //         "skipForward",
    //         "skipBackward",
    //         "changePlaybackPosition",
    //         "remoteControl"
    //       ]
    //     },
    //     android: {
    //       notificationCapabilities: [
    //         "play",
    //         "pause",
    //         "stop",
    //         "skipToNext",
    //         "skipToPrevious",
    //         "seekTo"
    //       ],
    //       forwardJumpInterval: 15,
    //       backwardJumpInterval: 15
    //     }
    //   }
    // ]
  ],
  extra: {
    eas: {
      projectId: "e721992d-50a2-409f-8bbf-67843e08d891"
    }
  },
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  newArchEnabled: false
} satisfies import("@expo/config").ExpoConfig
