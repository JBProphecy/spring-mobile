////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export * as Color from "./color";
export * as ReactNative from "./react-native";
export * as ReactNativeReanimated from "./react-native-reanimated";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type IndexMap<T> = { [index: number]: T }

export type JoinType<S extends string[], D extends string, Whole extends string = ""> =
  S extends [infer First extends string, ...infer Rest extends string[]]
    ? JoinType<Rest, D, Whole extends "" ? First : `${Whole}${D}${First}`>
    : Whole

export type Opacity<T extends number> = T

export type Percent<T extends number> = `${T}%`

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
