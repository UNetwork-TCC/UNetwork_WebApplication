import { type Theme, type ThemeOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    '2xl': true
  }
}

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
