import { JaxConstants } from "@/src/application/modules/jax/constants/master"
import { buildNeutralRGBA } from "@/src/application/modules/jax/utils/color"
import { useState } from "react"
import { Modal, Pressable, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { SongItemView } from "../song-item-view"
import { SongOptionsButton } from "../song-options-button"
import { SongData } from "../song-types"

export type SongOptionsModalProps = {
  hook: SongOptionsModalHook
}

export function SongOptionsModal({ hook }: SongOptionsModalProps) {
  const { isVisible, hide, content } = hook
  return (
    <Modal
      style={{ flex: 1  }}
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={hide}
    >
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center" }}
        edges={["bottom", "left", "right", "top"]}
      >
        <Pressable style={SongOptionsModalStyles.background} onPress={hide}></Pressable>
        <View style={SongOptionsModalStyles.content}>
          {content === null ? <></> :
            <>
              <SongItemView data={content} modal={hook} />
              <View style={{ width: "100%", height: 2, backgroundColor: JaxConstants.RGB[36] }} />
            </>
          }
          <SongOptionsButton text="Play Now" onPress={() => console.log(content?.id)}/>
          <SongOptionsButton text="Queue Next" onPress={() => console.log(content?.id)}/>
          <SongOptionsButton text="Queue Last" onPress={() => console.log(content?.id)}/>
          <SongOptionsButton text="View Artists" onPress={() => console.log(content?.id)}/>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export namespace SongOptionsModalConstants {}

export const SongOptionsModalStyles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: buildNeutralRGBA(0, 0.9),
    zIndex: 0,
  },
  content: {
    width: "auto",
    position: "relative",
    margin: 32,
    borderWidth: 3,
    borderColor: JaxConstants.RGB[48],
    zIndex: 1,
    alignItems: "center",
    backgroundColor: JaxConstants.RGB[12]
  }
})

export type SongOptionsModalHook = {
  isVisible: boolean
  show: () => void
  hide: () => void
  showWith: (content: SongData) => void
  content: SongData | null
}

export function useSongOptionsModal(): SongOptionsModalHook {
  const [content, setContent] = useState<SongData | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const show = () => { if (!isVisible) setIsVisible(true) }
  const hide = () => {
    if (isVisible) setIsVisible(false)
    if (content !== null) setContent(null)
  }
  const showWith = (data: SongData) => {
    if (content === null) setContent(data)
    if (!isVisible) setIsVisible(true)
  }
  return { isVisible, show, hide, showWith, content }
}
