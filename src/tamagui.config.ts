import { config } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

const appConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      background: '#ffffff',
      backgroundStrong: '#f4f4f5',
      color: '#000000',
      colorHover: '#333333',
      borderColor: '#e4e4e7',
      green10: '#4caf50',
      red10: '#f44336',
    },
    dark: {
      ...config.themes.dark,
      background: '#18181b',
      backgroundStrong: '#27272a',
      color: '#ffffff',
      colorHover: '#cccccc',
      borderColor: '#3f3f46',
      green10: '#66bb6a',
      red10: '#e57373',
    },
  },
  tokens: {
    ...config.tokens,
    space: {
      ...config.tokens.space,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      7: 28,
      8: 32,
      9: 36,
      10: 40,
      true: 16,
    },
    radius: {
      ...config.tokens.radius,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
    },
    size: {
      ...config.tokens.size,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      7: 28,
      8: 32,
      9: 36,
      10: 40,
      true: 16,
    },
  },
})

export type AppConfig = typeof appConfig

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig