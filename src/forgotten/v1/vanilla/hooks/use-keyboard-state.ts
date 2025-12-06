////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function useKeyboardState()
{
  const [isKeyboardVisible, setIsKeyboardVisibile] = useState(Keyboard.isVisible())

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardVisibile(true))
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardVisibile(false))
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return { isKeyboardVisible }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
