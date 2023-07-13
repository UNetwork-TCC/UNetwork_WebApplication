import { Image } from '@mui/icons-material'
import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'

export default function BigNotice({ description, id, Title }) {
    return (
        <Box sx={{ m: '0 0 1vw 2vw', width: '22.5vw', height: '45vh', pr:'.6vh' }}>
            <Box sx={{ bgcolor: 'gray', width: '100%', height: '25vh', borderRadius: '2.1vh', boxShadow:'.6vh .6vh rgba(0,0,0,0.2)', }}><Image/></Box>
            <Box sx={{ ml: '.8vh', mt: '.6vh' }}>
                <Typography sx={{ fontSize: '1.7vh', mt: '1.5em', color: 'gray', mb: '2%' }}>{Title}</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '2.5vh' }}>{description}</Typography>
                <Link href={`#${id}`}>
                    <Button sx={{ fontSize: '1.5vh', float: 'right', border: '1px solid #673AB7', borderRadius: '3.1vh', padding: '.3vh 10%', margin: '3% 3%',':hover':{ bgcolor:'#673AB7', color:'white'} }}>Leia Mais</Button>
                </Link>

            </Box>
        </Box>
    )
}
