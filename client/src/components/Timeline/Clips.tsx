import { Box, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { type ReactElement } from 'react'

export default function Clips({ username } : { username: string }): ReactElement {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '10%',
                height: '100%',
                justifyContent: 'center',
                ml: '3.2%',
                cursor: 'pointer' 
            }}>
            <AccountCircle sx={{ fontSize: '7em', color: 'gray' }}></AccountCircle>
            <Typography sx={{ fontSize: '120%', fontWeight: 'bold' }}>{username}</Typography>
        </Box>
    )
}