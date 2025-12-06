import { JaxConstants } from "@/src/application/modules/jax/constants/master"
import { useSystemFontScale } from "@/src/application/modules/system-font-scale/hook"
import { Image } from "expo-image"
import { Pressable, Text, View } from "react-native"
import { SongOptionsModalHook } from "../song-options-modal"
import { SongData } from "../song-types"

export type SongItemViewProps = {
  data: SongData
  modal: SongOptionsModalHook
}

export function SongItemView({
  data,
  modal: { isVisible, show, hide, showWith }
}: SongItemViewProps) {
  const  { id, name, cover, artists } = data
  // Styles
  const systemFontScale = useSystemFontScale()
  const primaryFontSize = SongItemViewConstants.primaryFontSizeScale * systemFontScale
  const secondaryFontSize = SongItemViewConstants.secondaryFontSizeScale * systemFontScale
  const primaryLineHeight = SongItemViewConstants.primaryLineHeightScale * primaryFontSize
  const secondaryLineHeight = SongItemViewConstants.secondaryLineHeightScale * secondaryFontSize
  const imageSize = (primaryLineHeight + secondaryLineHeight + SongItemViewConstants.lineGap) * SongItemViewConstants.imageSizeScale
  const containerHeight = imageSize + 2 * SongItemViewConstants.outerPadding
  // Content
  const hasAtLeastOnePrimaryArtist = artists.primary.length > 0
  const hasAtLeastOneFeaturedArtist = artists.featured.length > 0
  const titleLineText = name + (hasAtLeastOneFeaturedArtist ? ` (feat. ${artists.featured.map(a => a.name).join(", ")})` : "")
  const artistsLineText = [...artists.primary, ...artists.featured].map(a => a.name).join(", ")
  // Action
  const handlePress = () => {
    console.log(`Pressed Song: id=[${id}], name=[${name}]`)
    showWith(data)
  }
  return (
    <Pressable
      style={({ hovered, pressed }) => ({
        width: "100%",
        height: containerHeight,
        padding: SongItemViewConstants.outerPadding,
        gap: SongItemViewConstants.contentGap,
        flexDirection: "row"
      })}
      onPress={handlePress}
    >
      <Image
        style={{
          width: imageSize,
          height: imageSize,
          borderWidth: 2,
          borderColor: JaxConstants.RGB[0]
        }}
        contentFit="cover"
        source={cover.uri}
        alt={cover.alt}
      />
      <View
        style={{
          flex: 1,
          width: "100%",
          height: imageSize,
          gap: SongItemViewConstants.lineGap,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            width: "100%",
            fontSize: primaryFontSize,
            lineHeight: primaryLineHeight,
            fontWeight: "bold",
            color: JaxConstants.RGB[176],
            paddingHorizontal: SongItemViewConstants.textPaddingHorizontal
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >{titleLineText}</Text>
        <Text
          style={{
            width: "100%",
            fontSize: secondaryFontSize,
            lineHeight: secondaryLineHeight,
            fontWeight: "bold",
            color: JaxConstants.RGB[128],
            paddingHorizontal: SongItemViewConstants.textPaddingHorizontal
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >{artistsLineText}</Text>
      </View>
    </Pressable>
  )
}

export namespace SongItemViewConstants {
  export const scale = 16
  export const primaryFontSizeScale = 1 * scale
  export const secondaryFontSizeScale = 0.75 * scale
  export const primaryLineHeightScale = 1.25
  export const secondaryLineHeightScale = 1.25
  export const imageSizeScale = 1.25
  export const lineGap = 4
  export const outerPadding = 8
  export const contentGap = 4
  export const textPaddingHorizontal = 4
}
