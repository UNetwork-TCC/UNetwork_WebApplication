/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, IconButton, MenuItem, Skeleton, Typography, useTheme } from '@mui/material'
import { ChatBar, ChatArea, ContactsArea, MessageWrapper, UserAvatar } from '$components'
import { AppLayout, CustomMenu } from '$layout'
import { Search, Settings, AccountBox, FmdGood, Block, Delete, Report, Chat as ChatIcon } from '@mui/icons-material'
import { type ReactElement, useState, useEffect } from 'react'
import { useFindUserChatsMutation, useGetChatMutation } from '$features/chat'
import { useAppSelector } from '$store'
import { User, type Chat } from '$types'
import { ContactsAreaSkeleton } from '$skeletons'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserMutation } from '$features/user'

import chatbg from '$assets/svg/Chat/chatbg.svg'

export default function ChatPage(): ReactElement {
    const theme = useTheme()

    const { id } = useParams()

    const chatId = useAppSelector(state => state.chat.id)

    const navigate = useNavigate()

    const [ findUserChats, { data: chats, isLoading } ] = useFindUserChatsMutation()
    const [ getChat ] = useGetChatMutation()
    const [ getUser, { isLoading: isLoadingUser } ] = useGetUserMutation()

    const [ chatUser, setChatUser ] = useState<User | null>()

    const userId = useAppSelector(state => state.auth.user._id)

    const onClickEvents = {
        item1: () => {
            console.log('oi')
            handleClose()
        },

        item2: () => {
            console.log('tcchau')
            handleClose()
        },

        item4: () => {
            handleClose()
        }
    }

    const [ open, setOpen ] = useState(false)

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<React.ReactNode>(null)

    const openCustonMenu = Boolean(anchorEl)

    const handleClick = (
        e: any,
        elements: string[],
        onClickEventListeners = elements.map(() => handleClose),
        icons: React.ReactNode[] = []
    ): void => {
        const mapedElements = elements.map((el, i) =>
            <MenuItem onClick={onClickEventListeners[i]} key={i} disableRipple>{icons && icons[i]}{el}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    const handleCloseCustonMenu = (): void => {
        setAnchorEl(null)
    }

    useEffect(() => {
        (async () => {
            await findUserChats(userId ?? '')
        })()
    }, [ findUserChats, userId ])

    useEffect(() => {
        (async () => {
            const { data }: any = await getChat(id ?? '')
            
            const chatUserId = data.users.filter((user: any) => user._id !== userId)[0]

            const { data: user }: any = await getUser(chatUserId)
            setChatUser(user)
        })()
    }, [ id ]) 

    useEffect(() => {
        if (chatId) {
            navigate('/app/chat/' + chatId)
        }
    }, [ chatId, navigate ])

    return (
        <AppLayout>
            <Box sx={{ width: '100%', height: '100%', display: 'flex' }} >
                {isLoading ? (
                    <ContactsAreaSkeleton />
                ) : (
                    <ContactsArea 
                        userId={userId ?? ''}
                        chats={chats ?? ([] as Chat[])} 
                    />
                )}
                <Divider orientation='vertical' role='presentation' flexItem sx={{ height: '100%' }} />
                {id ? (
                    <ChatArea>
                        <Box sx={{ width: '100%', height: '5%', display: 'flex', alignItems: 'center', p: '0 3%', pb: '4%' }}>
                            <UserAvatar 
                                user={chatUser ?? {}}
                                isLoading={isLoadingUser}
                                variant='rounded' 
                                sx={{ borderRadius: 5, height: '3.5rem', width: '3.5rem', 
                                    [theme.breakpoints.only('lg')]: {
                                        height: '3rem',
                                        width: '3rem',
                                        borderRadius:3
                                    },
                                    [theme.breakpoints.only('md')]: {
                                        height:'2.8rem',
                                        width:'2.8rem',
                                        borderRadius:2.5
                                    }
                                }} 
                            />
                            <Box sx={{ width: '100%' }}>
                                <Typography noWrap sx={{ fontSize: '1.5rem', ml: '2%',
                                    [theme.breakpoints.only('lg')]: {
                                        fontSize:'1.4rem'                                    
                                    },
                                    [theme.breakpoints.only('md')]: {
                                        fontSize:'1.3rem'
                                    }
                                }}>{
                                        isLoadingUser ? (
                                            <Skeleton variant='text' width='50%' />
                                        ) : (
                                            chatUser?.name
                                        )
                                    }
                                </Typography>
                            </Box>
                            <Box 
                                sx={{ display: 'flex', alignItems: 'center', width: '5%',
                                    [theme.breakpoints.only('lg')]: {
                                        gap:2
                                    },
                                    [theme.breakpoints.only('md')]: {
                                        gap:1.8
                                    }
                            
                                }} 
                                gap={3}
                            >
                                {/* <IconButton sx={{}}>
                                    <LocalPhone sx={{ fontSize: '1.75rem', color: 'gray',
                                        [theme.breakpoints.only('lg')]: {
                                            fontSize:'1.5rem'
                                        },
                                        [theme.breakpoints.only('md')]: {
                                            fontSize:'1.3rem'
                                        }
                                
                                    }} />
                                </IconButton> */}
                                <IconButton sx={{}}
                                    onClick={
                                        e => {
                                            handleClick(e,
                                                [ 'Ver Contato', 'Pesquisar', 'Fixar', 'Limpar conversa', 'Denunciar', 'Bloquear' ],
                                                [ onClickEvents.item1, onClickEvents.item2, () => { }, onClickEvents.item4 ],
                                                [ 
                                                    <AccountBox key={null} />,
                                                    <Search key={null} />,
                                                    <FmdGood key={null} />,
                                                    <Delete key={null} />,
                                                    <Report key={null} />,
                                                    <Block key={null} />
                                                ]
                                            )
                                        }
                                    }
                                >
                                    <Settings sx={{ fontSize: '2rem', color: 'gray',
                                        [theme.breakpoints.only('lg')]: {
                                            fontSize:'1.8rem'
                                        },
                                        [theme.breakpoints.only('md')]: {
                                            fontSize:'1.6rem'
                                        }

                                    }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Divider flexItem />
                        {/* MessageWrapper */}
                        <MessageWrapper 
                            id={id}
                        />
                        {/* end */}
                        <Divider flexItem sx={{}} />
                        <ChatBar chatId={id} />
                        <CustomMenu
                            anchorEl={anchorEl}
                            open={openCustonMenu}
                            onClose={handleCloseCustonMenu}
                        >
                            {menuContent}
                        </CustomMenu>
                    </ChatArea>
                ) : (
                    <Box 
                        height='100%'
                        width='100%'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Box 
                            display='flex'
                            alignItems='center' 
                            justifyContent='center'
                            flexDirection='column'
                            gap={5}
                            sx={{
                                animation: 'anim 3s ease-in-out infinite alternate',
                                '@keyframes anim': {
                                    '0%': {
                                        transform: 'translateY(-5%)'
                                    },

                                    '100%': {
                                        transform: 'translateY(0)'
                                    }
                                }
                            }}
                        >
                            <img 
                                src={chatbg}
                                style={{ 
                                    height: '70%', 
                                    width: '70%'
                                }}
                            />
                            <Typography variant='h4'>Selecione uma conversa!</Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </AppLayout>
    )
}
