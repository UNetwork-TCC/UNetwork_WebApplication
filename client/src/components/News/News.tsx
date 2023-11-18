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
    img?: string
}) : ReactElement {
    return (
        <Link sx={{ color: 'black', ':hover': { cursor: 'pointer' } }} >
            <Paper elevation={8} sx={{ width: '50rem', borderRadius: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, width: '100%', fontSize: '10px', p: 2, borderRadius: 20 }}>
                    <img style={{ background: 'gray', width: '45rem', height: '15rem', borderRadius: 4 }} src={img} /> 
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <Box>
                            <Typography sx={{ color: 'gray', mb: '.25rem' }}>{topic}</Typography>
                            <Typography variant="h6" sx={{ mb: '.5rem' }}>{title}</Typography>
                            <Typography variant='caption' sx={{ wordWrap: 'break-word' }}>{description}</Typography>
                        </Box>
                        <Box>
                            <Typography variant='caption'>{date?.toString()}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Link>
    )
}
