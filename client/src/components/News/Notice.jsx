import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Notice({ cor, description, id}) {

    return (
        <Box sx={{ display: 'flex', mb: '3vh' }}>
            <Box sx={{ bgcolor: `#${cor}`, width: '13vh', height: '13vh', borderRadius: '10px', ml: '2vw' }} />
            <Box sx={{ ml: '1vw' }}>
                <Typography sx={{ color: 'black', opacity: '54%', mb: '.5vw', fontSize: '2vh' }}>UNews</Typography>
                <Typography sx={{ color: 'black', width: '25vw', fontSize: '2vh' }}>{description}</Typography>
                <Link href={`#${id}`}>
                    <Typography sx={{fontSize:'2vh',}}>Leia Mais</Typography>
                </Link>
            </Box>
        </Box>
    )
}
