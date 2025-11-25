////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { generateImmutableMapFromArray } from "@/src/v2/app/modules/jax/utils"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ClientRouteKey = string

const ClientRouteKeyArray = [
  // New Account
  "RegisterAccount",
  "RegisterAccountVerifyEmail",

  // Profile Selection
  "SelectProfile",

  // Current Account
  "ViewYourAccount",
  "ViewYourAccountProfiles",
  "ViewYourAccountSettings",
  "ManageYourAccount",
  "ManageYourAccountChangeEmail",
  "ManageYourAccountChangeEmailVerify",
  "ManageYourAccountChangePassword",
  "ManageYourAccountChangePasswordVerify",
  "DeleteYourAccount",
  "DeleteYourAccountVerify",
  "CloseYourAccount",

  // Current Profile
  "ViewYourProfile",
  "ViewYourProfileFriends",
  "ViewYourProfileFollowers",
  "ViewYourProfileFollowing",
  "ViewYourProfileAchievements",
  "ViewYourProfileRewards",
  "ViewYourProfileStats",
  "ViewYourProfileFriendRequests",
  "ViewYourProfileFriendRequestsSent",
  "ViewYourProfileFriendRequestsReceived",
  "ViewYourProfileSettings",
  "ManageYourProfile",
  "ManageYourProfileChangeUsername",
  "ManageYourProfileChangePassword",
  "ManageYourProfileChangePasswordVerify",
  "DeleteYourProfile",
  "DeleteYourProfileVerify",
  "CloseYourProfile"
] as const satisfies ClientRouteKey[]

export type ClientRouteKeyVariant = typeof ClientRouteKeyArray[number]

export const ClientRouteKeyMap = generateImmutableMapFromArray(ClientRouteKeyArray)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
