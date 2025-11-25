////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { JaxUtilsNumber } from "../number/master"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function clampNumberWithNumbers(current: number, minimum: number, maximum: number) {
  if (!JaxUtilsNumber.checkIsFinite(current)) { throw new Error("Invalid Parameter ==> The current value must be finite.") }
  if (!JaxUtilsNumber.checkIsFinite(minimum)) { throw new Error("Invalid Parameter ==> The minimum value must be finite.") }
  if (!JaxUtilsNumber.checkIsFinite(maximum)) { throw new Error("Invalid Parameter ==> The maximum value must be finite.") }
  if (minimum > maximum) { throw new Error("Invalid Range ==> The minimum value and maximum value must respect one another.") }
  if (minimum === maximum) { console.warn("Unnecessary Operation ==> The minimum value and maximum value are equal.") }
  return Math.max(minimum, Math.min(current, maximum))
}

export function clampIntegerWithIntegers(current: number, minimum: number, maximum: number) {
  if (!JaxUtilsNumber.checkIsInteger(current)) { throw new Error("Invalid Parameter ==> The current value must be an integer.") }
  if (!JaxUtilsNumber.checkIsInteger(minimum)) { throw new Error("Invalid Parameter ==> The minimum value must be an integer.") }
  if (!JaxUtilsNumber.checkIsInteger(maximum)) { throw new Error("Invalid Parameter ==> The maximum value must be an integer.") }
  return clampNumberWithNumbers(current, minimum, maximum)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
