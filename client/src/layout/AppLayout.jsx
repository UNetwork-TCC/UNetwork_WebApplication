import Sidebar from './SideBar'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useStyles } from '../styles'
import { Header } from '../layout'
import { Bookmark, Home, Message } from '@mui/icons-material'
import { useState } from 'react'

export default function AppLayout({ children, sx, withSidebars }) {
    const classes = useStyles()
    
    const [ boxStyles, setBoxStyles ] = useState({
        height: '100vh',
        width: '100vw',
        borderRadius: '1rem'
    })

    const maximize = () => {
        setBoxStyles({
            height: '100vh',
            width: '100vw',
            borderRadius: '0'
        })
    }

    const minimize = () => {
        setBoxStyles({
            height: '95vh',
            width: '95vw',
            borderRadius: '1rem'
        })
    }

    const close = () => {
        window.location.href = '/auth'
    }

    return (
        <Box sx={sx} display='flex' height='100vh' width='100%' justifyContent='center' alignItems='center'>
            <Box className={classes.body}>
                <Box sx={{ height: '95vh', width: '95vw', borderRadius: '1rem', ...boxStyles }} className={classes.wrapper}>
                    <Header 
                        minimize={minimize}
                        maximize={maximize}
                        close={close}
                    />
                    <Box height='100%' display='flex' justifyContent='center' width='100%'>
                        { withSidebars &&
                            <Sidebar>
                                <Stack mb={5} gap={3}>
                                    <Box className={classes.sideBarLinks}>
                                        <Avatar variant='iconWrapper'>
                                            <Home />
                                        </Avatar>
                                        <Typography display='flex' justifyContent='center' alignItems='center' ml={2.5}>
                                            Home
                                        </Typography>
                                    </Box>
                                    <Box className={classes.sideBarLinks}>
                                        <Avatar variant='iconWrapper'>
                                            <Message />
                                        </Avatar>
                                        <Typography display='flex' justifyContent='center' alignItems='center' ml={2.5}>
                                            Conversas
                                        </Typography>
                                    </Box>
                                    <Box className={classes.sideBarLinks}>
                                        <Avatar variant='iconWrapper'>
                                            <Bookmark />
                                        </Avatar>
                                        <Typography display='flex' justifyContent='center' alignItems='center' ml={2.5}>
                                            Favoritos
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack>
                                    Teste
                                </Stack>
                            </Sidebar>
                        }
                        <Box display='flex' justifyContent='center' width={withSidebars ? '80%' : '100%'}>
                            {children}
                        </Box>
                        { withSidebars &&
                            <Sidebar sx={{ flexDirection: 'row-reverse' }}>
                                b
                            </Sidebar>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
