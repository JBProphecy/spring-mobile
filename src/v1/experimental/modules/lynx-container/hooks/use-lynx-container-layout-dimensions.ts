////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useLayout } from "@/src/v1/vanilla/hooks/use-layout"
import { LayoutChangeEvent } from "react-native"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type LynxContainerLayoutDimensions = {
  lynxContainerWidth: number | null
  lynxContainerHeight: number | null
  handleLayoutChangeEvent: (event: LayoutChangeEvent) => void
}

export function useLynxContainerLayoutDimensions() {
  const { layout, handleLayout } = useLayout()
  return {
    lynxContainerWidth: layout?.width || null,
    lynxContainerHeight: layout?.height || null,
    handleLayoutChangeEvent: handleLayout
  } as const satisfies LynxContainerLayoutDimensions
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
