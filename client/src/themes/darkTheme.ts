import { type CustomTheme, createTheme, responsiveFontSizes } from '@mui/material'
import defaultThemeProperties from './defaultThemeProps'
import { grey } from '@mui/material/colors'

let darkTheme: CustomTheme = createTheme({
    palette: {
        mode: 'dark',

        background: {
            paper: '#322e36',
            secondary: '#28242b',
            terciary: '#303030',
            card: '#262329'
        },

        primary: {
            main: '#d1c4e9',
            light: '#311b92',
            dark: '#673ab7'
        },

        secondary: {
            main: '#b2ebf2',
            light: '#006064',
            dark: '#00bcd4'
        },

        contrast: {
            main: '#f8bbd0',
            light: '#ad1467',
            dark: '#e91e63'
        },

        tinyElements: 'rgba(255, 255, 255, 0.38)'
    },

    typography: {
        ...defaultThemeProperties.typography
    },

    components: {
        ...defaultThemeProperties.components,

        MuiCssBaseline: {
            styleOverrides: {
                ...defaultThemeProperties.components.MuiCssBaseline.styleOverrides,

                '::-webkit-scrollbar-track:': {
                    background: '#303030'
                },

                body: {
                    backgroundColor: '#303030'
                }
            }
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    color: 'rgba(0, 0, 0, 0.42)'
                }
            }
        },

        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'primary.main'
                }
            }
        }
    }
})

darkTheme = responsiveFontSizes(darkTheme)

export { darkTheme }
