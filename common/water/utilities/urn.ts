////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type JoinType<S extends string[], D extends string, Whole extends string = ""> =
  S extends [infer First extends string, ...infer Rest extends string[]]
    ? JoinType<Rest, D, Whole extends "" ? First : `${Whole}${D}${First}`>
    : Whole

export function join<D extends string, S extends [string, ...string[]]>(delimiter: D, ...segments: S): JoinType<S, D> {
  return segments.join(delimiter) as JoinType<S, D>
}

export function joinWithColon<T extends [string, ...string[]]>(...segments: T): JoinType<T, ":"> {
  return segments.join(":") as JoinType<T, ":">
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
