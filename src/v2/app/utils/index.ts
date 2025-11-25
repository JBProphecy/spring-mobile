////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { JaxTypes } from "../types/master"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export * as Clamp from "./clamp"
export * as Color from "./color"
export * as Number from "./number"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function generateImmutableMapFromArray<A extends Array<string | number | symbol>>(array: A) {
  return Object.fromEntries(array.map(value => [value, value])) as {
    readonly [V in A[number]]: V
  }
}

export function join<D extends string, S extends [string, ...string[]]>(delimiter: D, ...segments: S): JaxTypes.JoinType<S, D> {
  return segments.join(delimiter) as JaxTypes.JoinType<S, D>
}

export function joinWithColon<T extends [string, ...string[]]>(...segments: T): JaxTypes.JoinType<T, ":"> {
  return segments.join(":") as JaxTypes.JoinType<T, ":">
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
