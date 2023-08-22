import Sidebar from './SideBar'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useStyles } from '../styles'
import { Header, LoadingBackdrop } from '../layout'
import { Bookmark, ExpandLess, ExpandMore, Home, Message } from '@mui/icons-material'
import { useState } from 'react'
import bg from '../assets/img/bg.jpg'
import Shortcut from '../components/Home/Shortcut'
import { blue, green, purple, red, yellow } from '@mui/material/colors'
import Contact from '../components/Home/Contact'

import { useNavigate } from 'react-router-dom'

export default function AppLayout({ children, sx, withSidebars }) {
    const classes = useStyles()

    const navigate = useNavigate()

    const [ open, setOpen ] = useState(false)
    const [ shortcutsExpanded, setShortcutsExpanded ] = useState(true)
    const [ contactsExpanded, setContactsExpanded ] = useState(true)
    const [ boxStyles, setBoxStyles ] = useState({})
    const shortcuts = 5
    const contacts = 11

    const shortcutsExpand = () => {
        setShortcutsExpanded(true)
    }

    const shortcutsCollapse = () => {
        setShortcutsExpanded(false)
    }

    const contactsExpand = () => {
        setContactsExpanded(true)
    }

    const contactsCollapse = () => {
        setContactsExpanded(false)
    }

    const maximize = () => {
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

    const minimize = () => {
        setBoxStyles({
            height: '200px',
            width: '400px',
            borderRadius: '1rem'
        })
    }

    const close = () => {
        setOpen(true)

        setTimeout(() => {
            window.location.href = '/auth'
        }, 2000)
    }

    return (
        <>
            <Box sx={sx} display='flex' height='100vh' width='100%' justifyContent='center' alignItems='center'>
                <Box className={classes.body}>
                    <img src={bg} style={{
                        zIndex: -2,
                        opacity: 0.5,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: 'auto'
                    }} />
                    <Box sx={{ height: '95vh', width: '95vw', borderRadius: '1rem', ...boxStyles }} className={classes.wrapper}>
                        <Header
                            minimize={minimize}
                            maximize={maximize}
                            close={close}
                        />
                        <Box height='100%' display='flex' justifyContent='center' width='100%'>
                            {withSidebars &&
                                <Sidebar>
                                    <Stack width='100%' mb={5} gap={3}>
                                        <Box className={classes.sideBarLinks} onClick={() => navigate('/app')}>
                                            <Avatar variant='iconWrapper'>
                                                <Home />
                                            </Avatar>
                                            <Typography display='flex' justifyContent='center' alignItems='center' ml={2.5}>
                                                Home
                                            </Typography>
                                        </Box>
                                        <Box className={classes.sideBarLinks} onClick={() => navigate('/app/chat')}>
                                            <Avatar variant='iconWrapper'>
                                                <Message />
                                            </Avatar>
                                            <Typography display='flex' justifyContent='center' alignItems='center' ml={2.5}>
                                                Conversas
                                            </Typography>
                                        </Box>
                                        <Box className={classes.sideBarLinks} onClick={() => navigate('/app/favorites')}>
                                            <Avatar variant='iconWrapper'>
                                                <Bookmark />
                                            </Avatar>
                                            <Typography display='flex' justifyContent='center' alignItems='center' ml={2.5}>
                                                Favoritos
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Box>
                                        <Box color='text.secondary' display='flex' mb={3} gap={2}>
                                            <Typography sx={{ userSelect: 'none' }} onClick={shortcutsExpanded ? shortcutsCollapse : shortcutsExpand}>Seus atalhos ({shortcuts})</Typography>
                                            {shortcutsExpanded ?
                                                <ExpandLess sx={{ cursor: 'pointer' }} onClick={shortcutsCollapse} />
                                                :
                                                <ExpandMore sx={{ cursor: 'pointer' }} onClick={shortcutsExpand} />
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
                                </Sidebar>
                            }
                            <Box display='flex' justifyContent='center' overflow='auto' mb={13} width={withSidebars ? '80%' : '100%'}>
                                {children}
                            </Box>
                            {withSidebars &&
                                <Sidebar sx={{ flexDirection: 'row-reverse' }}>
                                    <Box color='text.secondary' display='flex' mb={3} gap={2}>
                                        <Typography sx={{ userSelect: 'none' }} onClick={contactsExpanded ? contactsCollapse : contactsExpand}>Contatos ({contacts})</Typography>
                                        {contactsExpanded ?
                                            <ExpandLess sx={{ cursor: 'pointer' }} onClick={contactsCollapse} />
                                            :
                                            <ExpandMore sx={{ cursor: 'pointer' }} onClick={contactsExpand} />
                                        }
                                    </Box>
                                    <Stack gap={3} sx={{ display: contactsExpanded ? 'flex' : 'none' }}>
                                        <Contact name='Leonardo' />
                                        <Contact name='Torugo' />
                                        <Contact name='Alfa' />
                                        <Contact name='Jhow' />
                                        <Contact name='Rian' />
                                        <Contact name='Kauê' />
                                        <Contact name='Elizabeth' />
                                        <Contact name='Luizinho' />
                                        <Contact name='Paulo Rogério de Neves Oliveira' />
                                        <Contact name='Fabinho' />
                                        <Contact name='Sueli Muniz' />
                                    </Stack>
                                </Sidebar>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
            <LoadingBackdrop open={open} />
        </>
    )
}
