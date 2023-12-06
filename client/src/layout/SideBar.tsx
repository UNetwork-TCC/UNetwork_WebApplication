import { ArrowBackIos, ArrowForwardIos, Bookmark, DarkMode, ExpandLess, ExpandMore, Home, LightMode, LogoutOutlined, Message } from '@mui/icons-material'
import { Box, Stack, type SxProps, Typography, Popover, Divider } from '@mui/material'
import { type ReactElement, useState, useContext } from 'react'
import { Shortcut } from '$components'
import { useNavigate } from 'react-router-dom'
import { type MouseEvent } from 'react'
import { appLayoutContext, themeContext } from '$contexts'
import { darkTheme, lightTheme } from '$themes'
import { useAppDispatch, useAppSelector } from '$store'
import { logOut } from '$features/auth'

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
            pl: !dropdownButtonClicked ? 1 : 0.75
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
                    <Typography fontSize={'1rem'}>{text}</Typography>
                )}
            </Box>
        )
    }

    return (
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
                    transition: '.3s ease-in-out'
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
                    <Box display='flex' gap={2} flexDirection='column' justifyContent='space-between'>
                        <Box display='flex' flexDirection='column' gap={3} >
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
                                        ml: 1
                                    }
                                }} 
                                height='450px' 
                                ml={!dropdownButtonClicked ? 3 : 2.4}
                            >
                                <Box
                                    onClick={setShortcutsExpanded}
                                    color='text.secondary'
                                    display='flex'
                                    mb={3}
                                    gap={2}
                                >
                                    {!dropdownButtonClicked ?
                                        <>
                                            <Typography sx={{ userSelect: 'none', cursor: 'pointer' }}>Seus atalhos ({shortcutsLength})</Typography>
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
                                            maxHeight: '410px',
                                            display: shortcutsExpanded ? 'flex' : 'none',
                                            overflow: 'scroll',
                                            overflowX: 'hidden',
                                            '::-webkit-slider-thumb': { display: 'none' }
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
                                    <Stack maxHeight={450} width={200} p={2.5}>
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
                        <Stack>
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
    )
}