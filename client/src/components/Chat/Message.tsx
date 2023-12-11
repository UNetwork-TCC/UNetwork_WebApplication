import { UserAvatar } from '$components'
import { themeContext } from '$contexts'
import { useGetUserMutation } from '$features/user'
import { type Message as MessageInterface, type User } from '$types'
import { Avatar, useTheme } from '@mui/material'
import { Box, type SxProps, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useContext, type ReactElement, useEffect } from 'react'

export default function Message({ 
    text,
    messageFrom = 'me',
    sendedAt = '00:00',
    messageInfo
} : {
    text: string,
    messageFrom?: 'me' | 'him',
    sendedAt?: string | 'Agora há pouco',
    messageInfo: MessageInterface
}) : ReactElement {
    const [ getUser, { data: user, isLoading } ] = useGetUserMutation()

    const obj = {}

    const theme = useTheme()

    let messageStyle: SxProps = {
        boxShadow: theme.shadows[2],
        borderRadius: 2,
        p: 2       
    }

    if (messageFrom === 'me')
        messageStyle = {
            ...messageStyle,
            bgcolor: theme.palette.primary.dark,
            color: 'white'
        }
    else
        messageStyle = {
            ...messageStyle,
            bgcolor: theme.palette.mode === 'dark' ?
                '#444047' 
                :
                theme.palette.background.paper
        }

    useEffect(() => {
        (async () => {
            if (messageInfo.sendedBy)
                await getUser(messageInfo.sendedBy)
        })()
    }, [ getUser, messageInfo.sendedBy ])
    
    return (
        <Box width='100%'>
            <Box display='flex' justifyContent={messageFrom === 'him' ? 'start' : 'end'} width='100%'>
                <Box display='flex' flexDirection='column' justifyContent='end' maxWidth='60%' sx={messageStyle}>
                    <Typography fontSize={'1em'}>
                        {text}
                    </Typography>
                    <Box display='flex' justifyContent={messageFrom === 'him' ? 'start' : 'end'}>
                        <Typography fontSize='0.7rem' variant='caption'>
                            {sendedAt}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                display='flex'
                width='100%'
                position='relative'
                left={messageFrom === 'me' ? '99%' : ''}
            >
                <UserAvatar
                    user={user ?? (obj as User)}
                    sx={{
                        position: 'relative',
                        height: 25,
                        width: 25,
                        bottom: 15,
                        right: 5,
                        [theme.breakpoints.only('lg')]: {
                            height: 20,
                            width: 20
                        },
                        [theme.breakpoints.only('md')]: {
                            height: 17.5,
                            width: 17.5
                        }
                    }}
                />
            </Box>
        </Box>
    )
}