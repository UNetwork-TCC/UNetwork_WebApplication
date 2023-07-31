import { Image } from '@mui/icons-material'
import { Box, Button, Link, Typography } from '@mui/material'

export default function BigNotice({ description, id, Title }) {
    return (
        <Box sx={{ m: '0 2.5vw 1vw 10%', width: '22.5vw', height: '45vh', pr:'.6vh' }}>
            <Box sx={{ bgcolor: 'gray', width: '100%', height: '25vh', borderRadius: '2.1vh', boxShadow:'.6vh .6vh rgba(0,0,0,0.2)', }}><Image/></Box>
            <Box sx={{ ml: '.8vh', mt: '.6vh' }}>
                <Typography sx={{ fontSize: '16px', mt: '1.5em', color: 'gray', mb: '2%' }}>{Title}</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>{description}</Typography>
                <Link href={`#${id}`}>
                    <Button sx={{ fontSize: '14px', float: 'right', border: '1px solid #673AB7', borderRadius: '3.1vh', padding: '.3vh 10%', margin: '3% 3%',':hover':{ bgcolor:'#673AB7', color:'white' } }}>Leia Mais</Button>
                </Link>

            </Box>
        </Box>
    )
}
