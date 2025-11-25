////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { BasicButton } from "@/src/v1/vanilla/components/basic-button/basic-button";
import { useLayout } from "@/src/v1/vanilla/hooks/use-layout";
import { JaxConstants } from "@/src/v2/app/constants/master";
import { useSystemFontScale } from "@/src/v2/app/hooks/system-font-scale";
import { useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { ProfileSelectionConstants } from "./profile-selection-constants";
import { PROFILE_SELECTION_MODEL_ARRAY } from "./profile-selection-data";
import { MemoizedProfileSelectionItem } from "./profile-selection-item";
import { ProfileSelectionModel } from "./profile-selection-model";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ProfileSelectionScreenProps = {
  cardWidth?: number
  titleColor?: string
  titleFontSize?: number
  titleLineHeight?: number
  buttonRowHorizontalPadding?: number
  buttonRowGap?: number
  buttonColor?: string
  buttonFontSize?: number
  buttonLineHeight?: number
  buttonTransitionDuration?: number
}

export function ProfileSelectionScreen({
  cardWidth = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_CARD_WIDTH,
  titleColor = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_TITLE_COLOR,
  titleFontSize: internalTitleFontSize = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_TITLE_FONT_SIZE,
  titleLineHeight: internalTitleLineHeight = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_TITLE_LINE_HEIGHT,
  buttonRowHorizontalPadding = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_BUTTON_ROW_HORIZONTAL_PADDING,
  buttonRowGap = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_BUTTON_ROW_GAP,
  buttonColor,
  buttonFontSize,
  buttonLineHeight,
  buttonTransitionDuration
}: ProfileSelectionScreenProps)
{
  const systemFontScale = useSystemFontScale()

  const resolvedTitleFontSize = internalTitleFontSize * systemFontScale
  const resolvedTitleLineHeight = internalTitleLineHeight * systemFontScale

  const profileListLayout = useLayout()

  const profileListContentHorizontalPadding = useMemo<number | undefined>(() => {
    if (profileListLayout.layout === null) { return undefined }
    return profileListLayout.layout.width / 2 - cardWidth / 2
  }, [profileListLayout.layout, cardWidth])

  const profileListItemInterval = cardWidth

  const profileListScrollPosition = useSharedValue<number>(0)
  const profileListScrollFactor = useDerivedValue(() => profileListScrollPosition.value / profileListItemInterval)
  const profileListActiveItemIndex = useDerivedValue(() => Number.isInteger(profileListScrollFactor.value) ? profileListScrollFactor.value : null)
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    profileListScrollPosition.value = event.nativeEvent.contentOffset.x
  }

  const renderItem: ListRenderItem<ProfileSelectionModel> = useCallback(({ item, index, separators }) => {
    return <MemoizedProfileSelectionItem profile={item} index={index} scrollFactor={profileListScrollFactor} activeIndex={profileListActiveItemIndex} cardWidth={cardWidth} />
  }, [cardWidth])

  return (
    <View style={styles.screen}>
      <Text
        children="Select a Profile"
        style={[styles.title, {
          color: titleColor,
          fontSize: resolvedTitleFontSize,
          lineHeight: resolvedTitleLineHeight
        }]}
      />
      <FlatList
        style={[styles.profileList, {
          opacity: profileListLayout.layout === null ? 0 : undefined
        }]}
        contentContainerStyle={[styles.profileListContent, {
          paddingHorizontal: profileListContentHorizontalPadding
        }]}
        horizontal
        showsHorizontalScrollIndicator={false}
        focusable={false}
        onScroll={handleScroll}
        onLayout={profileListLayout.handleLayout}
        snapToAlignment="start"
        snapToInterval={profileListItemInterval}
        scrollEventThrottle={16}
        decelerationRate={0.92}
        windowSize={12}
        data={PROFILE_SELECTION_MODEL_ARRAY}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({
          length: cardWidth,
          offset: (profileListContentHorizontalPadding ?? 0) + profileListItemInterval * index,
          index: index
        })}
        renderItem={renderItem}
      />
      <View
        style={[styles.buttonRow, {
          paddingHorizontal: buttonRowHorizontalPadding,
          gap: buttonRowGap
        }]}
      >
        {/* <BasicButton
          text="Access Account"
          color={buttonColor}
          fontSize={buttonFontSize}
          lineHeight={buttonLineHeight}
          transitionDuration={buttonTransitionDuration}
        /> */}
        <BasicButton
          text="Manage Profiles"
          color={buttonColor}
          fontSize={buttonFontSize}
          lineHeight={buttonLineHeight}
          transitionDuration={buttonTransitionDuration}
        />
      </View>
    </View>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  screen: {
    width: JaxConstants.Percent[100],
    height: JaxConstants.Percent[100],
    justifyContent: "space-around"
  },
  title: {
    fontWeight: "bold",
    userSelect: "none",
    alignSelf: "center",
    textAlign: "center",
  },
  profileList: {
    width: JaxConstants.Percent[100],
    flexGrow: 0
  },
  profileListContent: {},
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
