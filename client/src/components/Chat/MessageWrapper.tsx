import { Box, useTheme } from '@mui/material'
import { type ReactElement, useEffect } from 'react'
import Message from './Message'
import { useGetChatMutation } from '$features/chat'
import { useAppSelector } from '$store'
import { MessageSkeleton } from '$skeletons'

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
                p: 4,
                width: '100%',
                height: '85%',
                display: 'flex',
                overflow: 'scroll',
                overflowX: 'hidden',
                gap: 1,
                alignItems: 'start',
                flexDirection: 'column',
                [theme.breakpoints.only('lg')]: {
                    height:'88%'
                },

                [theme.breakpoints.only('md')]: {
                    height:'88%'                    
                }
                // '::-webkit-scrollbar': { display: 'none' } /*Se NÂO quiser barra de rolamento, descomenta isso*/
                                
            }}
        >
            {!isLoading ? (
                data?.messages.map(message => (
                    <Message 
                        key={message._id}
                        messageInfo={message}
                        text={message.content}
                        sendedAt={message.sendedAt}
                        messageFrom={message.sendedBy !== userId ? 'him' : 'me'}
                    />
                ))
            ) : (
                <>
                    <MessageSkeleton messageFrom='me'/>
                    <MessageSkeleton messageFrom='him'/>
                    <MessageSkeleton messageFrom='me'/>
                    <MessageSkeleton messageFrom='him'/>
                    <MessageSkeleton messageFrom='me'/>
                    <MessageSkeleton messageFrom='him'/>
                    <MessageSkeleton messageFrom='me'/>
                </>
            )}
        </Box>
    )
}