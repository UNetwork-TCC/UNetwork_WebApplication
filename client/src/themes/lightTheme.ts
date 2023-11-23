import {
    createTheme,
    responsiveFontSizes
} from '@mui/material'
import defaultThemeProperties from './defaultThemeProps'
import { grey } from '@mui/material/colors'

let lightTheme = createTheme({
    palette: {
        mode: 'light',

        background: {
            paper: '#fafafa',
            card: grey[100]
        },

        primary: {
            main: '#673ab7',
            light: '#d1c4e9',
            dark: '#311b92'
        },

        secondary: {
            main: '#00bcd4',
            light: '#b2ebf2',
            dark: '#006064'
        },

        contrast: {
            main: '#e91e63',
            light: '#f8bbd0',
            dark: '#ad1467'
        },

        tinyElements: 'rgba(0, 0, 0, 0.38)'
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
                    background: '#fafafa'
                }
            }
        }
    }
})

lightTheme = responsiveFontSizes(lightTheme)

export { lightTheme }
