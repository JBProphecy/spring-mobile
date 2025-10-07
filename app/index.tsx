////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { RGB } from "@/common/water/colors";
import { LynxContainer } from "@/experimental/lynx-container/components";
import { LynxContainerItemDataVariantValues } from "@/experimental/lynx-container/data";
import { SafeAreaView } from "react-native-safe-area-context";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: RGB[12] }} edges={["bottom", "left", "right", "top"]}>
      <LynxContainer
        lynxContainerItemDataArray={LynxContainerItemDataVariantValues}
        lynxContainerDefaultScrollFactor={0}
      />
    </SafeAreaView>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
