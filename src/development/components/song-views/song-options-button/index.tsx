import { JaxConstants } from "@/src/application/modules/jax/constants/master"
import { useSystemFontScale } from "@/src/application/modules/system-font-scale/hook"
import { Pressable, Text } from "react-native"

export type SongOptionsButtonProps = {
  text: string
  onPress: () => void
}

export function SongOptionsButton({ text, onPress }: SongOptionsButtonProps) {
  const systemFontScale = useSystemFontScale()
  const fontSize = SongOptionsButtonConstants.fontSize * systemFontScale
  const lineHeight = SongOptionsButtonConstants.lineHeight * systemFontScale
  const paddingHorizontal = SongOptionsButtonConstants.paddingHorizontal * systemFontScale
  const paddingVertical = SongOptionsButtonConstants.paddingVertical * systemFontScale
  return (
    <Pressable
      style={{
        width: "100%"
      }}
      onPress={onPress}
    >
      <Text
        style={{
          width: "100%",
          color: JaxConstants.RGB[176],
          fontSize: fontSize,
          lineHeight: lineHeight,
          fontWeight: "bold",
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
          textAlign: "center"
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >{text}</Text>
    </Pressable>
  )
}

export namespace SongOptionsButtonConstants {
  export const key = 2
  export const fontSize = 8 * key
  export const lineHeight = 8 * key
  export const paddingHorizontal = 7 * key
  export const paddingVertical = 5 * key
}
