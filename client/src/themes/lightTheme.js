/* eslint-disable quotes */
import { createTheme } from '@mui/material'
import defaultThemeProps from './defaultThemeProps'

export const lightTheme = createTheme({
    palette: {
        mode: 'light',

        background: {
            paper: '#fafafa'
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
            dark: '#ad1467',
        },

        tinyElements: 'rgba(0, 0, 0, 0.38)',
    },

    typography: {
        ...defaultThemeProps.typography
    },

    components: {
        ...defaultThemeProps.components
    }
})