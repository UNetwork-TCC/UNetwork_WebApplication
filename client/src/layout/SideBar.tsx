import { ArrowBackIos,
    ArrowForwardIos,
    Bookmark,
    DarkMode,
    ExpandLess,
    ExpandMore,
    Home,
    LightMode,
    LogoutOutlined,
    Message,
    Newspaper,
    Forum as ForumIcon
} from '@mui/icons-material'

import { Box, Stack, type SxProps, Typography, Popover, Divider, useMediaQuery, BottomNavigation } from '@mui/material'
import { type ReactElement, useState, useContext, type SyntheticEvent } from 'react'
import { Shortcut } from '$components'
import { useNavigate } from 'react-router-dom'
import { type MouseEvent } from 'react'
import { appLayoutContext, themeContext } from '$contexts'
import { darkTheme, lightTheme } from '$themes'
import { useAppDispatch, useAppSelector } from '$store'
import { logOut } from '$features/auth'
import { BottomNavigationAction } from '@mui/material'

export default function SideBar(): ReactElement {
    const { theme, setTheme } = useContext(themeContext)
    
    const user = useAppSelector(state => state.auth.user)
    
    const { 
        sideBar: {
            dropdownButtonClicked,
            setDropdownButtonClicked,
            shortcutsExpanded,
            setShortcutsExpanded
        }
    } = useContext(appLayoutContext)
    const navigate = useNavigate()

    const [ anchorEl, setAnchorEl ] = useState<HTMLDivElement | null>(null)
    const toogleDropdown = setDropdownButtonClicked
    
    const dispatch = useAppDispatch()

    const [ shortcutsLength ] = useState(user?.otherInfo?.shortcuts?.length ?? 0)

    const open = Boolean(anchorEl)

    const handleOpenPopover = (event: MouseEvent<HTMLDivElement>): void => {
        setAnchorEl(event.currentTarget)
    }

    const handleClosePopover = (): void => {
        setAnchorEl(null)
    }

    const arrowStyle: SxProps = {
        '&': {
            position: 'absolute',
            height: 25,
            width: 25,
            p: !dropdownButtonClicked ? 0.50 : 0.75 ,
            top: 10,
            left: !dropdownButtonClicked ? '105.5%' : '120%',
            cursor: 'pointer',
            bgcolor: 'primary.main',
            borderRadius: '50%',
            color: 'primary.contrastText',
            transition: '.3s ease-in-out',
            pl: !dropdownButtonClicked ? 1 : 0.75,
            [theme.breakpoints.down('lg')]:{ left: !dropdownButtonClicked ? '111%' : '145%', top: 3, height:20, width:20, p: !dropdownButtonClicked ? 0.3 : 0.55,
                pl: !dropdownButtonClicked ? 0.8 : 0.60 }
        },

        ':hover': {
            transition: '.3s ease-in-out'
        }
    }

    const logout = async (): Promise<void> => {
        dispatch(logOut())

        setTimeout(() => {
            navigate('/auth/login')
        }, 1500)
    }

    function NavLink({
        icon,
        text,
        link
    }: {
        icon: ReactElement,
        text: string,
        link: string | (() => void) | (() => Promise<void>)
    }): ReactElement {
        return (
            <Box
                onClick={ 
                    typeof link === 'string' ?
                        (): void => { navigate(link) } 
                        :
                        (): void => { link() }
                }
                sx={{
                    '&': {
                        height: '3.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: dropdownButtonClicked ? 'center' : undefined,
                        p: '6%',
                        mb: '2%',
                        gap: 2,
                        borderRadius: 2,
                        bgcolor: 'transparent',
                        transition: '.3s ease-in-out',
                        cursor: 'pointer',
                        [theme.breakpoints.down('xl')]: {
                            p: 2
                        },
                        [theme.breakpoints.down('lg')]: {
                            height:'2.5rem',
                            p:'5%'                          ,
                            gap:1.5
                        }
                    },

                    ':hover': {
                        color: 'primary.contrastText',
                        bgcolor: 'primary.main',
                        transition: '.3s ease-in-out'

                    }
                }}
            >
                {icon}
                {!dropdownButtonClicked && (
                    <Typography fontSize={'1rem'} sx={{ [theme.breakpoints.down('lg')]: { fontSize:'0.9rem' } }}>{text}</Typography>
                )}
            </Box>
        )
    }

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const [ value, setValue ] = useState(location.href.split('/')[4])

    const handleChange = (_event: SyntheticEvent, newValue: string): void => {
        if (newValue === 'theme') {
            setTheme(theme === darkTheme ? lightTheme : darkTheme)
        } else {
            setValue(newValue)
            navigate('/app/' + newValue)
        }
    }

    return (
        <>
            {!matches ? (
                <>
                    <Box
                        sx={{
                            height: '100%',
                            position: 'relative',
                            top: 0,
                            left: 0,
                            p: 3,
                            width: !dropdownButtonClicked ? '20rem' : '7rem',
                            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, .3)' : 'rgba(255, 255, 255, .1)',
                            transition: '.3s ease-in-out',
                            [theme.breakpoints.down('lg')]: { width: !dropdownButtonClicked ? '17rem' : '7rem' }
                        }}
                    >
                        <Box position='relative'>
                            {
                                dropdownButtonClicked ?
                                    <ArrowForwardIos
                                        sx={arrowStyle}
                                        onClick={toogleDropdown}
                                    />
                                    :
                                    <ArrowBackIos
                                        sx={arrowStyle}
                                        onClick={toogleDropdown}
                                    />
                            }
                        </Box>
                        <Box
                            display='flex'
                            flexDirection='column'
                            height='100%'
                        >
                            <Box display='flex' gap={2} flexDirection='column'>
                                <Box display='flex' flexDirection='column' gap={2} sx={{ [theme.breakpoints.down('lg')]:{ gap:1 } }}>
                                    <Stack gap={1}>
                                        <NavLink
                                            icon={<Home />}
                                            text='Home'
                                            link='/app'
                                        />
                                        <NavLink
                                            icon={<Message />}
                                            text='Conversas'
                                            link='/app/chat'
                                        />
                                        <NavLink
                                            icon={<Bookmark />}
                                            text='Favoritos'
                                            link='/app/favorites'
                                        />
                                    </Stack>
                                    <Box 
                                        sx={{
                                            [theme.breakpoints.down('xl')]: {
                                                ml: 1,
                                                maxHeight: '27rem',
                                                minHeight: '20rem'
                                            },
                                            [theme.breakpoints.down('lg')]:{
                                                maxHeight:'22rem'
                                            }
                                        }} 
                                        // height={'26rem'}
                                        minHeight='14rem' 
                                        ml={!dropdownButtonClicked ? 3 : 2.4}
                                    >
                                        <Box
                                            onClick={setShortcutsExpanded}
                                            color='text.secondary'
                                            display='flex'
                                            mb={3}
                                            gap={2}
        
                                            sx={{ [theme.breakpoints.down('lg')]:{ mb:1 } }}
                                        >
                                            {!dropdownButtonClicked ?
                                                <>
                                                    <Typography sx={{ 
                                                        userSelect: 'none', cursor: 'pointer', 
                                                        [theme.breakpoints.down('lg')]: { fontSize:'0.9rem' }
                                                    }}>Seus atalhos ({shortcutsLength})</Typography>
                                                    {shortcutsExpanded
                                                        ? <ExpandLess sx={{ cursor: 'pointer' }} />
                                                        : <ExpandMore sx={{ cursor: 'pointer' }} />
                                                    }
                                                </>
                                                :
                                                <Box onClick={e => { handleOpenPopover(e) }}>
                                                    { !open ?
                                                        <ExpandMore sx={{ cursor: 'pointer' }} />
                                                        :
                                                        <ExpandLess sx={{ cursor: 'pointer' }} />
                                                    }
                                                </Box>
                                            }
                                        </Box>
                                        {!dropdownButtonClicked &&
                                            <Stack
                                                sx={{
                                                    maxHeight: '24rem',
                                                    display: shortcutsExpanded ? 'flex' : 'none',
                                                    overflow: 'scroll',
                                                    overflowX: 'hidden',
                                                    '::-webkit-slider-thumb': { display: 'none' },
                                                    [theme.breakpoints.down('xl')]: {
                                                        maxHeight: '23rem'
                                                    },
                                                    [theme.breakpoints.down('lg')]: {
                                                        maxHeight:'20rem',
                                                        '::-webkit-scrollbar': { width:'5px' }
                                                    }
                                                }}
                                            >
                                                {user.otherInfo?.shortcuts?.map((shortcut, index) => (
                                                    <Shortcut
                                                        key={index}
                                                        title={shortcut.title}
                                                        category={shortcut.category}
                                                        color={shortcut.color}
                                                    />
                                                ))}
                                            </Stack>
                                        }
                                        <Popover
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClosePopover}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <Stack maxWidth={450} p={2.5}>
                                                <Typography mb={2.5} textAlign='center'>Seus atalhos ({ shortcutsLength })</Typography>
                                                {user.otherInfo?.shortcuts?.map((shortcut, index) => (
                                                    <Shortcut
                                                        key={index}
                                                        title={shortcut.title}
                                                        category={shortcut.category}
                                                        color={shortcut.color}
                                                    />
                                                ))}
                                            </Stack>
                                        </Popover>
                                    </Box>
                                </Box>
                                <Stack gap={2} >
                                    <NavLink 
                                        icon={<LogoutOutlined />}
                                        text='Sair'
                                        link={logout}
                                    />
                                    <NavLink 
                                        icon={theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                                        text={theme.palette.mode === 'dark' ? 'Tema claro' : 'Tema escuro'}
                                        link={(): void => { setTheme(theme.palette.mode === 'dark' ? lightTheme : darkTheme) }}
                                    />
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                    <Divider orientation='vertical' role='presentation' flexItem sx={{ height: '100%' }} />
                </>
            ) : (
                <BottomNavigation 
                    showLabels 
                    value={value} 
                    onChange={handleChange}
                    sx={{ width: '100vw' }} 
                >
                    <BottomNavigationAction
                        label="Home"
                        value=""
                        icon={<Home />}
                        sx={{ mr: -1.5 }}
                    />
                    <BottomNavigationAction
                        label="Conversas"
                        value="chat"
                        icon={<Message />}
                        sx={{ mr: -1.5 }}

                    />
                    <BottomNavigationAction
                        label="Favoritos"
                        value="favorites"
                        icon={<Bookmark />}
                        sx={{ mr: -1.5 }}

                    />
                    <BottomNavigationAction
                        label="Fóruns"
                        value="forum"
                        icon={<ForumIcon />}
                        sx={{ mr: -1.5 }}

                    />
                    <BottomNavigationAction 
                        label="Notícias" 
                        value="news" 
                        icon={<Newspaper />} 
                        sx={{ mr: -1.5 }}
                    />
                    <BottomNavigationAction 
                        label={theme.palette.mode === 'dark' ? 'Tema claro' : 'Tema escuro'} 
                        icon={theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />} 
                        value="theme"
                    />
                    {/* <BottomNavigationAction 
                        label="Notícias" 
                        value="news" 
                        icon={logo} 
                    /> */}
                </BottomNavigation>
            )}
        </>
    )
}