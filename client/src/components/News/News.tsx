import { Box, Link, Paper, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function News({
    title,
    description,
    topic,
    data 
} : {
    title: string,
    description: string,
    topic?: string,
    data?: string
}) : ReactElement {
    return (
        <Link sx={{ color: 'black', ':hover': { cursor: 'pointer' } }} >
            <Paper elevation={8} sx={{ width:'72em', height:'22em', m: '0 0 2% 0', p:'1em 0 0 1em', borderRadius:'20px' }}>
                <Box sx={{  width: '70em', height: '20em', fontSize: '10px', borderRadius: '2em 2em 0 0', display: 'flex', position: 'relative' }}>
                    <img style={{ background: 'gray', width: '50%', height: '100%', borderRadius: '2em' }} src=""></img> 
                    {/* ao colocar uma imagem fica menos pior */}
                    <Box sx={{ ml: '1em', mt: '.5em', width: '50%', height: '95%', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ color: 'gray', mb: '2%' }}>{topic}</Typography>
                        <Typography sx={{ mb: '3%' }} variant="h6">{title}</Typography>
                        <Typography sx={{ wordWrap: 'break-word' }}>{description}</Typography>
                        <Typography sx={{ color: 'gray', position: 'absolute', bottom: '0' }}>{data}</Typography>
                    </Box>
                </Box>
            </Paper>
        </Link>
    )
}
