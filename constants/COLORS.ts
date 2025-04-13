const ColorchipColorsObj = {
  BEIGE: 'beige',
  PURPLE: 'purple',
  GREEN: 'green',
  BLUE: 'blue',
} as const;

export type ColorchipColors = (typeof ColorchipColorsObj)[keyof typeof ColorchipColorsObj];

const COLORCHIP_COLORS = Object.values(ColorchipColorsObj) as ColorchipColors[];

const DEFAULT_COLORCHIP_COLOR = COLORCHIP_COLORS[0];

export { COLORCHIP_COLORS, DEFAULT_COLORCHIP_COLOR };
