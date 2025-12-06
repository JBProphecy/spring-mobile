const { execSync } = require("child_process");

const coreDependencies = [
  "react",
  "react-dom",
  "react-native"
]

// npx expo install
const extraDependencies = [
  "@expo/config",
  "@expo/vector-icons",
  "@react-native-community/cli",
  "@react-navigation/bottom-tabs",
  "@react-navigation/elements",
  "@react-navigation/native",
  "@react-navigation/native-stack",
  "expo-build-properties",
  "expo-constants",
  "expo-dev-client",
  "expo-document-picker",
  "expo-file-system",
  "expo-font",
  "expo-haptics",
  "expo-image",
  "expo-image-picker",
  "expo-intent-launcher",
  "expo-linking",
  "expo-network",
  "expo-router",
  "expo-secure-store",
  "expo-splash-screen",
  "expo-status-bar",
  "expo-symbols",
  "expo-system-ui",
  "expo-video"
];

// pnpm add
const extraDeps2 = [
  "expo-web-browser",
  "react-native-gesture-handler",
  "react-native-reanimated",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-svg",
  "react-native-track-player",
  "react-native-web",
  "react-native-worklets"
]

// devDependencies
const devDependencies = [
  "@babel/core",
  "@types/babel__core",
  "@types/react",
  "eslint",
  "eslint-config-expo",
  "typescript"
]

function printLine() {
  console.log("=".repeat(100))
}

function installPackageWithCommand(package, command) {
  printLine()
  console.log(`⚡ Installing ${package}`)
  try {
    execSync(`${command} ${package}`, { stdio: "inherit" });
    console.log(`✅ Successfully installed ${package}`)
  }
  catch (error) {
    console.error(`❌ Error installing ${package}`)
  }
  finally {
    printLine()
  }
}

function installPackagesWithCommand(packages, command) {
  packages.forEach(package => installPackageWithCommand(package, command))
}

// installPackagesWithCommand(devDependencies, "pnpm add")
// installPackagesWithCommand(coreDependencies, "npx expo install")
// installPackagesWithCommand(extraDependencies, "npx expo install")
// installPackagesWithCommand(extraDeps2, "pnpm add")
