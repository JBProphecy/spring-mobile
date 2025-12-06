////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { JaxTypes } from "../../types/master"
import { JaxUtilsNumber } from "../number/master"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////s

export function validateRGB<T extends number>(value: T): T {
  JaxUtilsNumber.verifyIsInteger(value)
  JaxUtilsNumber.verifyIsGreaterThanOrEqualTo(value, 0)
  return JaxUtilsNumber.verifyIsLessThanOrEqualTo(value, 255)
}

export function validateA<T extends number>(value: T): T {
  JaxUtilsNumber.verifyIsNotNaN(value)
  JaxUtilsNumber.verifyIsGreaterThanOrEqualTo(value, 0)
  return JaxUtilsNumber.verifyIsLessThanOrEqualTo(value, 1)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function buildRGB<R extends number, G extends number, B extends number>(r: R, g: G, b: B): JaxTypes.Color.RGB<R, G, B> {
  return `rgb(${validateRGB(r)}, ${validateRGB(g)}, ${validateRGB(b)})`
}

export function buildRGBA<R extends number, G extends number, B extends number, A extends number>(r: R, g: G, b: B, a: A): JaxTypes.Color.RGBA<R, G, B, A> {
  return `rgba(${validateRGB(r)}, ${validateRGB(g)}, ${validateRGB(b)}, ${validateA(a)})`
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function buildNeutralRGB<RGB extends number>(rgb: RGB): JaxTypes.Color.RGB<RGB, RGB, RGB> {
  return buildRGB(rgb, rgb, rgb)
}

export function buildNeutralRGBA<RGB extends number, A extends number>(rgb: RGB, a: A): JaxTypes.Color.RGBA<RGB, RGB, RGB, A> {
  return buildRGBA(rgb, rgb, rgb, a)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
