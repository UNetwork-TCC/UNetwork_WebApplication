import { Box, Skeleton } from '@mui/material'
import { type ReactElement } from 'react'

export default function ProfileHeaderSkeleton(): ReactElement {
    return (
        <Box p={3} width='100%' display='flex' gap={8}>
            <Skeleton
                variant='rectangular'
                sx={{
                    height: '10rem',
                    width: '13rem',
                    borderRadius: '50%'
                }}
            />
            <Box width='100%' display='flex' flexDirection='column' gap={2.5}>
                <Box display='flex' gap={4}>
                    <Skeleton sx={{ position: 'relative', top: '7.5px', width: '50%' }} variant='text' />
                </Box>
                <Box display='flex' gap={4}>
                    <Skeleton sx={{ width: '10%' }} variant='text' />
                    <Skeleton sx={{ width: '10%' }} variant='text' />
                    <Skeleton sx={{ width: '10%' }} variant='text' />
                </Box>
                < Box>
                    <Skeleton sx={{ width: '60%' }} variant='text' />
                    <Skeleton sx={{ width: '60%' }} variant='text' />
                </Box>
            </Box>
        </Box>
    )
}