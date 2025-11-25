////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { CreateAccountForm } from "@/src/application/forms/create-account-form"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ICON_BAR_CONTAINER_HEIGHT = 64
export const ICON_BAR_VISIBLE_ITEMS = 7

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// EXAMPLE SCREENS

export function ExampleScreenOne() {
  return (
    // <View style={ExampleScreenStyles.view}>
    //   <Text style={ExampleScreenStyles.text}>Example Screen One</Text>
    // </View>
      <CreateAccountForm />
  )
}

export function ExampleScreenTwo() {
  return (
    <View style={ExampleScreenStyles.view}>
      <Text style={ExampleScreenStyles.text}>Example Screen Two</Text>
    </View>
  )
}

export function ExampleScreenThree() {
  return (
    <View style={ExampleScreenStyles.view}>
      <Text style={ExampleScreenStyles.text}>Example Screen Three</Text>
    </View>
  )
}

export function ExampleScreenFour() {
  return (
    <View style={ExampleScreenStyles.view}>
      <Text style={ExampleScreenStyles.text}>Example Screen Four</Text>
    </View>
  )
}

export function ExampleScreenFive() {
  return (
    <View style={ExampleScreenStyles.view}>
      <Text style={ExampleScreenStyles.text}>Example Screen Five</Text>
    </View>
  )
}

export function ExampleScreenSix() {
  return (
    <View style={ExampleScreenStyles.view}>
      <Text style={ExampleScreenStyles.text}>Example Screen Six</Text>
    </View>
  )
}

export function ExampleScreenSeven() {
  return (
    <View style={ExampleScreenStyles.view}>
      <Text style={ExampleScreenStyles.text}>Example Screen Seven</Text>
    </View>
  )
}

export function ExampleScreenEight() {
  return (
    <View style={ExampleScreenStyles.view}>
      <Text style={ExampleScreenStyles.text}>Example Screen Eight</Text>
    </View>
  )
}

const ExampleScreenStyles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ANIMATED SECTION DATA

export type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

export type LynxContainerItemData = {
  readonly key: string
  readonly icon: IoniconName | null
  readonly screen: React.ReactNode
}

export const LynxContainerItemDataVariant = {
  Account: {
    key: "account",
    icon: "desktop",
    screen: <ExampleScreenOne />
  },
  Profile: {
    key: "profile",
    icon: "game-controller",
    screen: <ExampleScreenTwo />
  },
  Search: {
    key: "search",
    icon: "dice",
    screen: <ExampleScreenThree />
  },
  Home: {
    key: "home",
    icon: "image",
    screen: <ExampleScreenFour />
  },
  Settings: {
    key: "settings",
    icon: "videocam",
    screen: <ExampleScreenFive />
  },
  Guide: {
    key: "guide",
    icon: "person",
    screen: <ExampleScreenSix />
  },
  Example: {
    key: "example",
    icon: "bookmarks",
    screen: <ExampleScreenEight />
  }
} as const satisfies Record<string, LynxContainerItemData>

export const LynxContainerItemDataVariantValues = Object.values(LynxContainerItemDataVariant)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
