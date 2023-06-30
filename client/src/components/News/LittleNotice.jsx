import { Box, Link, Typography } from '@mui/material'
import React from 'react'


export default function LittleNotice({ cor, description, id, title}) {
    return (
        <Box sx={{ display: 'flex', mb: '4vh'}}>
            <Box sx={{ bgcolor: `#${cor}`, width: '13vh', height: '13vh', borderRadius: '10px', ml: '2vw' }} />
            <Box sx={{ ml: '1vw', display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
                <Typography sx={{ color: 'black', opacity: '54%', mb: '.5vw', fontSize: '2vh' }}>{title}</Typography>
                <Typography sx={{ color: 'black', width: '25vw', fontSize: '2vh',}}>{description}</Typography>
                <Link href={`#${id}`} underline='none'>
                    <Typography sx={{fontSize:'2vh', } }>Leia Mais</Typography>
                </Link>
            </Box>
        </Box>
    )
}
