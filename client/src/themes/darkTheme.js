/* eslint-disable quotes */
import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        
        background: {
            paper: '#303030'
        },

        primary: {
            main: '#311b92',
            dark: '#673ab7',
            light: '#d1c4e9',
        },

        secondary: {
            main: '#006064',
            dark: '#00bcd4',
            light: '#b2ebf2',
        },

        contrast: {
            main: '#ad1467',
            dark: '#e91e63',
            light: '#f8bbd0',
        },

        otherElements: {
            tinyElements: 'rgba(0, 0, 0, 0.38)',
        }
    },

    typography: {
        fontFamily: "'Public Sans', sans-serif"
    },

    components: {
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
                    color: 'primary.main',
                }
            }
        }
        /* Se quiser mudar o estilo de algum componente, é só colocar aqui:
        EX:
        
        MuiAlert: {
            styleOverrides: {
                root: {
                    backgroundColor: '#e2e9fe'
                }
            }
        }
        
        Evitem de usar CSS!!
        */
    }
})