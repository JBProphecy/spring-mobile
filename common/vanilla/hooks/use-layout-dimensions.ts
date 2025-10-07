////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react"
import { LayoutChangeEvent } from "react-native"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type LayoutDimensions = {
  width: number | null
  height: number | null
  handleLayoutChangeEvent: (event: LayoutChangeEvent) => void
}

export function useLayoutDimensions() {
  const [width, setWidth] = useState<number | null>(0)
  const [height, setHeight] = useState<number | null>(0)
  const handleLayoutChangeEvent = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout
    if (layout.width !== width) { setWidth(layout.width) }
    if (layout.height !== height) { setHeight(layout.height) }
  }
  return { width, height, handleLayoutChangeEvent } as const satisfies LayoutDimensions
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
