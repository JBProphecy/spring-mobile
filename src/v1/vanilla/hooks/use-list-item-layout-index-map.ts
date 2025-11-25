////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { IndexMap } from "@/src/v1/vanilla/types/index-map"
import { useCallback, useEffect, useRef, useState } from "react"
import { LayoutChangeEvent, LayoutRectangle } from "react-native"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ListItemLayoutIndexMapHook = {
  listItemLayoutIndexMap: IndexMap<LayoutRectangle> | null
  handleLayoutListItem: (index: number) => (event: LayoutChangeEvent) => void
}
export function useListItemLayoutIndexMap(count: number)
{
  const listItemLayoutIndexMapRef = useRef<IndexMap<LayoutRectangle>>({})

  const [listItemLayoutIndexMap, setListItemLayoutIndexMap] = useState<IndexMap<LayoutRectangle> | null>(null)

  const handleLayoutListItem = useCallback((index: number) => (event: LayoutChangeEvent) => {
    listItemLayoutIndexMapRef.current[index] = event.nativeEvent.layout
    if (Object.keys(listItemLayoutIndexMapRef.current).length === count) {
      let accumulatedWidth = 0
      for (let i = 0; i < count; i++) {
        listItemLayoutIndexMapRef.current[i].x = accumulatedWidth
        accumulatedWidth += listItemLayoutIndexMapRef.current[i].width
      }
      setListItemLayoutIndexMap(listItemLayoutIndexMapRef.current)
    }
  }, [])

  useEffect(() => {
    listItemLayoutIndexMapRef.current = {}
    setListItemLayoutIndexMap(null)
  }, [count])

  return { listItemLayoutIndexMap, handleLayoutListItem } as const satisfies ListItemLayoutIndexMapHook
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
