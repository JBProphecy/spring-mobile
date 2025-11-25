////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { JaxTypes } from "@/src/v2/app/types/master"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace BasicTextInputTypes
{
  export type FilteredTextInputProps = Omit<JaxTypes.ReactNative.Props.TextInput,
    "style" |
    "placeholderTextColor"
  >

  export type OptionalProps = {
    width?: JaxTypes.ReactNative.Styles.Width
    color?: JaxTypes.ReactNative.Styles.Color
    fontSize?: number
    padding?: number
    borderWidth?: number
    borderRadius?: number
    backgroundColor?: JaxTypes.ReactNative.Styles.BackgroundColor
    transitionDuration?: number
    textInputProps?: FilteredTextInputProps
  }

  export type Props = {
    optionalProps?: OptionalProps
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
