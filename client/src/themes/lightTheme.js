import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            paper: '#f4f4f4'
        },
    },

    components: {
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