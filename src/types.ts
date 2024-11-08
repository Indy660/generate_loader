export type constCssType = {
  numberOfCircles: number
  sizeLoader: number
  transformFrom: number
  transformTo: number
  size: number
  time: number
  count: number
  turns: number
}

export type constCssPropsType = constCssType & { isTransparent: boolean }
