export type constCssType = {
  numberOfCircles: number
  sizeLoader: number
  transformFrom: number
  transformTo: number
  sizeCircles: number
  time: number
  count: number
  turns: number
  isCustom: boolean
}

export type constCssPropsType = constCssType[] & { isTransparent: boolean }
