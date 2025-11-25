////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { StyleSheet } from "react-native";
import { JaxTypesColor } from "../types/color/master";
import { JaxTypes } from "../types/master";
import { JaxUtilsColor } from "../utils/color/master";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export * as App from "./app";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Percent = {
  50: "50%",
  100: "100%"
} as const satisfies Record<number, JaxTypes.Percent<number>>

export const RGB = {
  0: JaxUtilsColor.buildNeutralRGB(0),
  8: JaxUtilsColor.buildNeutralRGB(8),
  12: JaxUtilsColor.buildNeutralRGB(12),
  16: JaxUtilsColor.buildNeutralRGB(16),
  128: JaxUtilsColor.buildNeutralRGB(128),
  176: JaxUtilsColor.buildNeutralRGB(176),
  208: JaxUtilsColor.buildNeutralRGB(208),
} as const satisfies Record<number, JaxTypesColor.RGB<number, number, number>>

export const Style = StyleSheet.create(
  {
    fullFlex: {
      width: Percent[100],
      height: Percent[100],
      display: "flex"
    },
    fullFlexCenter: {
      width: Percent[100],
      height: Percent[100],
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
