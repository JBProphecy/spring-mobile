////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useLayoutDimensions } from "@/common/vanilla/hooks/use-layout-dimensions"
import { LayoutChangeEvent } from "react-native"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type LynxContainerLayoutDimensions = {
  lynxContainerWidth: number | null
  lynxContainerHeight: number | null
  handleLayoutChangeEvent: (event: LayoutChangeEvent) => void
}

export function useLynxContainerLayoutDimensions() {
  const { width, height, handleLayoutChangeEvent } = useLayoutDimensions()
  return {
    lynxContainerWidth: width,
    lynxContainerHeight: height,
    handleLayoutChangeEvent
  } as const satisfies LynxContainerLayoutDimensions
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
