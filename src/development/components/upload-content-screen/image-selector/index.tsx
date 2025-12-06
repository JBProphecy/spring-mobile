import { JaxConstants } from "@/src/application/modules/jax/constants/master";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ImageSelection } from "../../../utilities/pick-image-async";

export type ImageSelectorProps = {
  selection: ImageSelection | null
  handleImageSelection: () => Promise<void>,
  clearImageSelection: () => void
}

export function ImageSelector({ selection, handleImageSelection, clearImageSelection }: ImageSelectorProps) {
  return (
    <View style={ImageSelectorStyles.container}>
      <View style={[ImageSelectorStyles.previewContainer, selection === null ? ImageSelectorStyles.previewContainerEmpty : ImageSelectorStyles.previewContainerFilled]}>
        {selection !== null && <Image
          style={ImageSelectorStyles.previewImage}
          source={{ uri: selection.uri }}
          contentFit="cover"
        />}
      </View>
      <Pressable style={ImageSelectorStyles.chooseImagePressableBox} onPress={handleImageSelection}>
        <Text style={ImageSelectorStyles.chooseImageText}>Choose Image</Text>
      </Pressable>
      <Pressable style={ImageSelectorStyles.chooseImagePressableBox} onPress={clearImageSelection}>
        <Text style={ImageSelectorStyles.chooseImageText}>Clear Image</Text>
      </Pressable>
    </View>
  )
}

export namespace ImagePreviewConstants {
  export const Size = 144
}

export namespace ButtonConstants {
  export const FontSize = 16
  export const HorizontalPadding = 7/8 * FontSize
  export const VerticalPadding = 3/8 * FontSize
}

export const ImageSelectorStyles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 12
  },
  previewContainer: {
    width: ImagePreviewConstants.Size,
    height: ImagePreviewConstants.Size,
    backgroundColor: "black",
    borderRadius: 12,
    overflow: "hidden",
  },
  previewContainerEmpty: {
    borderWidth: 3,
    borderColor: JaxConstants.RGB[128]
  },
  previewContainerFilled: {
    borderWidth: 0
  },
  previewImage: {
    flex: 1
  },
  chooseImagePressableBox: {},
  chooseImageText: {
    color: JaxConstants.RGB[176],
    fontSize: ButtonConstants.FontSize,
    fontWeight: "bold",
    paddingHorizontal: ButtonConstants.HorizontalPadding,
    paddingVertical: ButtonConstants.VerticalPadding
  }
})
