import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Contact({username}) {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <IconButton sx={{ mb: '15px', }}>
            <AccountCircleIcon sx={matches ? { fontSize: '70px' } : { fontSize: '45px', }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                <Typography sx={matches ? { fontSize: '12px', fontWeight: 'bold', color: 'black' } : { fontSize: '12px', fontWeight: 'bold', color: 'black' }}>{username}</Typography>
                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
            </Box>
        </IconButton>
    )
}
