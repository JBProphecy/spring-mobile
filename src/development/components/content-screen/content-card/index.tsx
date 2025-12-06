import { JaxConstants } from "@/src/application/modules/jax/constants/master";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text } from "react-native";

export type ContentCardProps = {
  name: string
  imageAlt?: string
  imageSrc?: string
  onPress: () => Promise<void>
}

export function ContentCard({ name, imageAlt, imageSrc, onPress }: ContentCardProps) {
  return (
    <Pressable style={ConentCardStyles.card} onPress={onPress}>
      <Image style={ConentCardStyles.image} alt={imageAlt} source={imageSrc} />
      <Text style={ConentCardStyles.text}>{name}</Text>
    </Pressable>
  )
}

export namespace ContentCardConstants {
  export const BorderWidth = 3
  export const Padding = 2 * BorderWidth
  export const BorderRadiusOuter = 4 * BorderWidth
  export const BorderRadiusInner = BorderRadiusOuter - BorderWidth - Padding
}

export const ConentCardStyles = StyleSheet.create({
  card: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 24
  },
  image: {
    width: 64,
    height: 64
  },
  text: {
    color: JaxConstants.RGB[208],
    fontSize: 24,
    fontWeight: "bold"
  }
})