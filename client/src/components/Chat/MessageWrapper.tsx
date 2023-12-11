/* eslint-disable react-hooks/exhaustive-deps */
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { type ReactElement, useEffect } from 'react'
import Message from './Message'
import { setMessages, useGetChatMutation } from '$features/chat'
import { useAppDispatch, useAppSelector } from '$store'
import { MessageSkeleton } from '$skeletons'

export default function MessageWrapper({ id }: { id: string }): ReactElement {
    const theme = useTheme()

    const [ getChat, { isLoading } ] = useGetChatMutation()
    
    const dispatch = useAppDispatch()

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const userId = useAppSelector(state => state.auth.user._id)
    const messages = useAppSelector(state => state.chat.messages)

    useEffect(() => {
        (async () => {
            const { data }: any = await getChat(id)

            dispatch(setMessages(data?.messages ?? []))
        })()
    }, [ getChat, id ])

    return (
        <Box
            sx={{
                p: 4,
                gap: 1,
                width: '100%',
                height: '85%',
                position: 'sticky',
                display: 'flex',
                overflow: 'scroll',
                overflowX: 'hidden',
                alignItems: 'start',
                flexDirection: 'column',
                
                [theme.breakpoints.down('lg')]: {
                    height: '80%'
                },

                [theme.breakpoints.down('md')]: {
                    height: '80%'
                }
            }}
        >
            {!isLoading ? (
                messages.map(message => (
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