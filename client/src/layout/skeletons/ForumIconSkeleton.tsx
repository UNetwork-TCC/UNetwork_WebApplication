import { Box, Skeleton } from '@mui/material'
import { type ReactElement } from 'react'

export default function ForumIconSkeleton(): ReactElement {
    return (
        <Box width='80%' m={1} display='flex'>
            <Skeleton 
                variant='rectangular'
                sx={{ borderRadius: 2 }}
                height={50}
                width={50}
            />
            <Box width='25%' ml={1} display='flex' justifyContent='center' flexDirection='column'>
                <Skeleton variant='text' />
                <Box width='100%' gap={1} display='flex'>
                    <Skeleton
                        sx={{ width: '100%' }} 
                        variant='text' />
                    <Skeleton
                        sx={{ width: '100%' }} 
                        variant='text' />
                </Box>
            </Box>
        </Box>
    )
}