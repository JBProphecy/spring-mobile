import { JaxConstants } from "@/src/application/modules/jax/constants/master";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AudioSelection } from "../../../utilities/pick-audio-async";

export type AudioSelectorProps = {
  selection: AudioSelection | null
  handleAudioSelection: () => Promise<void>
  clearAudioSelection: () => void
}
export function AudioSelector({ selection, handleAudioSelection, clearAudioSelection }: AudioSelectorProps): React.JSX.Element {
  return (
    <View style={AudioSelectorStyles.container}>
      {selection !== null && <Text style={AudioSelectorStyles.previewText}>{selection.name}</Text>}
      <Pressable style={AudioSelectorStyles.chooseAudioPressableBox} onPress={handleAudioSelection}>
        <Text style={AudioSelectorStyles.chooseAudioText}>Choose Audio</Text>
      </Pressable>
      <Pressable style={AudioSelectorStyles.chooseAudioPressableBox} onPress={clearAudioSelection}>
        <Text style={AudioSelectorStyles.chooseAudioText}>Clear Audio</Text>
      </Pressable>
    </View>
  )
}

export namespace ButtonConstants {
  export const FontSize = 16
  export const HorizontalPadding = 7/8 * FontSize
  export const VerticalPadding = 3/8 * FontSize
}

export const AudioSelectorStyles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 12
  },
  previewText: {
    color: JaxConstants.RGB[176],
    fontSize: 16,
    fontWeight: "bold"
  },
  chooseAudioPressableBox: {},
  chooseAudioText: {
    color: JaxConstants.RGB[176],
    fontSize: ButtonConstants.FontSize,
    fontWeight: "bold",
    paddingHorizontal: ButtonConstants.HorizontalPadding,
    paddingVertical: ButtonConstants.VerticalPadding
  }
})
