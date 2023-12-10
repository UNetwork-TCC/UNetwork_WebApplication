/* eslint-disable react-hooks/exhaustive-deps */
import { type ReactElement, useContext } from 'react'
import { Box, type SxProps, useTheme, useMediaQuery, IconButton } from '@mui/material'
import { useStyles } from '$styles'
import { Header, SearchBar } from '.'
import { SideBar } from '$layout'
import { appLayoutContext } from '$contexts'
import { RequireAuth, UserAvatar } from '$components'
import bg from '$assets/img/bg.jpg'
import { Badge } from '@mui/material'
import { Avatar } from '@mui/material'
import { useAppSelector } from '$store'

import logo from '$assets/img/Logo.png'
import lightLogo from '$assets/img/LightLogo.png'
import { useNavigate } from 'react-router-dom'

export default function AppLayout({
    children,
    sx
}: {
    children: React.ReactNode
    sx?: SxProps
}): ReactElement {
    const user = useAppSelector(state => state.auth.user)

    const classes = useStyles()
    const theme = useTheme()

    const navigate = useNavigate()

    const { 
        window: {
            size,
            setSize
        }
    } = useContext(appLayoutContext)

    const maximize = (): void => {
        if (size.height === '100vh' || size.height === '200px') {
            setSize({
                height: '95vh',
                width: '95vw',
                borderRadius: '1rem'
            })
        } else {
            setSize({
                height: '100vh',
                width: '100vw',
                borderRadius: '0'
            })
        }
    }

    const minimize = (): void => {
        setSize({
            height: '200px',
            width: '400px',
            borderRadius: '1rem'
        })
    }

    const close = (): void => {
        setTimeout(() => {
            window.location.href = '/auth/login'
        }, 2000)
    }

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    let notification
    
    return (
        <RequireAuth>
            <Box sx={sx} display='flex' height='100vh' width='100%' flexDirection='column' justifyContent='center' alignItems='center'>
                <Box display='flex' flexDirection='column' className={classes.body}>
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
                    <Box 
                        className={classes.wrapper}
                        sx={
                            !matches ? { 
                                height: '95vh',
                                width: '95vw',
                                borderRadius: '1rem',
                                ...size 
                            } : {
                                height: '100vh',
                                width: '100vw',
                                borderRadius: '0'
                            }
                        } 
                    >
                        {!matches ? (
                            <Header
                                minimize={minimize}
                                maximize={maximize}
                                close={close}
                            />
                        ) : (
                            <Box bgcolor={theme.palette.mode === 'light' ? 'white' : '#221f24'} >
                                <Box p='1.25rem' display='flex' gap={1} alignItems='center' >
                                    <IconButton 
                                        onClick={() => { navigate('/app') }} 
                                    >
                                        <img height={30} width={30} src={ theme.palette.mode === 'light' ? logo : lightLogo}></img>
                                    </IconButton>
                                    <Box ml={2} display='flex' width='66%'>
                                        <SearchBar />
                                    </Box>
                                    <Box display='flex'>
                                        {notification ? (
                                            <Badge badgeContent='+99' color='primary'>
                                                <IconButton 
                                                    // onClick={e => { handleClick(e, 
                                                    //     [ 'Configurações', 'Ajuda e suporte', 'Dar feedback' ],
                                                    //     [ 
                                                    //         <Settings key={0} />,
                                                    //         <Help key={1} />,
                                                    //         <Feedback key={2} />
                                                    //     ],
                                                    //     [   () => {},
                                                    //         handleHelp,
                                                    //         handleFeedback
                                                    //     ],
                                                    //     true
                                                    // ) }}
                                                >
                                                    <Avatar sx={{ background: 'white', color: 'grey.400' }}>
                                                        <UserAvatar
                                                            user={user}
                                                            sx={{
                                                                borderRadius: '50%',
                                                                height: '100%',
                                                                width: '100%' 
                                                            }}
                                                        />
                                                    </Avatar>
                                                </IconButton>
                                            </Badge>
                                        ) : (
                                            <IconButton 
                                                // onClick={e => { handleClick(e, 
                                                //     [ 'Configurações', 'Ajuda e suporte', 'Dar feedback' ],
                                                //     [ 
                                                //         <Settings key={0} />,
                                                //         <Help key={1} />,
                                                //         <Feedback key={2} />
                                                //     ],
                                                //     [   () => {},
                                                //         handleHelp,
                                                //         handleFeedback
                                                //     ],
                                                //     true
                                                // ) }}
                                            >
                                                <Avatar sx={{ background: 'white', color: 'grey.400' }}>
                                                    <UserAvatar
                                                        user={user}
                                                        sx={{
                                                            borderRadius: '50%',
                                                            height: '100%',
                                                            width: '100%' 
                                                        }}
                                                    />
                                                </Avatar>
                                            </IconButton>
                                        )}
                                        {/* <CustomMenu
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleMenuClose}
                                        >
                                            {menuContent}
                                        </CustomMenu> */}
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        <Box height='100%' display='flex' justifyContent='center' width='100%'>
                            {!matches && <SideBar />}
                            <Box 
                                overflow='auto' 
                                // height='92.5vh' 
                                width={'100%'}
                                sx={matches ? {
                                    overflowX: 'hidden',
                                    '::-webkit-scrollbar': {
                                        display: 'none'
                                    }
                                } : {}}
                            >
                                {children}
                            </Box>
                        </Box>
                    </Box>
                    {matches && <SideBar />}
                </Box>
            </Box>
        </RequireAuth>
    )
}
