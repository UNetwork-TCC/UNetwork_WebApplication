/* eslint-disable quotes */
import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        
        background: {
            paper: '#303030'
        },

        primary: {
            main: '#d1c4e9',
            light: '#311b92',
            dark: '#673ab7',
        },

        secondary: {
            main: '#b2ebf2',
            light: '#006064',
            dark: '#00bcd4',
        },

        contrast: {
            main: '#f8bbd0',
            light: '#ad1467',
            dark: '#e91e63',
        },

        otherElements: {
            tinyElements: 'rgba(255, 255, 255, 0.38)',
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