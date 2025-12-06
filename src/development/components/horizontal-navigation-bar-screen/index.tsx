////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ProfileSelectionScreen } from "@/src/forgotten/v1/application/screens/profile-selection/profile-selection-screen"
import { ExampleScreenOne } from "@/src/forgotten/v1/experimental/modules/lynx-container/data"
import { useMemo, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { JaxConstants } from "../../../application/modules/jax/constants/master"
import { ContentScreen } from "../content-screen"
import { DashPlayer } from "../dash-player"
import { PrototypeScreen } from "../prototype-screen"
import { ExampleSongData } from "../song-views/song-data"
import { SongListView } from "../song-views/song-list-view"
import { UploadContentScreen } from "../upload-content-screen"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type SectionData = {
  label: string
  content: React.JSX.Element | null
}

const ExampleSongItemView = (): React.JSX.Element => {
  return (
    <SongListView data={ExampleSongData} />
  )
}

const SectionMap = {
  View: { label: "View", content: <ExampleView></ExampleView> },
  Text: { label: "Text", content: <ExampleText></ExampleText> },
  Profiles: { label: "Profile Selection", content: <ProfileSelectionScreen /> },
  Prototype: { label: "Prototype", content: <PrototypeScreen><ExampleSongItemView /></PrototypeScreen>},
  Example1: { label: "Example Screen 1", content: <ExampleScreenOne /> },
  DashPlayer: { label: "Dash Player", content: <DashPlayer /> },
  UploadContent: { label: "Upload Content", content: <UploadContentScreen />},
  ViewContent: { label: "View Content", content: <ContentScreen />}
} as const satisfies Record<string, SectionData>

type SectionKey = keyof typeof SectionMap
type Section = typeof SectionMap[SectionKey]

const SectionOrder = [
  "Prototype", "ViewContent", "UploadContent", "Profiles", "DashPlayer"
] as const satisfies SectionKey[]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Props

export type TabProps = {
  text?: string
  isActive: boolean
  onPress: () => void
}

export type BarProps = {
  activeSectionKey: SectionKey,
  setActiveSectionKey: React.Dispatch<React.SetStateAction<SectionKey>>
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Elements

export function Tab({ text = "", isActive, onPress }: TabProps) {
  return (
    <Pressable
      style={[TabStyles.container, isActive ? TabStyles.containerActive : TabStyles.containerNormal]}
      onPress={onPress}
    >
      <Text style={[TabStyles.label, isActive ? TabStyles.labelActive : TabStyles.labelNormal]}>
        {text}
      </Text>
    </Pressable>
  )
}

export function Bar({ activeSectionKey, setActiveSectionKey }: BarProps): React.JSX.Element {
  return (
    <View style={BarStyles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={BarStyles.wrapperInner}
      >
        {SectionOrder.map((key) => {
          const section = SectionMap[key]
          const isActive = key === activeSectionKey
          return <Tab key={key} text={section.label} isActive={isActive} onPress={() => setActiveSectionKey(key)} />
        })}
      </ScrollView>
    </View>
  )
}

export function HorizontalNavigationBarScreen(): React.JSX.Element {
  const [activeSectionKey, setActiveSectionKey] = useState<SectionKey>(SectionOrder[0])
  const activeSection = useMemo<Section>(() => SectionMap[activeSectionKey], [activeSectionKey])
  return (
    <View style={ScreenStyles.screen}>
      <Bar activeSectionKey={activeSectionKey} setActiveSectionKey={setActiveSectionKey}></Bar>
      <View style={ScreenStyles.content}>
        {activeSection.content}
      </View>
    </View>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Constants

export namespace TabConstants {
  export const Scale = 4
  export const VerticalPadding = 1.5 * Scale
  export const HorizontalPadding = 3.5 * Scale
  export const BorderRadius = 1 * Scale
  export const FontSize = 4 * Scale
}

export namespace BarConstants {
  export const HorizontalPadding = TabConstants.HorizontalPadding
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Styles

export const ScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  content: {
    flex: 1,
    width: "100%",
    height: "100%",
  }
})

export const BarStyles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: BarConstants.HorizontalPadding,
    paddingBottom: TabConstants.VerticalPadding,
    borderBottomWidth: 0,
    borderBottomColor: JaxConstants.RGB[36]
  },
  wrapperInner: {
    flexDirection: "row",
    alignItems: "center"
  }
})

export const TabStyles = StyleSheet.create({
  container: {
    borderRadius: TabConstants.BorderRadius
  },
  containerNormal: {},
  containerActive: {
    backgroundColor: JaxConstants.RGB[36]
  },
  label: {
    fontSize: TabConstants.FontSize,
    fontWeight: "bold",
    paddingHorizontal: TabConstants.HorizontalPadding,
    paddingVertical: TabConstants.VerticalPadding
  },
  labelNormal: {
    color: JaxConstants.RGB[128],
  },
  labelActive: {
    color: JaxConstants.RGB[208]
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type FullScreenCenterProps = {
  children?: React.ReactNode
}

function FullScreenCenter({ children }: FullScreenCenterProps) {
  return <View
    style={{
      flex: 1,
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    {children}
  </View>
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function ExampleView() {
  return (
    <FullScreenCenter>
      <View style={ExampleComponentStyles.View}></View>
    </FullScreenCenter>
  )
}

export function ExampleText() {
  return (
    <FullScreenCenter>
      <Text style={ExampleComponentStyles.Text}>Hello World</Text>
    </FullScreenCenter>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ExampleComponentStyles = StyleSheet.create({
  View: {
    backgroundColor: JaxConstants.RGB[24],
    width: "80%", // need to figure out flex 1, this only works cuz flex 1 on parent alongside 100% sizing, which is weird
    height: 80
  },
  Text: {
    color: "white"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
