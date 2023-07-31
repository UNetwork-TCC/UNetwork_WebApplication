import { Box, Link, Typography } from '@mui/material'

export default function LittleNotice({ cor, description, id, title}) {
    return (
        <Box sx={{ display: 'flex', mb: '4vh', width: '100%'}}>
            <Box sx={{ bgcolor: `#${cor}`, width: '13vh', height: '13vh', borderRadius: '1.1vh', ml: '2%' }} />
            <Box sx={{ ml: '1vw', display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
                <Typography sx={{ color: 'black', opacity: '54%', mb: '.5vw', fontSize: '18px' }}>{title}</Typography>
                <Typography sx={{ color: 'black', width: '25vw', fontSize: '18px',}}>{description}</Typography>
                <Link href={`#${id}`} underline='none'>
                    <Typography sx={{fontSize:'20px', } }>Leia Mais</Typography>
                </Link>
            </Box>
        </Box>
    )
}
