////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { StyleSheet, View } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { ICON_BAR_CONTAINER_HEIGHT, ICON_BAR_VISIBLE_ITEMS, LynxContainerItemData } from "../data";
import { useLynxContainerLayoutDimensions } from "../hooks/use-lynx-container-layout-dimensions";
import { DisplayBox } from "./display-box";
import { IconBar } from "./icon-bar";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type LynxContainerProps = {
  lynxContainerItemDataArray: LynxContainerItemData[]
  lynxContainerDefaultScrollFactor?: number
}

export function LynxContainer({ lynxContainerItemDataArray, lynxContainerDefaultScrollFactor = 0 }: LynxContainerProps)
{
  const lynxContainerSectionCount = lynxContainerItemDataArray.length
  if (lynxContainerDefaultScrollFactor < 0) { throw new Error("The default scroll factor must be greater than or equal to 0.") }
  if (lynxContainerDefaultScrollFactor > lynxContainerSectionCount) { throw new Error("The default scroll factor must be less than or equal to the section count.") }

  const { lynxContainerWidth, lynxContainerHeight, handleLayoutChangeEvent } = useLynxContainerLayoutDimensions()

  const lynxContainerMaximumScrollFactor = lynxContainerSectionCount - 1
  const lynxContainerCurrentScrollFactor = useSharedValue(lynxContainerDefaultScrollFactor)
  const lynxContainerActiveSectionIndex = useDerivedValue(() => Math.round(lynxContainerCurrentScrollFactor.value))
  
  const render = (lynxContainerWidth: number, lynxContainerHeight: number) => {
    const iconItemWidth = lynxContainerWidth / ICON_BAR_VISIBLE_ITEMS
    const displayItemWidth = lynxContainerWidth
    const displayItemHeight = lynxContainerHeight - ICON_BAR_CONTAINER_HEIGHT

    return <>
      <DisplayBox
        lynxContainerItemDataArray={lynxContainerItemDataArray}
        lynxContainerCurrentScrollFactor={lynxContainerCurrentScrollFactor}
        lynxContainerMaximumScrollFactor={lynxContainerMaximumScrollFactor}
        lynxContainerActiveSectionIndex={lynxContainerActiveSectionIndex}
        displayItemWidth={displayItemWidth}
        displayItemHeight={displayItemHeight}
      />
      <IconBar
        lynxContainerItemDataArray={lynxContainerItemDataArray}
        lynxContainerCurrentScrollFactor={lynxContainerCurrentScrollFactor}
        lynxContainerMaximumScrollFactor={lynxContainerMaximumScrollFactor}
        lynxContainerActiveSectionIndex={lynxContainerActiveSectionIndex}
        iconItemWidth={iconItemWidth}
      />
    </>
  }

  return (
    <View style={styles.lynxContainer} onLayout={handleLayoutChangeEvent}>
      {lynxContainerWidth !== null && lynxContainerHeight !== null ? render(lynxContainerWidth, lynxContainerHeight) : <></>}
    </View>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  lynxContainer: {
    flex: 1
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
