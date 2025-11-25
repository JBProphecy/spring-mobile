////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import Animated, { DerivedValue, interpolate, SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { ICON_BAR_CONTAINER_HEIGHT, IoniconName } from "../../../data";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type IconItemProps = {
  index: number
  icon: IoniconName | null
  lynxContainerCurrentScrollFactor: SharedValue<number>
  lynxContainerActiveSectionIndex: DerivedValue<number>
  iconItemWidth: number
}

export function IconItem({
  index,
  icon,
  lynxContainerCurrentScrollFactor,
  lynxContainerActiveSectionIndex,
  iconItemWidth }: IconItemProps)
{
  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.abs(index - lynxContainerCurrentScrollFactor.value)
    const opacity = interpolate(distance, [0, 1, 2, 3, 4], [1, 0.5, 0.3, 0.1, 0])
    const scale = interpolate(distance, [0, 1, 2, 3, 4], [1, 0.85, 0.7, 0.5, 0])
    return { opacity, transform: [{ scale }] }
  })

  const handlePress = (index: number) => {
    if (index !== lynxContainerActiveSectionIndex.value) {
      lynxContainerCurrentScrollFactor.value = withTiming(index, { duration: 350 })
    }
  }

  return (
    <Pressable
      onPress={() => handlePress(index)}
      style={[styles.iconItem, { width: iconItemWidth }]}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={icon !== null ? icon : "logo-xbox"}
          size={1/2 * ICON_BAR_CONTAINER_HEIGHT}
          color="rgb(208, 208, 208)"
        />
      </Animated.View>
    </Pressable>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  iconItem: {
    height: ICON_BAR_CONTAINER_HEIGHT,
    alignItems: "center",
    justifyContent: "center"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
