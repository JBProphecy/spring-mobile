////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ButtonStateHook = {
  isDisabled: boolean
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
  isPressed: boolean
  setIsPressed: React.Dispatch<React.SetStateAction<boolean>>
}

export function useButtonState(initialIsDisabled: boolean, initialIsPressed: boolean)
{
  const [isDisabled, setIsDisabled] = useState<boolean>(initialIsDisabled)
  const [isPressed, setIsPressed] = useState<boolean>(initialIsPressed)

  return {
    isDisabled, setIsDisabled,
    isPressed, setIsPressed
  } as const satisfies ButtonStateHook
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
