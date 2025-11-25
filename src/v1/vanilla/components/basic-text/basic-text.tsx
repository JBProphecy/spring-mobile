////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { RGB } from "@/src/v2/app/constants";
import { JaxConstantsApp } from "@/src/v2/app/constants/app/master";
import { useSystemFontScale } from "@/src/v2/app/hooks/system-font-scale";
import { Styles } from "@/src/v2/app/types/react-native";
import { Text, TextProps } from "react-native";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type FilteredTextProps = Omit<TextProps, "children" | "fontSize">

export type BasicTextProps = FilteredTextProps & {
  text?: string
  color?: Styles.Color
  fontSize?: Styles.FontSize
  lineHeight?: Styles.LineHeight
  fontWeight?: Styles.FontWeight
  textAlign?: Styles.TextAlign
  alignSelf?: Styles.AlignSelf
  padding?: Styles.Padding
  userSelect?: Styles.UserSelect
}

export function BasicText({
  text = "Default Text",
  color = RGB[208],
  fontSize: initialFontSize = JaxConstantsApp.DEFAULT_FONT_SIZE,
  lineHeight: initialLineHeight = JaxConstantsApp.DEFAULT_LINE_HEIGHT,
  fontWeight = "bold",
  textAlign = "center",
  alignSelf = "flex-start",
  padding: initialPadding,
  userSelect = "none",
  ...rest
}: BasicTextProps)
{
  const systemFontScale = useSystemFontScale()
  const resolvedFontSize = initialFontSize * systemFontScale
  const resolvedLineHeight = initialLineHeight * systemFontScale
  const resolvedPadding = initialPadding ?? resolvedFontSize / 2

  return (
    <Text
      children={text}
      style={{
        color: color,
        fontSize: resolvedFontSize,
        lineHeight: resolvedLineHeight,
        fontWeight: fontWeight,
        textAlign: textAlign,
        alignSelf: alignSelf,
        padding: resolvedPadding,
        userSelect: userSelect
      }}
      {...rest}
    />
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
