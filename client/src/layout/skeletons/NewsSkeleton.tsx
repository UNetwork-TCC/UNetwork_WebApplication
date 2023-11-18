import { Box, Link, Paper, Skeleton } from '@mui/material'
import { type ReactElement } from 'react'

export default function NewsSkeleton() : ReactElement {
    return (
        <Link sx={{ color: 'black', ':hover': { cursor: 'pointer' } }} >
            <Paper elevation={8} sx={{ width: '50rem', borderRadius: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, width: '100%', fontSize: '10px', p: 2, borderRadius: 20 }}>
                    <Skeleton variant='rounded' sx={{ width: '45rem', height: '15rem' }} />
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <Box>
                            <Skeleton variant='text' sx={{ mb: 2.5, width: '16rem' }} />
                            <Skeleton variant='text' />
                            <Skeleton variant='text' />
                            <Skeleton variant='text' />
                            <Skeleton variant='text' />
                            <Skeleton variant='text' />
                            <Skeleton variant='text' />
                            <Skeleton variant='text' />
                            <Skeleton variant='text' width='50%' />
                        </Box>
                        <Box>
                            <Skeleton variant='text' width='50%' />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Link>
    )
}
