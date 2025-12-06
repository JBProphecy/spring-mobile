////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function checkIsNaN(current: number): boolean {
  return Number.isNaN(current)
}

export function verifyIsNaN<T extends number>(current: T): T {
  if (!checkIsNaN(current)) {
    throw new Error("Invalid Parameter ==> The current number must be NaN.")
  }
  return current
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function checkIsNotNaN(current: number): boolean {
  return !Number.isNaN(current)
}

export function verifyIsNotNaN<T extends number>(current: T): T {
  if (!checkIsNotNaN(current)) {
    throw new Error("Invalid Parameter ==> The current number must not be NaN.")
  }
  return current
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function checkIsFinite(current: number): boolean {
  return Number.isFinite(current)
}

export function verifyIsFinite<T extends number>(current: T): T {
  if (!checkIsFinite(current)) {
    throw new Error("Invalid Parameter ==> The current number must be finite.")
  }
  return current
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function checkIsInteger(current: number): boolean {
  return Number.isInteger(current)
}

export function verifyIsInteger<T extends number>(current: T): T {
  if (!checkIsInteger(current)) {
    throw new Error("Invalid Parameter ==> The current number must be an integer.")
  }
  return current
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function checkIsGreaterThan(current: number, target: number): boolean {
  return verifyIsFinite(current) > verifyIsFinite(target)
}

export function verifyIsGreaterThan<T extends number>(current: T, target: number): T {
  if (!checkIsGreaterThan(current, target)) {
    throw new Error("Invalid Parameter ==> The current number must be greater than the target number.")
  }
  return current
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function checkIsLessThan(current: number, target: number): boolean {
  return verifyIsFinite(current) < verifyIsFinite(target)
}

export function verifyIsLessThan<T extends number>(current: T, target: number): T {
  if (!checkIsLessThan(current, target)) {
    throw new Error("Invalid Parameter ==> The current number must be less than the target number.")
  }
  return current
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function checkIsGreaterThanOrEqualTo(current: number, target: number): boolean {
  return verifyIsFinite(current) >= verifyIsFinite(target)
}

export function verifyIsGreaterThanOrEqualTo<T extends number>(current: T, target: number): T {
  if (!checkIsGreaterThanOrEqualTo(current, target)) {
    throw new Error("Invalid Parameter ==> The current number must be greater than or equal to the target number.")
  }
  return current
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function checkIsLessThanOrEqualTo(current: number, target: number): boolean {
  return verifyIsFinite(current) <= verifyIsFinite(target)
}

export function verifyIsLessThanOrEqualTo<T extends number>(current: T, target: number): T {
  if (!checkIsLessThanOrEqualTo(current, target)) {
    throw new Error("Invalid Parameter ==> The current number must be less than or equal to the target number.")
  }
  return current
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
