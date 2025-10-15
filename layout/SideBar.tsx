'use client'
import {
  ArrowBackIos,
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

import {
  Box,
  Stack,
  type SxProps,
  Typography,
  Popover,
  Divider,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  theme
} from '@mui/material'
import {
  type ReactElement,
  useState,
  useContext,
  type SyntheticEvent
} from 'react'
import { Shortcut } from '@/components'
import { useNavigate } from '@/hooks'
import { type MouseEvent } from 'react'
import { appLayoutContext, themeContext } from '@/contexts'
import { darkTheme, lightTheme } from '@/themes'
import { useAppDispatch, useAppSelector } from '@/store'
import { logOut } from '@/features/auth'
import { setChatId, setMessages } from '@/features/chat'

export default function SideBar(): ReactElement {
  const theme = useTheme()

  const user = useAppSelector(state => state.auth.user)

  const {
    sideBar: {
      dropdownButtonClicked,
      setDropdownButtonClicked,
      shortcutsExpanded,
      setShortcutsExpanded
    }
  } = useContext(appLayoutContext)

  const { setTheme } = useContext(themeContext)
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const toogleDropdown = setDropdownButtonClicked

  const dispatch = useAppDispatch()

  const [shortcutsLength] = useState(user?.otherInfo?.shortcuts?.length ?? 0)

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
      height: { md: 20, lg: 24, xl: 25 },
      width: { md: 20, lg: 24, xl: 25 },
      p: !dropdownButtonClicked ? { md: 0.4, lg: 0.5 } : { md: 0.6, lg: 0.75 },
      top: { md: 3, lg: 8, xl: 10 },
      left: !dropdownButtonClicked ? { md: '100%', lg: '100%', xl: '100%' } : { md: '100%', lg: '100%', xl: '100%' },
      transform: !dropdownButtonClicked
        ? 'translateX(4px)'
        : 'translateX(4px)',
      cursor: 'pointer',
      bgcolor: 'primary.main',
      borderRadius: '50%',
      color: 'primary.contrastText',
      transition: 'transform .2s ease-in-out, left .3s ease-in-out',
      pl: !dropdownButtonClicked ? { md: 0.8, lg: 0.95, xl: 1 } : { md: 0.6, lg: 0.7, xl: 0.75 },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      willChange: 'transform',
      zIndex: 10
    },

    ':hover': {
      transform: !dropdownButtonClicked
        ? 'translateX(4px) scale(1.1)'
        : 'translateX(4px) scale(1.1)'
    }
  }

  const logout = async (): Promise<void> => {
    dispatch(logOut())
    dispatch(setMessages([]))
    dispatch(setChatId([]))

    setTimeout(() => {
      navigate('/auth/login')
    }, 1500)
  }

  function NavLink({
    icon,
    text,
    link
  }: {
    icon: ReactElement
    text: string
    link: string | (() => void) | (() => Promise<void>)
  }): ReactElement {
    return (
      <Box
        onClick={
          typeof link === 'string'
            ? (): void => {
                navigate(link)
              }
            : (): void => {
                link()
              }
        }
        sx={{
          '&': {
            minHeight: { md: '2.5rem', lg: '3rem', xl: '3.25rem' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: dropdownButtonClicked ? 'center' : 'flex-start',
            px: { md: 1.5, lg: 2, xl: 2.5 },
            py: { md: 1, lg: 1.25, xl: 1.5 },
            mb: { md: 0.5, lg: 0.75, xl: 1 },
            gap: { md: 1.5, lg: 2, xl: 2.5 },
            borderRadius: 2,
            bgcolor: 'transparent',
            transition: 'background-color .2s ease-in-out, color .2s ease-in-out',
            cursor: 'pointer',
            willChange: 'background-color, color'
          },

          ':hover': {
            color: 'primary.contrastText',
            bgcolor: 'primary.main'
          }
        }}
      >
        <Box
          sx={{
            fontSize: { md: '1.25rem', lg: '1.5rem', xl: '1.625rem' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
        {!dropdownButtonClicked && (
          <Typography
            sx={{
              fontSize: { md: '0.875rem', lg: '1rem', xl: '1.0625rem' },
              fontWeight: 500,
              whiteSpace: 'nowrap'
            }}
          >
            {text}
          </Typography>
        )}
      </Box>
    )
  }

  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const [value, setValue] = useState(location.href.split('/')[4])

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
              p: { md: 2, lg: 2.5, xl: 3 },
              width: !dropdownButtonClicked
                ? { md: '15rem', lg: '18rem', xl: '20rem' }
                : { md: '5.5rem', lg: '6.5rem', xl: '7rem' },
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, .3)'
                  : 'rgba(255, 255, 255, .1)',
              transition: 'width .3s ease-in-out, padding .3s ease-in-out',
              backdropFilter: 'blur(10px)',
              willChange: 'width',
              overflow: 'visible'
            }}
          >
            <Box position="relative">
              {dropdownButtonClicked ? (
                <ArrowForwardIos sx={arrowStyle} onClick={toogleDropdown} />
              ) : (
                <ArrowBackIos sx={arrowStyle} onClick={toogleDropdown} />
              )}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="space-between"
              overflow="hidden"
            >
              <Box
                display="flex"
                gap={{ md: 1.5, lg: 2, xl: 2.5 }}
                flexDirection="column"
                flex="1 1 auto"
                minHeight="0"
                maxHeight="calc(100% - 140px)"
                overflow="auto"
                sx={{
                  '::-webkit-scrollbar': {
                    width: '4px'
                  },
                  '::-webkit-scrollbar-thumb': {
                    bgcolor: 'primary.main',
                    borderRadius: '10px'
                  }
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={{ md: 1, lg: 1.5, xl: 2 }}
                >
                  <Stack gap={0}>
                    <NavLink icon={<Home />} text="Home" link="/app" />
                    <NavLink
                      icon={<Message />}
                      text="Conversas"
                      link="/app/chat"
                    />
                    <NavLink
                      icon={<Bookmark />}
                      text="Favoritos"
                      link="/app/favorites"
                    />
                  </Stack>
                  <Box
                    sx={{
                      ml: !dropdownButtonClicked
                        ? { md: 1.5, lg: 2, xl: 2.5 }
                        : { md: 0.5, lg: 1, xl: 1.5 },
                      maxHeight: { md: '8rem', lg: '16rem', xl: '20rem' },
                      overflow: 'hidden',
                      flex: '0 1 auto'
                    }}
                  >
                    <Box
                      onClick={setShortcutsExpanded}
                      color="text.secondary"
                      display="flex"
                      alignItems="center"
                      mb={{ md: 1, lg: 1.5, xl: 2 }}
                      gap={{ md: 1, lg: 1.5, xl: 2 }}
                    >
                      {!dropdownButtonClicked ? (
                        <>
                          <Typography
                            sx={{
                              userSelect: 'none',
                              cursor: 'pointer',
                              fontSize: { md: '0.8rem', lg: '0.9rem', xl: '0.95rem' },
                              fontWeight: 600
                            }}
                          >
                            Seus atalhos ({shortcutsLength})
                          </Typography>
                          {shortcutsExpanded ? (
                            <ExpandLess sx={{ cursor: 'pointer' }} />
                          ) : (
                            <ExpandMore sx={{ cursor: 'pointer' }} />
                          )}
                        </>
                      ) : (
                        <Box
                          onClick={e => {
                            handleOpenPopover(e)
                          }}
                        >
                          {!open ? (
                            <ExpandMore sx={{ cursor: 'pointer' }} />
                          ) : (
                            <ExpandLess sx={{ cursor: 'pointer' }} />
                          )}
                        </Box>
                      )}
                    </Box>
                    {!dropdownButtonClicked && (
                      <Stack
                        sx={{
                          maxHeight: { md: '6rem', lg: '14rem', xl: '18rem' },
                          display: shortcutsExpanded ? 'flex' : 'none',
                          overflowY: 'auto',
                          overflowX: 'hidden',
                          gap: 0.5,
                          '::-webkit-scrollbar': {
                            width: '5px'
                          },
                          '::-webkit-scrollbar-track': {
                            bgcolor: 'transparent'
                          },
                          '::-webkit-scrollbar-thumb': {
                            bgcolor: 'primary.main',
                            borderRadius: '10px'
                          },
                          '::-webkit-scrollbar-thumb:hover': {
                            bgcolor: 'primary.dark'
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
                    )}
                    <Popover
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClosePopover}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                    >
                      <Stack maxWidth={450} p={2.5} sx={{ bgcolor: 'red-500' }}>
                        <Typography mb={2.5} textAlign="center">
                          Seus atalhos ({shortcutsLength})
                        </Typography>
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
              </Box>
              <Stack
                gap={{ md: 0.5, lg: 0.75, xl: 1 }}
                mt="auto"
                pt={{ md: 2, lg: 2.5, xl: 3 }}
                pb={{ md: 1, lg: 0, xl: 0 }}
                flex="0 0 auto"
                sx={{
                  flexShrink: 0,
                  minHeight: '120px'
                }}
              >
                <NavLink icon={<LogoutOutlined />} text="Sair" link={logout} />
                <NavLink
                  icon={
                    theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />
                  }
                  text={
                    theme.palette.mode === 'dark' ? 'Tema claro' : 'Tema escuro'
                  }
                  link={(): void => {
                    setTheme(
                      theme.palette.mode === 'dark' ? lightTheme : darkTheme
                    )
                  }}
                />
              </Stack>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            role="presentation"
            flexItem
            sx={{ height: '100%' }}
          />
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
