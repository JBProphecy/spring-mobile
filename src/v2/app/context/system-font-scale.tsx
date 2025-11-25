////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { Appearance, PixelRatio } from "react-native";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SystemFontScaleContext = React.createContext<number>(PixelRatio.getFontScale());

export function SystemFontScaleProvider({ children }: { children: React.ReactNode })
{
  const [scale, setScale] = useState(PixelRatio.getFontScale());

  useEffect(() => {
    const listener = Appearance.addChangeListener(() => {
      setScale(PixelRatio.getFontScale());
    });
    return () => listener.remove();
  }, []);

  return (
    <SystemFontScaleContext.Provider value={scale}>
      {children}
    </SystemFontScaleContext.Provider>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
