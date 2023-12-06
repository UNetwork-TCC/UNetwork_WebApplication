import { Box } from '@mui/material'
import { type ReactElement } from 'react'
import Message from './Message'

export default function MessageWrapper(): ReactElement {
    return (
        <Box
            sx={{
                p: 2.5,
                width: '100%',
                height: '78%',
                display: 'flex',
                overflow: 'scroll',
                overflowX: 'hidden',
                gap: 1,
                alignItems: 'start',
                flexDirection: 'column'
                // '::-webkit-scrollbar': { display: 'none' } /*Se não quiser barra de rolamento, descomenta isso*/
                                
            }}
        >
            <Message 
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac feugiat dolor, vitae eleifend metus. Curabitur at orci ante. Maecenas.'
                messageFrom='him'
            />
            <Message 
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac feugiat dolor, vitae eleifend metus. Curabitur at orci ante. Maecenas.'
                messageFrom='me'
            />
            <Message 
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac feugiat dolor, vitae eleifend metus. Curabitur at orci ante. Maecenas.'
                messageFrom='him'
            />
        </Box>
    )
}