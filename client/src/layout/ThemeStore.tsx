 
import { ThemeProvider } from '@mui/material'
import { useContext } from 'react'
import { themeContext } from '$contexts'

export default function ThemeStore({ children }: { children: React.ReactNode }) {
    const { theme } = useContext(themeContext)

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}