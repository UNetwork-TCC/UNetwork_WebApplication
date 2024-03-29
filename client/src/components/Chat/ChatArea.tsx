import { Box } from '@mui/material'
import { type ReactElement, type ReactNode } from 'react'

export default function ChatArea({ children } : { children: ReactNode }): ReactElement {
    return (
        <Box 
            sx={{ pt:'3%', overflow: 'hidden', '::-webkit-scrollbar': { display: 'none' } }}
            // position='sticky' 
            display='flex' 
            alignItems='start' 
            height='100%' 
            maxHeight='100%' 
            width='100%' 
        >
            <Box width='100%' height={'100%'}>
                {children}
            </Box>
        </Box>
    )
}
