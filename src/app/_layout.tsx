////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SystemFontScaleProvider } from "../application/modules/system-font-scale";
import { RootDirectoryProvider } from "../development/random/mk-02";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function RootLayout()
{
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SystemFontScaleProvider>
        <RootDirectoryProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </RootDirectoryProvider>
      </SystemFontScaleProvider>
    </GestureHandlerRootView>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
