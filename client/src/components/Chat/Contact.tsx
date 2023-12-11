import { UserAvatar } from '$components'
import { setChatId } from '$features/chat'
import { useAppDispatch, useAppSelector } from '$store'
import { type Chat, type User } from '$types'
import { Avatar, Box, Typography, useTheme } from '@mui/material'
import { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Contact({ 
    user,
    date,
    chat,
    notification 
} : {
    user: Partial<User>,
    date?: Date | string,
    notification?: number,
    chat: Chat
}) : ReactElement {
    
    const theme = useTheme()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const loggedUser = useAppSelector(state => state.auth.user)

    return (
        <Box 
            sx={{
                ':hover': { 
                    bgcolor: `${theme.palette.action.focus}`,
                    cursor: 'pointer'
                },
                p: '3% 3%',
                mb: '1%',
                ml: '5%',
                display: 'flex',
                alignItems: 'center',
                width: '90%',
                transition: 'ease .3s',
                fontSize: '10px'
            }}
            onClick={() => { 
                dispatch(setChatId(chat._id))
                navigate(`/app/chat/${chat._id}`) 
            }}
        >
            <Avatar variant='rounded' sx={{ borderRadius: 5, height: '3rem', width: '3rem' }}>
                {user?.otherInfo?.avatar?.src ?
                    <UserAvatar 
                        user={user}
                        onClick={() => {}}
                    />
                    :
                    user?.username?.charAt(0).toUpperCase()
                }
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '1.2em', width: '100%', maxWidth: '90%' }}>
                <Box display={'flex'}>
                    <Box sx={{ width: '85%' }}>
                        <Typography noWrap >{user.username}</Typography>

                    </Box>
                    <Box sx={{ width: '15%', textAlign: 'end' }}>
                        <Typography sx={{ color: 'gray', fontSize: '0.8rem' }}>{date?.toString()}</Typography>
                    </Box>
                </Box>
                <Box display={'flex'} >
                    <Box sx={{ width: '90%', maxWidth: '90%' }}>
                        <Typography variant='caption' noWrap>
                            {
                                chat?.messages?.length > 0 ?
                                    chat?.messages?.[chat.messages.length - 1]?.sendedBy === loggedUser._id ?
                                        'Você: ' + chat?.messages?.[chat.messages.length - 1].content
                                        : user.username + ': ' + chat?.messages?.[chat.messages.length - 1]?.content
                                    : 'Nenhuma mensagem enviada'
                            }
                        </Typography>
                    </Box>
                    <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
                        {notification &&
                            <Avatar sx={{ height: '1.60rem', width: '1.60rem', bgcolor: 'primary.dark' }}>
                                < Typography sx={{ fontSize: '0.8rem' }}>+{notification}</Typography>
                            </Avatar>
                        }
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
