////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { StyleSheet, View } from "react-native"
import { useSystemFontScale } from "../hooks/system-font-scale"
import { JaxUtilsColor } from "../utils/color/master"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace SongView
{
  export type Props = {}

  export function Element(props: Props): React.JSX.Element
  {
    const systemFontScale = useSystemFontScale()
    
    return (
      <View style={styles.box} />
    )
  }

  export const styles = StyleSheet.create({
    box: {
      width: 200,
      height: 200,
      backgroundColor: JaxUtilsColor.buildRGB(0, 255, 200)
    }
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
