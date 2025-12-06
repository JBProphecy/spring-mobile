////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { StyleSheet } from "react-native";
import Animated, { DerivedValue, scrollTo, SharedValue, useAnimatedReaction, useAnimatedRef } from "react-native-reanimated";
import { LynxContainerItemData } from "../../data";
import { DisplayItem } from "./display-item";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type DisplayBoxProps = {
  lynxContainerItemDataArray: LynxContainerItemData[]
  lynxContainerCurrentScrollFactor: SharedValue<number>
  lynxContainerMaximumScrollFactor: number
  lynxContainerActiveSectionIndex: DerivedValue<number>
  displayItemWidth: number
  displayItemHeight: number
}

export function DisplayBox({
  lynxContainerItemDataArray,
  lynxContainerCurrentScrollFactor,
  lynxContainerMaximumScrollFactor,
  lynxContainerActiveSectionIndex,
  displayItemWidth,
  displayItemHeight }: DisplayBoxProps)
{
  // const startScrollFactor = useSharedValue(0) // 0 doesn't matter I guess

  // const gesture = Gesture.Pan()
  //   .onBegin(() => {
  //     startScrollFactor.value = lynxContainerCurrentScrollFactor.value
  //   })
  //   .onUpdate((event) => {
  //     const dragFactor = -event.translationX / displayItemWidth
  //     lynxContainerCurrentScrollFactor.value = clamp(startScrollFactor.value + dragFactor, 0, lynxContainerMaximumScrollFactor)
  //   })
  //   .onEnd((event) => {
  //     const velocity = -event.velocityX / displayItemWidth;
  //     lynxContainerCurrentScrollFactor.value = withSpring(Math.round(lynxContainerCurrentScrollFactor.value), {
  //       damping: 15,
  //       stiffness: 120,
  //       mass: 1,
  //       overshootClamping: false, // true = disables bounce, false = allows
  //     })
  //     // lynxContainerCurrentScrollFactor.value = withDecay({ velocity, clamp: [0, lynxContainerMaximumScrollFactor], deceleration: 0.999 })
  //     // lynxContainerCurrentScrollFactor.value = withTiming(Math.round(lynxContainerCurrentScrollFactor.value), { duration: 350, easing: Easing.out(Easing.cubic) });
  //   })

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  
  useAnimatedReaction(
    () => lynxContainerCurrentScrollFactor.value,
    (lynxContainerCurrentScrollFactor) => {
      scrollTo(scrollRef, lynxContainerCurrentScrollFactor * displayItemWidth, 0, false);
    },
    [displayItemWidth]
  );

  return (
    // <GestureDetector gesture={gesture}>
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.displayBox}
        contentContainerStyle={styles.displayList}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        {lynxContainerItemDataArray.map((data, index) => {
          return <DisplayItem
            key={data.key}
            index={index}
            screen={data.screen}
            lynxContainerCurrentScrollFactor={lynxContainerCurrentScrollFactor}
            lynxContainerActiveSectionIndex={lynxContainerActiveSectionIndex}
            displayItemWidth={displayItemWidth}
            displayItemHeight={displayItemHeight}
          />
        })}
      </Animated.ScrollView>
    // </GestureDetector>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  displayBox: {},
  displayList: {
    flexDirection: "row"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
