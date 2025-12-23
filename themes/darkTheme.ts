import {
  type CustomTheme,
  createTheme,
  responsiveFontSizes
} from '@mui/material'
import defaultThemeProperties from './defaultThemeProps'

let darkTheme: CustomTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1440,
      xl: 1920,
      '2xl': 2560
    }
  },

  palette: {
    mode: 'dark',

    background: {
      default: '#0d0d0d',
      paper: '#1a1a1a',
      secondary: '#121212',
      terciary: '#242424',
      card: '#161616'
    },

    primary: {
      main: '#b39ddb',
      light: '#e1bee7',
      dark: '#9575cd',
      contrastText: '#1a1625'
    },

    secondary: {
      main: '#80deea',
      light: '#b2ebf2',
      dark: '#4dd0e1',
      contrastText: '#1a1625'
    },

    contrast: {
      main: '#f48fb1',
      light: '#f8bbd0',
      dark: '#f06292'
    },

    text: {
      primary: '#f5f5f5',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)'
    },

    divider: 'rgba(255, 255, 255, 0.12)',

    action: {
      active: 'rgba(255, 255, 255, 0.7)',
      hover: 'rgba(179, 157, 219, 0.08)',
      selected: 'rgba(179, 157, 219, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)'
    },

    tinyElements: 'rgba(255, 255, 255, 0.38)',

    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f'
    },

    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00'
    },

    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c'
    },

    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1'
    }
  },

  typography: {
    ...defaultThemeProperties.typography
  },

  components: {
    ...defaultThemeProperties.components,

    MuiCssBaseline: {
      styleOverrides: {
        ...defaultThemeProperties.components.MuiCssBaseline.styleOverrides,

        '::-webkit-scrollbar-track': {
          background: '#0d0d0d'
        },

        '::-webkit-scrollbar-thumb': {
          background: '#333333',
          borderRadius: '4px',
          '&:hover': {
            background: '#444444'
          }
        },

        body: {
          backgroundColor: '#0d0d0d',
          backgroundImage: 'none'
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(179, 157, 219, 0.23)'
            },
            '&:hover fieldset': {
              borderColor: 'rgba(179, 157, 219, 0.5)'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#b39ddb'
            }
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12
        },
        contained: {
          boxShadow: '0 4px 14px rgba(179, 157, 219, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(179, 157, 219, 0.35)'
          }
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2
          }
        }
      }
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          backgroundImage: 'none',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8
        },
        filled: {
          backgroundColor: 'rgba(179, 157, 219, 0.16)'
        }
      }
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: '#b39ddb',
          '&:hover': {
            color: '#e1bee7'
          }
        }
      }
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          backgroundImage: 'none',
          borderRadius: 16
        }
      }
    },

    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          backgroundImage: 'none'
        }
      }
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          backgroundImage: 'none',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }
      }
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#242424',
          borderRadius: 8
        }
      }
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12
        },
        standardError: {
          backgroundColor: 'rgba(244, 67, 54, 0.12)',
          color: '#f44336'
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 167, 38, 0.12)',
          color: '#ffa726'
        },
        standardSuccess: {
          backgroundColor: 'rgba(102, 187, 106, 0.12)',
          color: '#66bb6a'
        },
        standardInfo: {
          backgroundColor: 'rgba(41, 182, 246, 0.12)',
          color: '#29b6f6'
        }
      }
    }
  }
})

darkTheme = responsiveFontSizes(darkTheme)

export { darkTheme }
