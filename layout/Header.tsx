'use client'
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
'use client'

import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Snackbar,
  Typography,
  useTheme,
  Popover,
  Button,
  Chip,
  alpha
} from '@mui/material'
import {
  FilterNone,
  Close,
  Minimize,
  Notifications,
  Settings,
  Help,
  Feedback,
  CloseSharp,
  Dashboard,
  NotificationsOff,
  DoneAll,
  Delete,
  Circle
} from '@mui/icons-material'
import { CustomLink, CustomMenu, UNetworkModal, SearchBar } from '@/layout'
import { useNavigate } from '@/hooks'
import { type ReactElement, useState, type FormEvent } from 'react'
import { FeedbackForm, UserAvatar } from '@/components'
import { useAppSelector } from '@/store'
import { useNotifications, type Notification } from '@/contexts'

export default function Header({
  minimize,
  maximize,
  close
}: {
  minimize: () => void
  maximize: () => void
  close: () => void
}): ReactElement {
  const navigate = useNavigate()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuContent, setMenuContent] = useState<React.ReactNode[]>([])
  const open = Boolean(anchorEl)

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [unetworkModalOpen, setUnetworkModalOpen] = useState<boolean>(false)

  const handleModalOpen = (): void => {
    setModalOpen(true)
  }
  const handleModalClose = (): void => {
    setModalOpen(false)
  }

  const handleUnetworkModalOpen = (): void => {
    setUnetworkModalOpen(true)
  }
  const handleUnetworkModalClose = (): void => {
    setUnetworkModalOpen(false)
  }

  const handleSnackbarOpen = (): void => {
    setSnackbarOpen(true)
  }
  const handleSnackbarClose = (): void => {
    setSnackbarOpen(false)
  }

  const user = useAppSelector(state => state.auth.user)
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()

  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null)
  const notificationOpen = Boolean(notificationAnchor)

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>): void => {
    setNotificationAnchor(event.currentTarget)
  }

  const handleNotificationClose = (): void => {
    setNotificationAnchor(null)
  }

  const formatNotificationTime = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - new Date(date).getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Agora'
    if (diffMins < 60) return `${diffMins}min`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`
    return new Date(date).toLocaleDateString('pt-BR')
  }

  const getNotificationIcon = (type: Notification['type']): string => {
    const icons: Record<Notification['type'], string> = {
      message: 'Mensagem',
      like: 'Curtida',
      follow: 'Seguiu',
      comment: 'Comentario',
      mention: 'Mencao',
      system: 'Sistema'
    }
    return icons[type]
  }

  const handleFeedback = (): void => {
    handleModalOpen()
    handleMenuClose()
  }

  const handleClick = (
    e: MouseEvent,
    elements: string[],
    icons: React.ReactNode[] = [],
    onClickEvents: Array<() => void> = elements.map(() => handleMenuClose),
    userMenu: boolean = false
  ): void => {
    const mapedElements = elements.map((el, i) => (
      <MenuItem onClick={onClickEvents[i]} key={i} disableRipple>
        {icons && icons[i]}
        {el}
      </MenuItem>
    ))

    if (userMenu)
      setMenuContent([
        <MenuItem
          key={-2}
          disableRipple
          sx={{ display: 'flex', gap: 1.5 }}
          onClick={() => {
            navigate('/app/profile/' + user._id)
          }}
        >
          <Avatar sx={{ background: 'transparent' }}>
            {user?.otherInfo?.avatar?.src && (
              <img
                src={user?.otherInfo?.avatar.src}
                alt={'Avatar de' + user?.username}
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'conver',
                  resize: 'both'
                }}
              />
            )}
          </Avatar>
          <Typography>Perfil</Typography>
        </MenuItem>,
        <Divider key={-1} />,
        ...mapedElements
      ])
    else setMenuContent(mapedElements)

    if (user?.admin)
      setMenuContent([
        <MenuItem
          onClick={() => {
            navigate('/app/admin/dashboard/')
          }}
          disableRipple
          key={-2}
        >
          <Dashboard sx={{ background: 'transparent' }} /> Admin Dashboard
        </MenuItem>,
        <Divider key={-1} />,
        ...mapedElements
      ])

    setAnchorEl(e.currentTarget as HTMLElement)
  }
  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    handleModalClose()
    handleSnackbarOpen()
  }

  const handleHelp = (): void => {
    handleUnetworkModalOpen()
    handleMenuClose()
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSnackbarClose}
    >
      <CloseSharp fontSize="small" />
    </IconButton>
  )

  return (
    <>
      <Box>
        <Box bgcolor={theme.palette.mode === 'light' ? 'white' : '#1a1a1a'}>
          <Box
            width="100%"
            gap={2}
            p={1}
            position="relative"
            mb={-4}
            top={2}
            zIndex={1}
            display="flex"
            justifyContent="end"
            alignItems="center"
          >
            <Minimize
              onClick={minimize}
              sx={{
                height: '15px',
                width: '15px',
                cursor: 'pointer',
                ':hover': { color: 'text.secondary' }
              }}
            />
            <FilterNone
              onClick={maximize}
              sx={{
                height: '15px',
                width: '15px',
                cursor: 'pointer',
                ':hover': { color: 'text.secondary' }
              }}
            />
            <Close
              onClick={close}
              sx={{
                height: '15px',
                width: '15px',
                cursor: 'pointer',
                ':hover': { color: 'text.secondary' }
              }}
            />
          </Box>
          <Box
            p="1.5rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={{ md: 2, lg: 3, xl: 4 }}
            width={'95%'}
          >
            <Box
              onClick={() => {
                navigate('/app')
              }}
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1.5}
            >
              <img
                height={50}
                width={50}
                src={
                  theme.palette.mode === 'light'
                    ? '/assets/img/Logo.png'
                    : '/assets/img/LightLogo.png'
                }
              ></img>
              <Typography
                sx={{
                  fontSize: { md: '1.125rem', lg: '1.25rem', xl: '1.375rem' },
                  fontWeight: 600,
                  lineHeight: 1
                }}
              >
                UNetwork
              </Typography>
            </Box>
            <Box
              display="flex"
              flex="1"
              maxWidth="40%"
              mx={{ md: 2, lg: 3, xl: 4 }}
            >
              <SearchBar />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              gap={{ md: 3, lg: 4, xl: 5 }}
            >
              <CustomLink to="/app/forum" name="Fóruns" />
              {/* <CustomLink to='/app/classes' name='Classes' /> */}
              {/* <CustomLink to='/app/materials' name='Materiais' /> */}
              <CustomLink to="/app/news" name="Notícias" />
            </Box>
            <Box
              gap={{ md: 2, lg: 3, xl: 3 }}
              display="flex"
              alignItems="center"
            >
              <Box sx={{ [theme.breakpoints.only('md')]: { mt: '8%' } }}>
                <Badge
                  badgeContent={unreadCount > 99 ? '99+' : unreadCount}
                  color="error"
                  invisible={unreadCount === 0}
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      minWidth: 18,
                      height: 18,
                      borderRadius: '9px',
                      padding: '0 4px'
                    }
                  }}
                >
                  <IconButton
                    sx={{
                      [theme.breakpoints.only('md')]: {
                        width: '3rem',
                        mt: '20%',
                        height: '2rem'
                      }
                    }}
                    onClick={handleNotificationClick}
                  >
                    <Avatar
                      sx={{
                        [theme.breakpoints.only('md')]: {
                          width: '2.5rem',
                          height: '2.5rem'
                        }
                      }}
                    >
                      <Notifications />
                    </Avatar>
                  </IconButton>
                </Badge>
              </Box>
              <Box sx={{ [theme.breakpoints.only('md')]: { pt: '5%' } }}>
                <IconButton
                  sx={{ [theme.breakpoints.only('md')]: {} }}
                  onClick={e => {
                    handleClick(
                      e,
                      ['Configurações', 'Ajuda e suporte', 'Dar feedback'],
                      [
                        <Settings key={0} />,
                        <Help key={1} />,
                        <Feedback key={2} />
                      ],
                      [() => {}, handleHelp, handleFeedback],
                      true
                    )
                  }}
                >
                  <Avatar
                    sx={{
                      background: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
                      color: 'grey.400',
                      [theme.breakpoints.only('md')]: {
                        height: '2.5rem',
                        width: '2.5rem'
                      }
                    }}
                  >
                    <UserAvatar
                      user={user}
                      onClick={() => {}}
                      sx={{
                        borderRadius: '50%',
                        height: '100%',
                        width: '100%'
                      }}
                    />
                  </Avatar>
                </IconButton>
              </Box>
              <CustomMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                {menuContent}
              </CustomMenu>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        open={modalOpen}
        onClose={handleModalClose}
      >
        <FeedbackForm
          handleSubmit={(e: FormEvent<HTMLFormElement>) => {
            handleSubmit(e)
          }}
        />
      </Modal>
      <UNetworkModal
        title="FAQ"
        handleClose={handleUnetworkModalClose}
        open={unetworkModalOpen}
      >
        <Box component="span">Perguntas Feitas Frequentemente (FAQ)</Box>
        <br />
        <br />
        <Box component="span" fontWeight={600}>
          O que é a UNetwork?
        </Box>
        <br />
        R: A UNetwork é uma rede social que permite aos usuários criar perfis,
        compartilhar conteúdo e se conectar com outros usuários. Oferecemos
        diversas funcionalidades, como postagens de fotos e vídeos, mensagens
        privadas e grupos de discussão. Nosso objetivo é fornecer uma plataforma
        segura e amigável para que os usuários possam se conectar e compartilhar
        suas experiências.
        <br />
        <br />
        <Box component="span" fontWeight={600}>
          Como faço para denunciar um conteúdo ou usário abusivo?
        </Box>
        <br />
        R: Basta clicar nos três pontinhos do determinado usuário ou post e
        então clicar em "Denunciar".
        <br />
        <br />
        <Box component="span" fontWeight={600}>
          Como faço para enviar uma sugestão ou feedback ou reportar algum bug?
        </Box>
        <br />
        R: Abra o menu do usuário clicando na sua foto de perfil no canto
        superior direito e depois clique na opção "Dar feedback".
        <br />
        <br />
        <Box component="span" fontWeight={600}>
          Caso eu esqueça minha senha, como posso redefini-la?
        </Box>
        <br />
        R: Vá até a página de "Login" e clique na opção "Esqueceu sua senha?",
        presente no canto inferior direito do formulário. Um email será enviado
        para o endereço de e-mail informado. Siga as instruções para redefinir
        sua senha.
        <br />
        <br />
        <Box component="span" fontWeight={600}>
          Como posso confiugrar minhas preferências de privacidade?
        </Box>
        <br />
        R: Clique na sua foto de perfil no canto superior direito do cabçalho da
        aplicação e vá em "Configurações". Depois ative a configuração "Conta
        privada."
        <br />
        <br />
        <Box component="span" fontWeight={600}>
          Como posso deletar minha conta?
        </Box>
        <br />
        R: Clique na sua foto de perfil no canto superior direito do cabçalho da
        aplicação e vá em "Configurações". A última opção "Delete minha conta",
        em vermelho, irá deletar sua conta.
        <br />
        <br />
        <Box component="span" fontWeight={600}>
          Como posso obter notificaçãoes sobre novos posts ou atualizações?
        </Box>
        <br />
        R: Basta seguir o usuário ou a classe que compartilha aquele tipo de
        conteúdo e então novas notificações chegarão para você toda vez que algo
        de novo for postado.
        <br />
        <br />
        <Box component="span" fontWeight={600}>
          Como posso bloquear ou desbloquear outros usuários?
        </Box>
        <br />
        R: Vá na página "Chat". Clique na foto de perfil do usuário no qual você
        queira bloquear/desbloquear e clique na opção "Bloquear" ou
        "Desbloquear".
        <br />
        <br />
      </UNetworkModal>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Feedback enviado!"
        autoHideDuration={3000}
        action={action}
      />

      {/* Notifications Popover */}
      <Popover
        open={notificationOpen}
        anchorEl={notificationAnchor}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          sx: {
            width: { xs: 320, sm: 380 },
            maxHeight: 480,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: 'divider',
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)'
              : 'linear-gradient(135deg, #311b92 0%, #4a148c 100%)'
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Notifications sx={{ color: 'white', fontSize: 22 }} />
            <Typography sx={{ fontWeight: 700, color: 'white' }}>
              Notificacoes
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={unreadCount}
                size="small"
                sx={{
                  height: 22,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}
              />
            )}
          </Box>
          {notifications.length > 0 && (
            <IconButton
              size="small"
              onClick={markAllAsRead}
              sx={{
                color: 'rgba(255,255,255,0.8)',
                '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
              title="Marcar todas como lidas"
            >
              <DoneAll fontSize="small" />
            </IconButton>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ maxHeight: 360, overflow: 'auto' }}>
          {notifications.length === 0 ? (
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <NotificationsOff sx={{ fontSize: 32, color: theme.palette.mode === 'dark' ? 'primary.main' : 'grey.400', opacity: 0.6 }} />
              </Box>
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                Nenhuma notificacao
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Voce esta em dia!
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => (
              <Box
                key={notification.id}
                onClick={() => {
                  markAsRead(notification.id)
                  if (notification.link) {
                    navigate(notification.link)
                    handleNotificationClose()
                  }
                }}
                sx={{
                  p: 2,
                  display: 'flex',
                  gap: 1.5,
                  cursor: 'pointer',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.selected'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={notification.avatar}
                    sx={{
                      width: 44,
                      height: 44,
                      bgcolor: 'primary.main'
                    }}
                  >
                    {notification.title[0]}
                  </Avatar>
                  {!notification.read && (
                    <Circle
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        fontSize: 12,
                        color: 'primary.main'
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: notification.read ? 500 : 700,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Chip
                      label={getNotificationIcon(notification.type)}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : 'grey.100',
                        color: 'text.secondary'
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.4,
                      mb: 0.5
                    }}
                  >
                    {notification.description}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {formatNotificationTime(notification.createdAt)}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeNotification(notification.id)
                  }}
                  sx={{
                    opacity: 0.5,
                    '&:hover': { opacity: 1, color: 'error.main' }
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))
          )}
        </Box>
      </Popover>
    </>
  )
}
