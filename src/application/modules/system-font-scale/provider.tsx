import { useEffect, useState } from "react"
import { Appearance, PixelRatio } from "react-native"
import { SystemFontScaleContext } from "./context"

export function SystemFontScaleProvider({ children }: { children: React.ReactNode })
{
  const [scale, setScale] = useState<number>(PixelRatio.getFontScale())

  useEffect(() => {
    const listener = Appearance.addChangeListener(() => {
      setScale(PixelRatio.getFontScale())
    })
    return () => listener.remove()
  }, [])

  return (
    <SystemFontScaleContext.Provider value={scale}>
      {children}
    </SystemFontScaleContext.Provider>
  )
}
