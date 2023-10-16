import { Box, Link, Paper, Skeleton, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function News() : ReactElement {
    return (
        <Link sx={{ color: 'black', ':hover': { cursor: 'pointer' } }} >
            <Paper elevation={8} sx={{ width:'72em', height:'22em', m: '0 0 2% 0', p:'1em 0 0 1em', borderRadius:'20px' }}>
                <Box sx={{  width: '70em', height: '20em', fontSize: '10px', borderRadius: '2em 2em 0 0', display: 'flex', position: 'relative' }}>
                    <img style={{ background: 'gray', width: '50%', height: '100%', borderRadius: '2em' }} src="" />
                    <Box sx={{ ml: '1em', mt: '.5em', width: '50%', height: '95%', display: 'flex', flexDirection: 'column' }}>
                        <Skeleton variant='text' sx={{ mb: '2%' }} />
                        <Skeleton variant='text' sx={{ mb: '3%' }} />
                        <Skeleton variant='text' />
                        <Skeleton variant='text' sx={{ position: 'absolute', bottom: 0 }} />
                    </Box>
                </Box>
            </Paper>
        </Link>
    )
}

