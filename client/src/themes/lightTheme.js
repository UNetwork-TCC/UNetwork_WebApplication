/* eslint-disable quotes */
import { createTheme, darkScrollbar } from '@mui/material'

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
        },

        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    overflowX: 'hidden'
                },

                scrollBehavior: 'smooth',
                // Custom Scrollbar

                '::-webkit-scrollbar': {
                    width: '10px'
                },

'                ::-webkit-scrollbar-track:': {
                    background: '#fafafa'
                },

                '::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '10px'
                },

                '::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                }
            }
        }

        /* Se quiser mudar o estilo de algum componente, é só colocar aqui:
        EX:
        z
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