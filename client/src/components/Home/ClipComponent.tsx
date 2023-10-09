import { Box } from '@mui/material'
import { type ReactElement } from 'react'
import React from 'react'

export default function ClipComponent(): ReactElement {

    return (
        <Box 
            display='flex' 
            m={2} 
            mb={7.5}
            sx={{
                height: '800px',
                width: '400px',
                bgcolor: 'background.paper'
            }}
        >
            
        </Box>
    )
}