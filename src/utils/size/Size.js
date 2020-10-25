export const GLOBAL_FONT_SIZE_PX = 18

export const pxToRem = (px) => `${px / GLOBAL_FONT_SIZE_PX}rem`

export const remToPx = (rem) => Number(rem.match(/^[0-9]+(\.[0-9]+)?/)[0]) * GLOBAL_FONT_SIZE_PX

export const transformSize = (size, ratio) => {
  const value = Number(size.match(/^[0-9]+(\.[0-9]+)?/)[0])
  return `${value * ratio}rem`
}

const Size = {
  PX_0: '0rem',
  PX_0_8: '0.0444rem',
  PX_1: '0.0556rem',
  PX_2: '0.1111rem',
  PX_4: '0.2222rem',
  PX_5: '0.2778rem',
  PX_6: '0.3333rem',
  PX_8: '0.4444rem',
  PX_9: '0.5rem',
  PX_10: '0.5556rem',
  PX_12: '0.6667rem',
  PX_14: '0.7778rem',
  PX_16: '0.8889rem',
  PX_18: '1rem',
  PX_20: '1.1111rem',
  PX_22: '1.2222rem',
  PX_24: '1.3333rem',
  PX_25: '1.3889rem',
  PX_26: '1.4444rem',
  PX_28: '1.5556rem',
  PX_30: '1.6667rem',
  PX_32: '1.7778rem',
  PX_34: '1.8889rem',
  PX_36: '2rem',
  PX_38: '2.1111rem',
  PX_40: '2.2222rem',
  PX_45: '2.5rem',
  PX_48: '2.6667rem',
  PX_60: '3.3333rem',
  PX_64: '3.5556rem',
  PX_65: '3.6111rem',
  PX_70: '3.8889rem',
  PX_75: '4.1667rem',
  PX_76: '4.2222rem',
  PX_80: '4.4444rem',
  PX_86: '4.7778rem',
  PX_90: '5rem',
  PX_96: '5.3333rem',
  PX_100: '5.5556rem',
  PX_110: '6.1111rem',
  PX_120: '6.6667rem',
  PX_125: '6.9444rem',
  PX_128: '7.1111rem',
  PX_140: '7.7778rem',
  PX_150: '8.3333rem',
  PX_160: '8.8889rem',
  PX_180: '10rem',
  PX_200: '11.1111rem',
  PX_260: '14.4444rem',
  PX_300: '16.6667rem',
  PX_320: '17.7778rem',
  PX_400: '22.2222rem',
  PX_480: '26.6667rem',
  PX_500: '27.7778rem',
  PX_530: '29.4444rem',
  PX_550: '30.5556rem',
  PX_600: '33.3333rem'
}

export default Size
