import { createContext } from "react"
import { PixelRatio } from "react-native"

export const SystemFontScaleContext = createContext<number>(PixelRatio.getFontScale())
