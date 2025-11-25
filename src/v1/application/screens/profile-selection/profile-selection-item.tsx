////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useSystemFontScale } from "@/src/v2/app/hooks/system-font-scale"
import { JaxConstants } from "@/src/v2/app/modules/jax/constants/master"
import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import Animated, { DerivedValue, interpolate, SharedValue, useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated"
import { ProfileSelectionConstants } from "./profile-selection-constants"
import { ProfileSelectionModel } from "./profile-selection-model"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ProfileSelectionItemProps = {
  profile: ProfileSelectionModel
  index: number
  scrollFactor: SharedValue<number>
  activeIndex: DerivedValue<number | null>
  cardWidth?: number
  pictureWidth?: number
  pictureHeight?: number
  pictureBorderRadius?: number
  usernameColor?: string
  usernameFontSize?: number
  usernameLineHeight?: number
  nameColor?: string
  nameFontSize?: number
  nameLineHeight?: number
}

export function ProfileSelectionItem({
  profile,
  index,
  scrollFactor,
  activeIndex,
  cardWidth = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_CARD_WIDTH,
  pictureWidth = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_PROFILE_PICTURE_SIZE,
  pictureHeight = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_PROFILE_PICTURE_SIZE,
  pictureBorderRadius: internalPictureBorderRadius,
  usernameColor = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_USERNAME_COLOR,
  usernameFontSize: internalUsernameFontSize = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_USERNAME_FONT_SIZE,
  usernameLineHeight: internalUsernameLineHeight = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_USERNAME_LINE_HEIGHT,
  nameFontSize: internalNameFontSize = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_NAME_FONT_SIZE,
  nameLineHeight: internalNameLineHeight = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_NAME_LINE_HEIGHT,
  nameColor = ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_NAME_COLOR
}: ProfileSelectionItemProps)
{
  const systemFontScale = useSystemFontScale()

  const resolvedPictureBorderRadius = internalPictureBorderRadius ?? Math.min(pictureWidth, pictureHeight) * ProfileSelectionConstants.PROFILE_SELECTION_SCREEN_PROFILE_PICTURE_BORDER_RADIUS_SCALE
  const resolvedUsernameFontSize = internalUsernameFontSize * systemFontScale
  const resolvedUsernameLineHeight = internalUsernameLineHeight * systemFontScale
  const resolvedNameFontSize = internalNameFontSize * systemFontScale
  const resolvedNameLineHeight = internalNameLineHeight * systemFontScale

  const isActive = useDerivedValue(() => index === activeIndex.value)

  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.abs(index - scrollFactor.value)
    const opacity = interpolate(distance, [0, 1, 2], [1, 0.1, 0])
    return { opacity: opacity }
  })

  const pictureWrapperBorderColor = useDerivedValue(() => withTiming(isActive.value ? JaxConstants.RGB[176] : "transparent", { duration: 300 }))
  const pictureWrapperAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: pictureWrapperBorderColor.value
  }))

  return (
    <Animated.View
      style={[animatedStyle, {
        width: cardWidth
      }]}
    >
      <Animated.View
        style={[styles.pictureWrapper, pictureWrapperAnimatedStyle, {
          padding: 6,
          borderWidth: 3,
          borderRadius: resolvedPictureBorderRadius + 6
        }]}
      >
        <Image
          source={{ uri: profile.pictureURL }}
          resizeMode="cover"
          accessibilityLabel="profile picture"
          style={[styles.picture, {
            width: pictureWidth,
            height: pictureHeight,
            borderRadius: resolvedPictureBorderRadius
          }]}
        />
      </Animated.View>
      <View style={{ height: 8 }} />
      <Text
        children={profile.username}
        style={[styles.username, {
          color: usernameColor,
          fontSize: resolvedUsernameFontSize,
          lineHeight: resolvedUsernameLineHeight
        }]}
      />
      <View style={{ height: 8 }} />
      <Text
        children={profile.name}
        style={[styles.name, {
          color: nameColor,
          fontSize: resolvedNameFontSize,
          lineHeight: resolvedNameLineHeight
        }]}
      />
    </Animated.View>
  )
}

export const MemoizedProfileSelectionItem = React.memo(ProfileSelectionItem)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  pictureWrapper: {
    alignSelf: "center",
  },
  picture: {},
  username: {
    fontWeight: "bold",
    userSelect: "none",
    alignSelf: "center",
    textAlign: "center"
  },
  name: {
    fontWeight: "bold",
    userSelect: "none",
    alignSelf: "center",
    textAlign: "center"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
