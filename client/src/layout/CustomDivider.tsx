import { Box, type SxProps } from '@mui/material'
import { themeContext } from '$contexts'
import { type ReactElement, useContext } from 'react'

export default function CustomDivider({ sx } : { sx?: SxProps }): ReactElement {
    const { theme } = useContext(themeContext)

    const borderTheme = (): string => {
        if (theme.palette.mode === 'light')
            return `${theme.palette.primary.main}99, ${theme.palette.secondary.main}99`
        else 
            return `${theme.palette.primary.main}, ${theme.palette.secondary.main}`
    }

    return (
        <Box 
            height={10} 
            m='10px 60px' 
            sx={
                { 
                    borderRadius: '20px',
                    background: `linear-gradient(40deg, ${borderTheme()});`,
                    ...sx 
                }
            } 
        />
    )
}
