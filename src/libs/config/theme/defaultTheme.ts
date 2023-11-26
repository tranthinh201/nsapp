import { Platform } from 'react-native'
import { DefaultTheme, useTheme } from 'react-native-paper'

const fontConfig = {
  fontFamily: 'NotoSans-Regular',
}

export const defaultTheme = {
  ...DefaultTheme,
  custom: 'property',
  colors: {
    ...DefaultTheme.colors,
    primary: '#5160B7',
    secondary: '#49CFED',
    background: '#fff',
    backgroundYellow: '#F9F7D1',
    error: '#F0A69B',
    text: '#fff',
    borderInput: '#9B9B9B',
    textGray: '#545454',
    textRed: '#D4102A',
    secondaryText: '#8F8F8F',
    placeholder: '#C0C0C0',
    divider: '#D4D4D4',
  },
  // fonts: configureFonts({ config: fontConfig }),
}

export const BANNER_HEIGHT = Platform.select({ ios: 325, android: 315 })
export const SECTION_RADIUS = 20

export const TAB_BAR_HEIGHT = Platform.OS === 'android' ? 70 : 80

export const PADDING_HORIZONTAL_CONTAINER = 10

export type AppTheme = typeof defaultTheme

export const useAppTheme = () => useTheme<AppTheme>()
