import { ThemeProvider } from '@mui/material'
import { type ReactElement, useContext } from 'react'
import { themeContext } from '$contexts'

export default function ThemeStore({ children }: { children: React.ReactNode }): ReactElement {
    const { theme } = useContext(themeContext)

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}