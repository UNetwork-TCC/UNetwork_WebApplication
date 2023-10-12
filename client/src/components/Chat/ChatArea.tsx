import { Box } from '@mui/material'
import { type ReactElement, type ReactNode } from 'react'

export default function ChatArea({ children } : { children: ReactNode }): ReactElement {
    return (
        <Box 
            sx={{ pt:'3%', overflow:'scroll', '::-webkit-scrollbar': { display: 'none' } }}
            position='sticky' 
            display='flex' 
            alignItems='start' 
            height='99%' 
            maxHeight='99%' 
            width='70%' 
        >
            <Box width='100%' height={'100%'}>
                {children}
            </Box>
        </Box>
    )
}