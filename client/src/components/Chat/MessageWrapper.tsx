import { Box, useTheme } from '@mui/material'
import { type ReactElement, useEffect } from 'react'
import Message from './Message'
import { useGetChatMutation } from '$features/chat'
import { useAppSelector } from '$store'

export default function MessageWrapper({ id }: { id: string }): ReactElement {
    const theme = useTheme()

    const [ getChat, { data, isLoading } ] = useGetChatMutation()

    const userId = useAppSelector(state => state.auth.user._id)

    useEffect(() => {
        (async () => {
            await getChat(id)
        })()
    }, [ getChat, id ])

    return (
        <Box
            sx={{
                p: 2.5,
                width: '100%',
                height: '70%',
                display: 'flex',
                overflow: 'scroll',
                overflowX: 'hidden',
                gap: 1,
                alignItems: 'start',
                flexDirection: 'column',
                [theme.breakpoints.only('lg')]: {
                    fontSize:'1rem',
                    height:'70%'
                },

                [theme.breakpoints.only('md')]: {
                    fontSize:'0.8rem',
                    height:'66%'                    
                    
                }
                // '::-webkit-scrollbar': { display: 'none' } /*Se NÂO quiser barra de rolamento, descomenta isso*/
                                
            }}
        >
            {!id ? (
                <Box>

                </Box>
            ) : (
                !isLoading ? (
                    data?.messages.map(message => (
                        <Message 
                            key={message._id}
                            text={message.content}
                            messageFrom={message.sendedBy !== userId ? 'him' : 'me'}
                        />
                    ))
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        Carregando...
                    </Box>
                )
            )}
        </Box>
    )
}