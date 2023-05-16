import { createTheme } from '@mui/material'
import { CSSBaselineStyles } from '../styles'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#333'
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: { ...CSSBaselineStyles }
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