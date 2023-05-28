/* eslint-disable react/prop-types */
import { Box, ThemeProvider } from '@mui/material'
import { useContext } from 'react'
import { themeContext } from '../contexts'

export default function ThemeStore({ children }) {
    const { theme } = useContext(themeContext)

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
