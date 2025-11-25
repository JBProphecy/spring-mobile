////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Styles } from "../../types/jax-styles"
import { ReactNativeProps } from "../../types/react-native-props"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace BasicTextInputTypes
{
  export type FilteredTextInputProps = Omit<ReactNativeProps.TextInput,
    "style" |
    "placeholderTextColor"
  >

  export type OptionalProps = {
    width?: Styles.Width
    color?: Styles.Color
    fontSize?: number
    padding?: number
    borderWidth?: number
    borderRadius?: number
    backgroundColor?: Styles.BackgroundColor
    transitionDuration?: number
    textInputProps?: FilteredTextInputProps
  }

  export type Props = {
    optionalProps?: OptionalProps
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
