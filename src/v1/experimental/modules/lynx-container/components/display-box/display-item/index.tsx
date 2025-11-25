////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React from "react"
import { StyleSheet } from "react-native"
import Animated, { DerivedValue, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type DisplayItemProps = {
  index: number
  screen: React.ReactNode
  lynxContainerCurrentScrollFactor: SharedValue<number>
  lynxContainerActiveSectionIndex: DerivedValue<number>
  displayItemWidth: number
  displayItemHeight: number
}

export function DisplayItem({
  screen,
  index,
  lynxContainerCurrentScrollFactor,
  lynxContainerActiveSectionIndex,
  displayItemWidth,
  displayItemHeight }: DisplayItemProps)
{
  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.abs(index - lynxContainerCurrentScrollFactor.value)
    const opacity = interpolate(distance, [0, 0.5], [1, 0])
    const scale = interpolate(distance, [0, 1], [1, 0.5])
    return { opacity, transform: [{ scale }] }
  })

  return (
    <Animated.View style={[animatedStyle, styles.displayItem, { width: displayItemWidth, height: displayItemHeight }]}>
      {screen}
    </Animated.View>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  displayItem: {
    alignItems: "center",
    justifyContent: "center"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
