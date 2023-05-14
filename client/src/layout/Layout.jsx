/* eslint-disable react/prop-types */
import { Box, ThemeProvider } from '@mui/material'
import { useContext } from 'react'
import { themeContext } from '../contexts'

export default function Layout({ children }) {
    const { theme } = useContext(themeContext)

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh' }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}
