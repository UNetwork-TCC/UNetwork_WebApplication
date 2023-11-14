import { Box, Link, Paper, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function News({
    title,
    description,
    topic,
    date,
    img
} : {
    title: string,
    description: string,
    topic?: string,
    date?: Date | string,
    img: string
}) : ReactElement {
    return (
        <Link sx={{ color: 'black', ':hover': { cursor: 'pointer' } }} >
            <Paper elevation={8} sx={{ width:'50rem', borderRadius:'20px' }}>
                <Box sx={{  width: '70em', fontSize: '10px', p: 2, borderRadius: 20, display: 'flex', position: 'relative' }}>
                    <img style={{ background: 'gray', width: '60rem', height: '20em', borderRadius: 10 }} src={img} /> 
                    <Box sx={{ ml: '1em', mt: '.5em', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ color: 'gray', mb: '2%' }}>{topic}</Typography>
                        <Typography sx={{ mb: '3%' }} variant="h6">{title}</Typography>
                        <Typography sx={{ wordWrap: 'break-word' }}>{description}</Typography>
                        <Box mt={2}>
                            <Typography sx={{ color: 'gray', position: 'absolute', bottom: '0' }}>{date?.toString()}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Link>
    )
}
