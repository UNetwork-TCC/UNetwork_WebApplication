import { type Theme, type ThemeOptions } from '@mui/material/styles'

declare module '@mui/material' {
  interface CustomTheme extends Theme {
    background?: {
      card?: any
    }
  }

  interface CustomThemeOptions extends ThemeOptions {
    background?: {
      card?: any
    }
  }

  export function createTheme(options?: CustomThemeOptions | any): CustomTheme
}
