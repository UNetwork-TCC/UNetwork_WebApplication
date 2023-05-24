/* eslint-disable react/prop-types */
import { Box, ThemeProvider } from '@mui/material'
import { useContext } from 'react'
import { themeContext } from '../contexts'

export default function Layout({ children, sx }) {
    const { theme } = useContext(themeContext)

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh', overflowX: 'hidden', ...sx }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}
