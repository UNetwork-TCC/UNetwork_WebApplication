import { Avatar, Box, Stack, type SxProps, Typography, useTheme } from '@mui/material'
import { useStyles } from '$styles'
import { Header, LoadingBackdrop } from '.'
import { Bookmark, ExpandLess, ExpandMore, Home, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Message } from '@mui/icons-material'
import React, { type CSSProperties, useState, type ReactElement } from 'react'
import { blue, green, purple, red, yellow } from '@mui/material/colors'
import bg from '$assets/img/bg.jpg'
import darkbg from '$assets/img/image.jpg'
import { Shortcut, ContactAppLayout } from '$components'
import { SideBar } from '$layout'
import { useNavigate } from 'react-router-dom'
import { user, userContext } from '$contexts'
import { type User } from '$types'

export default function AppLayout({
    children,
    sx,
    withSidebars
}: {
    children: React.ReactNode
    sx?: SxProps
    withSidebars?: boolean
}): ReactElement {
    const classes = useStyles()
    const theme = useTheme()

    const [ userData, setUserData ] = useState<User>(user)
    const userContextValue: { userData: User, setUserData: React.Dispatch<React.SetStateAction<User>> } = { userData, setUserData }

    const navigate = useNavigate()

    const [ open, setOpen ] = useState(false)
    const [ shortcutsExpanded, setShortcutsExpanded ] = useState(true)
    const [ contactsExpanded, setContactsExpanded ] = useState(true)
    const [ boxStyles, setBoxStyles ] = useState<CSSProperties>({})

    const shortcuts = 5
    const contacts = 11
    const variant: any = 'iconWrapper'

    const shortcutsExpand = (): void => { setShortcutsExpanded(true) }
    const shortcutsCollapse = (): void => { setShortcutsExpanded(false) }

    const contactsExpand = (): void => { setContactsExpanded(true) }
    const contactsCollapse = (): void => { setContactsExpanded(false) }

    const [ leftSideBar, setLeftSideBar ] = useState(withSidebars)
    const [ rightSideBar, setRightSideBar ] = useState(withSidebars)

    const maximize = (): void => {
        if (boxStyles.height === '100vh' || boxStyles.height === '200px') {
            setBoxStyles({
                height: '95vh',
                width: '95vw',
                borderRadius: '1rem'
            })
        } else {
            setBoxStyles({
                height: '100vh',
                width: '100vw',
                borderRadius: '0'
            })
        }
    }

    const minimize = (): void => {
        setBoxStyles({
            height: '200px',
            width: '400px',
            borderRadius: '1rem'
        })
    }

    const close = (): void => {
        setOpen(true)

        setTimeout(() => {
            window.location.href = '/auth/login'
        }, 2000)
    }

    return (
        <userContext.Provider value={userContextValue}>
            <Box sx={sx} display='flex' height='100vh' width='100%' justifyContent='center' alignItems='center'>
                <Box className={classes.body}>
                    {theme.palette.mode === 'light' &&
                        <img 
                            src={bg} 
                            style={{
                                zIndex: -2,
                                opacity: 'light',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '100%'
                            }} 
                        />
                    }
                    <Box sx={{ height: '95vh', width: '95vw', borderRadius: '1rem', ...boxStyles }} className={classes.wrapper}>
                        <Header
                            minimize={minimize}
                            maximize={maximize}
                            close={close}
                        />
                        <Box height='100%' display='flex' justifyContent='center' width='100%'>
                            {(!withSidebars ?? false) || (leftSideBar ?? false) &&
                                <SideBar>
                                    <Stack width='100%' mb={5} gap={3}>
                                        <Box className={classes.sideBarLinks} onClick={() => { navigate('/app') }}>
                                            <Avatar variant={variant}>
                                                <Home />
                                            </Avatar>
                                            <Typography display='flex' justifyContent='center' alignItems='center' ml={2.5}>
                                                Home
                                            </Typography>
                                        </Box>
                                        <Box className={classes.sideBarLinks} onClick={() => { navigate('/app/chat') }}>
                                            <Avatar variant={variant}>
                                                <Message />
                                            </Avatar>
                                            <Typography display='flex' justifyContent='center' alignItems='center' ml={2.5}>
                                                Conversas
                                            </Typography>
                                        </Box>
                                        <Box className={classes.sideBarLinks} onClick={() => { navigate('/app/favorites') }}>
                                            <Avatar variant={variant}>
                                                <Bookmark />
                                            </Avatar>
                                            <Typography display='flex' justifyContent='center' alignItems='center' ml={2.5}>
                                                Favoritos
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Box>
                                        <Box color='text.secondary' display='flex' mb={3} gap={2}>
                                            <Typography sx={{ userSelect: 'none' }} 
                                                onClick={shortcutsExpanded ? shortcutsCollapse : shortcutsExpand}
                                            >Seus atalhos ({shortcuts})</Typography>
                                            {shortcutsExpanded
                                                ? <ExpandLess sx={{ cursor: 'pointer' }} onClick={shortcutsCollapse} />
                                                : <ExpandMore sx={{ cursor: 'pointer' }} onClick={shortcutsExpand} />
                                            }
                                        </Box>
                                        <Stack gap={3} sx={{ display: shortcutsExpanded ? 'flex' : 'none' }}>
                                            <Shortcut title='Leonardo' category='Conversas' color={red[600]} />
                                            <Shortcut title='Alfa' category='Conversas' color={blue[600]} />
                                            <Shortcut title='Filhos do Jhonatas' category='Classes' color={green[600]} />
                                            <Shortcut title='Matemática' category='Materiais' color={yellow[600]} />
                                            <Shortcut title='Estudos' category='Grupo' color={purple[600]} />
                                        </Stack>
                                    </Box>
                                </SideBar>
                            }

                            {(withSidebars ?? false) &&
                                <Box sx={{ cursor: 'pointer' }} component='span' position='relative' m={2.5}>
                                    {(leftSideBar ?? false) ?
                                        <KeyboardDoubleArrowLeft onClick={(): void => { setLeftSideBar(prev => !prev) }} />
                                        :
                                        <KeyboardDoubleArrowRight onClick={(): void => { setLeftSideBar(prev => !prev) }} />
                                    }
                                </Box>
                            }

                            <Box display='flex' justifyContent='center' overflow='auto' mb={13} width={(withSidebars ?? false) ? '80%' : '100%'}>
                                {children}
                                {(withSidebars ?? false) &&
                                    <Box sx={{ cursor: 'pointer' }} component='span' position='relative' m={2.5}>
                                        {(rightSideBar ?? false) ?
                                            <KeyboardDoubleArrowRight onClick={(): void => { setRightSideBar(prev => !prev) }} />
                                            :
                                            <KeyboardDoubleArrowLeft onClick={(): void => { setRightSideBar(prev => !prev) }} />
                                        }
                                    </Box>
                                }
                            </Box>

                            {(!withSidebars ?? false) || (rightSideBar ?? false) &&
                                <SideBar sx={{ flexDirection: 'row-reverse', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' } }}>
                                    <Box color='text.secondary' display='flex' mb={3} gap={2} 
                                        onClick={contactsExpanded ? contactsCollapse : contactsExpand} sx={{ cursor:'pointer' }}>
                                        <Typography sx={{ userSelect: 'none' }} >Contatos ({contacts})</Typography>
                                        {contactsExpanded
                                            ? <ExpandLess sx={{ cursor: 'pointer' }} onClick={contactsCollapse} />
                                            : <ExpandMore sx={{ cursor: 'pointer' }} onClick={contactsExpand} />
                                        }
                                    </Box>
                                    <Stack gap={3} sx={{ display: contactsExpanded ? 'flex' : 'none' }}>
                                        <ContactAppLayout name={'Leonardo'} />
                                        <ContactAppLayout name={'Torugo'} />
                                        <ContactAppLayout name={'Alfa'} />
                                        <ContactAppLayout name={'Jhow'} />
                                        <ContactAppLayout name={'Rian'} />
                                        <ContactAppLayout name={'Kauê'} />
                                        <ContactAppLayout name={'Elizabeth'} />
                                        <ContactAppLayout name={'Luizinho'} />
                                        <ContactAppLayout name={'Paulo Rogério de Neves Oliveira'} />
                                        <ContactAppLayout name={'Fabinho'} />
                                        <ContactAppLayout name={'Sueli Muniz'} />
                                    </Stack>
                                </SideBar>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
            <LoadingBackdrop open={open} />
        </userContext.Provider>
    )
}
