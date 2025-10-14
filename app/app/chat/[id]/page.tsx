'use client';

import { Box, Divider, IconButton, MenuItem, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ChatBar, ChatArea, ContactsArea, MessageWrapper, UserAvatar } from '@/components'
import { CustomMenu } from '@/layout'
import { Search, Settings, AccountBox, FmdGood, Block, Delete, Report, ArrowBack } from '@mui/icons-material'
import { type ReactElement, useState, useEffect } from 'react'
import { setChatId, setMessages, useFindUserChatsMutation, useGetChatMutation } from '@/features/chat'
import { useAppDispatch, useAppSelector } from '@/store'
import { IUser, type IChat } from '@/types'
import { ContactsAreaSkeleton } from '@/layout/skeletons'
import { useGetUserMutation } from '@/features/user'

import { useRouter } from 'next/navigation'

export default function ChatPage({ params: { id } }: { params: { id: string } }): ReactElement {
    const theme = useTheme()
    const chatId = useAppSelector(state => state.chat.id)
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const router = useRouter()
    const dispatch = useAppDispatch()
    const loggedUser = useAppSelector(state => state.auth.user)

    const [ findUserChats, { data: chats, isLoading } ] = useFindUserChatsMutation()
    const [ getChat ] = useGetChatMutation()
    const [ getUser, { isLoading: isLoadingUser } ] = useGetUserMutation()

    const [ chatUser, setChatUser ] = useState<IUser | null>()

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

            const chatUserId = data.users?.filter((idUser: any) => idUser !== userId)[0]

            const { data: user }: any = await getUser(chatUserId)
            setChatUser(user)
        })()
    }, [ id ]) 

    useEffect(() => {
        if (chatId) {
            router.push('/app/chat/' + chatId)
        }
    }, [ chatId, router.push ])

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }} >
            {!matches ? (
                <>
                    {isLoading ? (
                        <ContactsAreaSkeleton />
                    ) : (
                        <ContactsArea
                            userId={userId ?? ''}
                            chats={chats ?? ([] as IChat[])} 
                            sx={matches ? {
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            } : {}}
                        />
                    )}
                    <Divider orientation='vertical' role='presentation' flexItem sx={{ height: '100%' }} />
                    {id ? (
                        <ChatArea>
                            <Box 
                                sx={{
                                    width: '100%',
                                    height: '5%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: '0 3%',
                                    pb: '4%'
                                }}
                            >
                                <UserAvatar 
                                    user={chatUser === loggedUser ? loggedUser : chatUser ?? {}}
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
                                            borderRadius: 2.5
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
                    ) : !matches && (
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
                                    src='/assets/svg/Chat/chatbg.svg'
                                    style={{ 
                                        height: '70%', 
                                        width: '70%'
                                    }}
                                />
                                <Typography variant='h4'>Selecione uma conversa!</Typography>
                            </Box>
                        </Box>
                    )}
                </>
            ) : (
                <>
                    {isLoading && !id ? (
                        <ContactsAreaSkeleton />
                    ) : (
                        <>
                            {!id ? (
                                <ContactsArea
                                    userId={userId ?? ''}
                                    chats={chats ?? ([] as IChat[])} 
                                    sx={matches ? {
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    } : {}}
                                />
                            ) : (
                                <ChatArea>
                                    <Box 
                                        sx={{ 
                                            position: 'sticky',
                                            width: '100%',
                                            height: '10%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            p: '2% 5%',
                                            pb: '4%' 
                                        }}
                                    >
                                        <UserAvatar 
                                            user={chatUser ?? {}}
                                            isLoading={isLoadingUser}
                                            variant='rounded' 
                                            sx={{ borderRadius: 5, height: '3.5rem', width: '3.5rem' }} 
                                        />
                                        <Box sx={{ width: '100%' }}>
                                            <Typography noWrap sx={{ fontSize: '1.5rem', ml: '3%' }}>{
                                                isLoadingUser ? (
                                                    <Skeleton variant='text' width='50%' />
                                                ) : (
                                                    chatUser?.name
                                                )
                                            }
                                            </Typography>
                                        </Box>
                                        <Box 
                                            gap={1}
                                            sx={{ 
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '5%',
                                                position: 'relative',
                                                right: 20
                                            }} 
                                        >
                                            <IconButton
                                                sx={{
                                                    position: 'relative',
                                                    right: 20
                                                }}
                                                onClick={() => {
                                                    dispatch(setMessages([]))
                                                    dispatch(setChatId(''))
                                                    router.push('/app/chat') 
                                                }}
                                            >
                                                <ArrowBack sx={{ fontSize: '2rem', color: 'gray' }} />
                                            </IconButton>
                                            <IconButton
                                                sx={{
                                                    position: 'relative',
                                                    right: 15
                                                }}
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
                                                <Settings sx={{ fontSize: '2rem', color: 'gray' }} />
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
                            )}
                        </>
                    )}
                </>
            )}
        </Box>
    )
}
