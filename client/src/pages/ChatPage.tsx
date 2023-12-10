import { Avatar, Box, Divider, IconButton, MenuItem, Typography, useTheme } from '@mui/material'
import { ChatBar, ChatArea, ContactsArea, MessageWrapper } from '$components'
import { AppLayout, CustomMenu } from '$layout'
import { Search, VideocamOutlined, LocalPhone, Settings, AccountBox, FmdGood, Block, Delete, Report } from '@mui/icons-material'
import { type ReactElement, useState, useContext } from 'react'
import { themeContext } from '$contexts'

export default function ChatPage(): ReactElement {
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

    const theme = useTheme()

    return (
        <AppLayout>
            <Box sx={{ width: '100%', height: '100%', display: 'flex' }} >
                <ContactsArea />
                <Divider orientation='vertical' role='presentation' flexItem sx={{ height: '100%' }} />
                <ChatArea>
                    <Box sx={{ width: '100%', height: '9%', display: 'flex', alignItems: 'center', p: '0 3%', pb: '4%' }}>
                        <Avatar variant='rounded' sx={{ borderRadius: 5, height: '3.5rem', width: '3.5rem', 
                            [theme.breakpoints.down('xl')]: {
                                height:'3rem',
                                width:'3rem',
                                borderRadius:3
                            },
                            [theme.breakpoints.down('lg')]: {
                                height:'2.8rem',
                                width:'2.8rem',
                                borderRadius:2.5
                            }

                        }} />
                    </Box>
                    <Box sx={{ width: '100%', height: '9%', display: 'flex', alignItems: 'center', p: '0 3%', pb: '4%' }}>
                        <Avatar variant='rounded' sx={{ borderRadius: 5, height: '3.5rem', width: '3.5rem', 
                            [theme.breakpoints.down('xl')]: {
                                height:'3rem',
                                width:'3rem',
                                borderRadius:3
                            },
                            [theme.breakpoints.down('lg')]: {
                                height:'2.8rem',
                                width:'2.8rem',
                                borderRadius:2.5
                            }

                        }} />
                        <Box sx={{ width: '75%', maxWidth: '75%' }}>
                            <Typography noWrap sx={{ fontSize: '1.5rem', ml: '2%',
                                [theme.breakpoints.down('xl')]: {
                                    fontSize:'1.4rem'                                    
                                },
                                [theme.breakpoints.down('lg')]: {
                                    fontSize:'1.3rem'
                                }
                            }}>Username</Typography>
                            <Typography noWrap sx={{ fontSize: '1.5rem', ml: '2%',
                                [theme.breakpoints.down('xl')]: {
                                    fontSize:'1.4rem'                                    
                                },
                                [theme.breakpoints.down('lg')]: {
                                    fontSize:'1.3rem'
                                }
                            }}>Username</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '25%',
                            [theme.breakpoints.down('xl')]: {
                                gap:2
                            },
                            [theme.breakpoints.down('lg')]: {
                                gap:1.8
                            }
                    
                        }} gap={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '25%',
                                [theme.breakpoints.down('xl')]: {
                                    gap:2
                                },
                                [theme.breakpoints.down('lg')]: {
                                    gap:1.8
                                }
                    
                            }} gap={3}>
                                <IconButton sx={{}}>
                                    <VideocamOutlined sx={{ fontSize: '2.25rem', color: 'gray',
                                        [theme.breakpoints.down('xl')]: {
                                            fontSize:'2rem'
                                        },
                                        [theme.breakpoints.down('lg')]: {
                                            fontSize:'1.8rem'
                                        }

                                    }} />
                                    <VideocamOutlined sx={{ fontSize: '2.25rem', color: 'gray',
                                        [theme.breakpoints.down('xl')]: {
                                            fontSize:'2rem'
                                        },
                                        [theme.breakpoints.down('lg')]: {
                                            fontSize:'1.8rem'
                                        }

                                    }} />
                                </IconButton>
                                <IconButton sx={{}}>
                                    <LocalPhone sx={{ fontSize: '1.75rem', color: 'gray',
                                        [theme.breakpoints.down('xl')]: {
                                            fontSize:'1.5rem'
                                        },
                                        [theme.breakpoints.down('lg')]: {
                                            fontSize:'1.3rem'
                                        }
                            
                                    }} />
                                    <LocalPhone sx={{ fontSize: '1.75rem', color: 'gray',
                                        [theme.breakpoints.down('xl')]: {
                                            fontSize:'1.5rem'
                                        },
                                        [theme.breakpoints.down('lg')]: {
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
                                        [theme.breakpoints.down('xl')]: {
                                            fontSize:'1.8rem'
                                        },
                                        [theme.breakpoints.down('lg')]: {
                                            fontSize:'1.6rem'
                                        }

                                    }} />
                                    <Settings sx={{ fontSize: '2rem', color: 'gray',
                                        [theme.breakpoints.down('xl')]: {
                                            fontSize:'1.8rem'
                                        },
                                        [theme.breakpoints.down('lg')]: {
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
                    </Box>
                </ChatArea>
            </Box>
        </AppLayout>
    )
}
