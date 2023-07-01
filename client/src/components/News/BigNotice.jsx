import { Image } from '@mui/icons-material'
import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'

export default function BigNotice({ description, id, Title }) {
    return (
        <Box sx={{ m: '0 0 1vw 2vw', width: '22.5vw', height: '45vh', pr:'5px' }}>
            <Box sx={{ bgcolor: 'gray', width: '100%', height: '25vh', borderRadius: '10px 10px 10px 10px', boxShadow:'5px 5px rgba(0,0,0,0.1)', }}><Image/></Box>
            <Box sx={{ ml: '7px', mt: '5px' }}>
                <Typography sx={{ fontSize: '10px', mt: '1.5em', color: 'gray', mb: '2%' }}>{Title}</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>{description}</Typography>
                <Link href={`#${id}`}>
                    <Button sx={{ fontSize: '10px', float: 'right', border: '1px solid #673AB7', borderRadius: '30px', padding: '2px 10%', margin: '2% 3%',':hover':{ fontSize: '10px', float: 'right', border: '1px solid #673AB7', borderRadius: '30px', padding: '2px 10%', margin: '2% 3%', bgcolor:'#673AB7', color:'white'} }}>Leia Mais</Button>
                </Link>

            </Box>
        </Box>
    )
}
