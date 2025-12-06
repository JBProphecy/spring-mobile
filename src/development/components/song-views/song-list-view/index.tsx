import { JaxConstants } from "@/src/application/modules/jax/constants/master"
import { FlatList, StyleSheet, View } from "react-native"
import { SongItemView } from "../song-item-view"
import { SongOptionsModal, useSongOptionsModal } from "../song-options-modal"
import { SongData } from "../song-types"

export type SongListViewProps = {
  data: SongData[]
}

export function SongListView({ data }: SongListViewProps) {
  const songOptionsModalHook = useSongOptionsModal()
  const { isVisible, show, hide, showWith } = songOptionsModalHook
  return (
    <>
      <FlatList
        data={data}
        style={{
          width: "100%"
        }}
        renderItem={({ index, item, separators }) => (
          <SongItemView key={item.id} data={item} modal={songOptionsModalHook} />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 2, backgroundColor: JaxConstants.RGB[36] }} />
        )}
      ></FlatList>
      <SongOptionsModal hook={songOptionsModalHook} />
    </>
  )
}

export namespace SongListViewConstants {}

export const SongListViewStyles = StyleSheet.create({
  container: {}
})
