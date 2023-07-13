import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Contact({ username }) {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box sx={{ mb: '2.2vh', display:'flex', alignItems:'center', ml:'2%', width:'79vh', height:'10vh' }}>
            <AccountCircleIcon sx={matches ? { fontSize: '10vh', color:'gray'} : { fontSize: '45px', }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '1.6vh' }}>
                <Box>
                    <Typography sx={matches ? { fontSize: '1.9vh', fontWeight: 'bold', color: 'black' } : { fontSize: '12px', fontWeight: 'bold', color: 'black' }}>{username}</Typography>
                </Box>
                <Box sx={{display:'flex'}}>
                    <Typography sx={{ fontSize: '1.8vh' }}>last mensage</Typography>
                </Box>
            </Box>
        </Box>
    )
}
