import { useContext } from "react"
import { SystemFontScaleContext } from "./context"

export function useSystemFontScale() {
  return useContext(SystemFontScaleContext)
}
