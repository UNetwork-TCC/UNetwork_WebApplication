import { Box, Skeleton } from '@mui/material'
import { type ReactElement } from 'react'

export default function ContactSkeleton() : ReactElement {
    return (
        <Box 
            sx={{
                p: '3% 3%',
                mb: '1%',
                ml: '5%',
                display: 'flex',
                alignItems: 'center',
                width: '90%',
                transition: 'ease .3s',
                fontSize: '10px'
            }}>
            <Skeleton variant='rounded' sx={{ borderRadius: 5, height: '3rem', width: '3.75rem' }} />
            <Box width='100%' sx={{ display: 'flex', flexDirection: 'column', ml: '1.2em', width: '100%', maxWidth: '90%' }}>
                <Box width='90%' display='flex' justifyContent='space-between'>
                    <Box sx={{ width: '70%' }}>
                        <Skeleton variant="text" />
                    </Box>
                    <Box sx={{ width: '10%', textAlign: 'end' }}>
                        <Skeleton variant="text" sx={{ color: 'gray' }} />
                    </Box>
                </Box>
                <Box display={'flex'} >
                    <Box sx={{ width: '50%', maxWidth: '90%' }}>
                        <Skeleton variant="text"/>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
