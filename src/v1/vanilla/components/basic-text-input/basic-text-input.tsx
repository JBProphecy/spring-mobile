////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useSystemFontScale } from "@/src/v2/app/hooks/system-font-scale";
import { JaxConstants } from "@/src/v2/app/modules/jax/constants/master";
import { StyleSheet, TextInput } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { useTextInputState } from "../../hooks/use-text-input-state";
import { BasicTextInputConstants } from "./basic-text-input-contants";
import { BasicTextInputTypes } from "./basic-text-input-types";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function BasicTextInput({
  optionalProps = {},
}: BasicTextInputTypes.Props)
{
  const {
    width = BasicTextInputConstants.WIDTH,
    color = BasicTextInputConstants.COLOR,
    fontSize: initialFontSize = BasicTextInputConstants.FONT_SIZE,
    padding: initialPadding,
    borderWidth: initialBorderWidth,
    borderRadius: initialBorderRadius,
    backgroundColor = BasicTextInputConstants.BACKGROUND_COLOR,
    transitionDuration = BasicTextInputConstants.TRANSITION_DURATION,
    textInputProps = {}
  } = optionalProps

  const systemFontScale = useSystemFontScale()
  const resolvedFontSize = initialFontSize * systemFontScale
  const resolvedPadding = initialPadding ?? resolvedFontSize * BasicTextInputConstants.PADDING_SCALE
  const resolvedBorderWidth = initialBorderWidth ?? resolvedFontSize * BasicTextInputConstants.BORDER_WIDTH_SCALE
  const resolvedBorderRadius = initialBorderRadius ?? resolvedFontSize * BasicTextInputConstants.BORDER_RADIUS_SCALE

  const textInputState = useTextInputState()

  const opacity = useSharedValue<number>(0.7)
  useDerivedValue(() => {
    const targetOpacity = textInputState.isFocused || textInputState.isHovered
      ? 1
      : 0.7
    if (opacity.value !== targetOpacity) { opacity.value = withTiming(targetOpacity, { duration: transitionDuration }) }
  })
  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value }
  })

  return (
    <Animated.View
      style={[styles.wrapper, animatedStyle, {
        width: width
      }]}
      onFocus={() => textInputState.setIsFocused(true)}
      onBlur={() => textInputState.setIsFocused(false)}
    >
      <TextInput
        style={[styles.input, {
          width: JaxConstants.Percent[100],
          color: color,
          fontSize: resolvedFontSize,
          padding: resolvedPadding,
          borderColor: color,
          borderWidth: resolvedBorderWidth,
          borderRadius: resolvedBorderRadius,
          backgroundColor: backgroundColor
        }]}
        placeholderTextColor={BasicTextInputConstants.PLACEHOLDER_TEXT_COLOR}
        {...textInputProps}
      />
    </Animated.View>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center"
  },
  input: {
    fontWeight: "bold",
    outlineWidth: 0
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
