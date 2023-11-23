import { Box } from '@mui/material'
import { type ReactElement } from 'react'
import Message from './Message'

export default function MessageWrapper(): ReactElement {
    return (
        <Box
            sx={{
                p: 2.5,
                width: '100%',
                height: '80%',
                display: 'flex',
                overflow: 'scroll',
                overflowX: 'hidden',
                gap: 1,
                alignItems: 'start',
                flexDirection: 'column' 
            }}
        >
            <Message 
                text='Eae mano, tranquilo?' 
                messageFrom='him'
            />
            <Message 
                text='To suave man, e vc?'
                messageFrom='me'
            />
            <Message 
                text='tranquilo?'
                messageFrom='me'
            />
            <Message 
                text='tranquilo'
                messageFrom='him'
            />
            <Message 
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac feugiat dolor, vitae eleifend metus. Curabitur at orci ante. Maecenas.'
                messageFrom='him'
            />
            <Message 
                text='ah tá... Não entedi merda nenhuma mas beleza 👍'
                messageFrom='me'
            />
        </Box>
    )
}