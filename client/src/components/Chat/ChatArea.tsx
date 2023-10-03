import { Box } from '@mui/material'
import React from 'react'


export default function ChatArea({ children } : { children: React.ReactNode }) {
    return (
        <Box position='sticky' display='flex' alignItems='start' height='99%' maxHeight='99%' width='70%' sx={{ pt:'3%', overflow:'scroll', '::-webkit-scrollbar': { display: 'none' }, }} >
            <Box width='100%' height={'100%'}>
                {children}
            </Box>
        </Box>
    )
}
