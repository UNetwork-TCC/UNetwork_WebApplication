import { Avatar, Box, Divider, IconButton, MenuItem, Typography, useTheme } from '@mui/material'
import { ChatBar, ChatArea, ContactsArea, MessageWrapper } from '$components'
import { AppLayout, CustomMenu } from '$layout'
import { Search, VideocamOutlined, LocalPhone, Settings, AccountBox, FmdGood, Block, Delete, Report } from '@mui/icons-material'
import { type ReactElement, useState, useEffect } from 'react'
import { useFindUserChatsMutation } from '$features/chat'
import { useAppSelector } from '$store'
import { type Chat } from '$types'
import { ContactsAreaSkeleton } from '$skeletons'

export default function ChatPage(): ReactElement {
    const theme = useTheme()

    const [ findUserChats, { data: chats, isLoading } ] = useFindUserChatsMutation()
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
                <ChatArea>
                    <Box sx={{ width: '100%', height: '9%', display: 'flex', alignItems: 'center', p: '0 3%', pb: '4%' }}>
                        <Avatar variant='rounded' sx={{ borderRadius: 5, height: '3.5rem', width: '3.5rem', 
                            [theme.breakpoints.only('lg')]: {
                                height:'3rem',
                                width:'3rem',
                                borderRadius:3
                            },
                            [theme.breakpoints.only('md')]: {
                                height:'2.8rem',
                                width:'2.8rem',
                                borderRadius:2.5
                            }

                        }} />
                        <Box sx={{ width: '75%', maxWidth: '75%' }}>
                            <Typography noWrap sx={{ fontSize: '1.5rem', ml: '2%',
                                [theme.breakpoints.only('lg')]: {
                                    fontSize:'1.4rem'                                    
                                },
                                [theme.breakpoints.only('md')]: {
                                    fontSize:'1.3rem'
                                }
                            }}>Username</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '25%',
                            [theme.breakpoints.only('lg')]: {
                                gap:2
                            },
                            [theme.breakpoints.only('md')]: {
                                gap:1.8
                            }
                    
                        }} gap={3}>
                            <IconButton sx={{}}>
                                <VideocamOutlined sx={{ fontSize: '2.25rem', color: 'gray',
                                    [theme.breakpoints.only('lg')]: {
                                        fontSize:'2rem'
                                    },
                                    [theme.breakpoints.only('md')]: {
                                        fontSize:'1.8rem'
                                    }

                                }} />
                            </IconButton>
                            <IconButton sx={{}}>
                                <LocalPhone sx={{ fontSize: '1.75rem', color: 'gray',
                                    [theme.breakpoints.only('lg')]: {
                                        fontSize:'1.5rem'
                                    },
                                    [theme.breakpoints.only('md')]: {
                                        fontSize:'1.3rem'
                                    }
                            
                                }} />
                            </IconButton>
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
                    <MessageWrapper />
                    {/* end */}
                    <Divider flexItem sx={{}} />
                    <ChatBar />
                    <CustomMenu
                        anchorEl={anchorEl}
                        open={openCustonMenu}
                        onClose={handleCloseCustonMenu}
                    >
                        {menuContent}
                    </CustomMenu>
                </ChatArea>
            </Box>
        </AppLayout>
    )
}
