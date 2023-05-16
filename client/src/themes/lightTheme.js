import { createTheme } from '@mui/material'
import { CSSBaselineStyles } from '../styles'

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            paper: '#f4f4f4'
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: { ...CSSBaselineStyles }
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