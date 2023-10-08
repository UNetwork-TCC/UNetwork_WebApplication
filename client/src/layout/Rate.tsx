import { useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { type ReactElement } from 'react'

export default function Rate({ children }: { children: ReactElement | number }): ReactElement {
    const theme = useTheme()

    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='4rem' 
            width='4rem'
            borderRadius='100%'
            bgcolor={theme.palette.mode === 'light' ? grey[200] : grey[800]}
            sx={{
                cursor: 'pointer',
                transition: '.1s ease-in-out',
                ':hover': {
                    bgcolor: theme.palette.mode === 'light' ? grey[300] : grey[700]
                }
            }}
        >
            {children}
        </Box>
    )
}