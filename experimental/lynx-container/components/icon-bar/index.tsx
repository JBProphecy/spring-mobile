////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { clamp, DerivedValue, scrollTo, SharedValue, useAnimatedReaction, useAnimatedRef, useSharedValue, withTiming } from "react-native-reanimated";
import { ICON_BAR_VISIBLE_ITEMS, LynxContainerItemData } from "../../data";
import { IconItem } from "./icon-item";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type IconBarProps = {
  lynxContainerItemDataArray: LynxContainerItemData[]
  lynxContainerCurrentScrollFactor: SharedValue<number>
  lynxContainerMaximumScrollFactor: number
  lynxContainerActiveSectionIndex: DerivedValue<number>
  iconItemWidth: number
}

export function IconBar({
  lynxContainerItemDataArray,
  lynxContainerCurrentScrollFactor,
  lynxContainerMaximumScrollFactor,
  lynxContainerActiveSectionIndex,
  iconItemWidth }: IconBarProps)
{
  const startScrollFactor = useSharedValue(0) // 0 doesn't matter I guess

  const gesture = Gesture.Pan()
    .onBegin(() => {
      startScrollFactor.value = lynxContainerCurrentScrollFactor.value
    })
    .onUpdate((event) => {
      const dragFactor = -event.translationX / iconItemWidth
      lynxContainerCurrentScrollFactor.value = clamp(startScrollFactor.value + dragFactor, 0, lynxContainerMaximumScrollFactor)
    })
    .onEnd((event) => {
      lynxContainerCurrentScrollFactor.value = withTiming(Math.round(lynxContainerCurrentScrollFactor.value), { duration: 350 });
    })

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  
  useAnimatedReaction(
    () => lynxContainerCurrentScrollFactor.value,
    (lynxContainerCurrentScrollFactor) => {
      scrollTo(scrollRef, lynxContainerCurrentScrollFactor * iconItemWidth, 0, false);
    },
    [iconItemWidth]
  );
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.iconBar}
        contentContainerStyle={[styles.iconList, { paddingHorizontal: (ICON_BAR_VISIBLE_ITEMS % 2 === 1) ? (iconItemWidth * Math.floor(ICON_BAR_VISIBLE_ITEMS / 2)) : 0 }] }
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        {lynxContainerItemDataArray.map((data, index) => {
          return <IconItem
            key={data.key}
            index={index}
            icon={data.icon}
            lynxContainerCurrentScrollFactor={lynxContainerCurrentScrollFactor}
            lynxContainerActiveSectionIndex={lynxContainerActiveSectionIndex}
            iconItemWidth={iconItemWidth}
          />
        })}
      </Animated.ScrollView>
    </GestureDetector>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  iconBar: {},
  iconList: {
    flexDirection: "row"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
