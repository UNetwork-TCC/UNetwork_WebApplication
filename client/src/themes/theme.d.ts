import { type Theme, type ThemeOptions } from '@mui/material/styles'

declare module '@mui/material' {
  interface CustomTheme extends Theme {
    background?: {
      card?: string
    },

    constrast?: {
      main: string
    }

  }

  interface CustomThemeOptions extends ThemeOptions {
    background?: {
      card?: string
    },

    constrast?: {
      main: string
    }
  }

  export function createTheme(options?: CustomThemeOptions | any): CustomTheme
}
