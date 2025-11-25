////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useSystemFontScale } from "@/src/v2/app/hooks/system-font-scale";
import { Styles } from "@/src/v2/app/types/react-native";
import { useState } from "react";
import { ColorValue, DimensionValue, GestureResponderEvent, Pressable, PressableProps, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { BasicButtonConstants } from "./basic-button-constants";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type BasicButtonProps = {
  pressable?: PressableProps
  text?: string
  width?: DimensionValue
  height?: DimensionValue
  color?: ColorValue
  fontSize?: number
  lineHeight?: number
  padding?: number
  borderWidth?: number
  borderRadius?: number
  transitionDuration?: number
  isDisabled?: boolean
  alignSelf?: Styles.AlignSelf
}

export function BasicButton({
  pressable = {},
  text = "Default Text",
  width,
  height,
  color = BasicButtonConstants.COLOR,
  fontSize: internalFontSize = BasicButtonConstants.FONT_SIZE,
  lineHeight: internalLineHeight = BasicButtonConstants.LINE_HEIGHT,
  padding: internalPadding,
  borderWidth: internalBorderWidth,
  borderRadius: internalBorderRadius,
  transitionDuration = BasicButtonConstants.TRANSITION_DURATION,
  isDisabled = BasicButtonConstants.DISABLED,
  alignSelf = "flex-start"
}: BasicButtonProps)
{
  const systemFontScale = useSystemFontScale()

  const resolvedFontSize = internalFontSize * systemFontScale
  const resolvedLineHeight = internalLineHeight * systemFontScale
  const resolvedPadding = internalPadding ?? resolvedFontSize * BasicButtonConstants.PADDING_SCALE
  const resolvedBorderWidth = internalBorderWidth ?? resolvedFontSize * BasicButtonConstants.BORDER_WIDTH_SCALE
  const resolvedBorderRadius = internalBorderRadius ?? resolvedFontSize * BasicButtonConstants.BORDER_RADIUS_SCALE

  const [isPressed, setIsPressed] = useState<boolean>(false)

  const opacity = useSharedValue<number>(0.7)
  useDerivedValue(() => {
    const targetOpacity =
      isDisabled
        ? 0.2
        : isPressed
          ? 0.4
          : 0.85
    if (opacity.value !== targetOpacity) { opacity.value = withTiming(targetOpacity, { duration: transitionDuration }) }
  })
  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value }
  })

  const { onPressIn, onPressOut, ...restPressableProps } = pressable

  return (
    <Pressable
      style={[styles.pressable, {
        width: width,
        height: height,
        alignSelf: alignSelf
      }]}
      disabled={isDisabled}
      focusable={true}
      onPressIn={(event: GestureResponderEvent) => {
        setIsPressed(true)
        if (onPressIn) { onPressIn(event) }
      }}
      onPressOut={(event: GestureResponderEvent) => {
        setIsPressed(false)
        if (onPressOut) { onPressOut(event) }
      }}
      {...restPressableProps}
    >
      <Animated.View
        style={[styles.content, animatedStyle, {
          width: width,
          height: height,
          borderWidth: resolvedBorderWidth,
          borderColor: color,
          borderRadius: resolvedBorderRadius
        }]}
      >
        <Text
          children={text}
          style={[styles.text, {
            color: color,
            padding: resolvedPadding,
            fontSize: resolvedFontSize,
            lineHeight: resolvedLineHeight
          }]}
        />
      </Animated.View>
    </Pressable>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const styles = StyleSheet.create({
  pressable: {
    outlineWidth: 0
  },
  content: {},
  text: {
    fontWeight: "bold",
    userSelect: "none",
    textAlign: "center",
    alignSelf: "center"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
