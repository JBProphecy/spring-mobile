////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ClientRouteKeyVariant } from "./client-route-key"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ClientRoutePath = string | null

export const ClientRoutePathMap = {
  RegisterAccount: "/account/register",
  RegisterAccountVerifyEmail: "/account/register/verify-email",

  SelectProfile: null,
  
  ViewYourAccount: null,
  ViewYourAccountProfiles: null,
  ViewYourAccountSettings: null,
  ManageYourAccount: null,
  ManageYourAccountChangeEmail: null,
  ManageYourAccountChangeEmailVerify: null,
  ManageYourAccountChangePassword: null,
  ManageYourAccountChangePasswordVerify: null,
  DeleteYourAccount: null,
  DeleteYourAccountVerify: null,
  CloseYourAccount: null,

  ViewYourProfile: null,
  ViewYourProfileFriends: null,
  ViewYourProfileFollowers: null,
  ViewYourProfileFollowing: null,
  ViewYourProfileAchievements: null,
  ViewYourProfileRewards: null,
  ViewYourProfileStats: null,
  ViewYourProfileFriendRequests: null,
  ViewYourProfileFriendRequestsSent: null,
  ViewYourProfileFriendRequestsReceived: null,
  ViewYourProfileSettings: null,
  ManageYourProfile: null,
  ManageYourProfileChangeUsername: null,
  ManageYourProfileChangePassword: null,
  ManageYourProfileChangePasswordVerify: null,
  DeleteYourProfile: null,
  DeleteYourProfileVerify: null,
  CloseYourProfile: null
} as const satisfies Record<ClientRouteKeyVariant, ClientRoutePath>

export type ClientRoutePathVariant = typeof ClientRoutePathMap[keyof typeof ClientRoutePathMap]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
