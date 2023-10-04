import { Box } from '@mui/material'
import React, { type ReactElement } from 'react'

export default function ContactsArea({ children } : { children: React.ReactNode }): ReactElement {
    return (
        <Box position='sticky' display='flex' alignItems='start' height='96%' maxHeight='99%' width='30%' sx={{ pt: '2%', 
        // overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' }, overflowX:'hidden', 
            boxSizing:'border-box' } }  >
            <Box sx={{ width:'100%', height:'100%' }} >
                {children}
            </Box>
        </Box>
    )
}
