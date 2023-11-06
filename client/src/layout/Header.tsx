/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */

import { Avatar, Badge, Box, Divider, IconButton, MenuItem, Modal, Snackbar, Typography } from '@mui/material'
import logo from '$assets/img/Logo.png'
import lightLogo from '$assets/img/LightLogo.png'
import { Search, FilterNone, Close, Minimize, Notifications, Settings, Help, Feedback, ExitToApp, DarkMode, LightMode, CloseSharp } from '@mui/icons-material'
import { CustomLink, CustomInput, CustomMenu, UNetworkModal } from '$layout'
import { useNavigate } from 'react-router-dom'
import { type ReactElement, useState, useContext, type FormEvent } from 'react'
import { themeContext } from '$contexts'
import { darkTheme, lightTheme } from '$themes'
import { FeedbackForm } from '$components'

export default function Header({ 
    minimize,
    maximize,
    close 
} : {
    minimize: () => void,
    maximize: () => void,
    close: () => void,
}) : ReactElement {
    const navigate = useNavigate()
    const { theme, setTheme } = useContext(themeContext)

    const [ anchorEl, setAnchorEl ]  = useState(null)
    const [ menuContent, setMenuContent ]  = useState<React.ReactNode[]>([])
    const open = Boolean(anchorEl)

    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const [ snackbarOpen, setSnackbarOpen ] = useState<boolean>(false)
    const [ unetworkModalOpen, setUnetworkModalOpen ] = useState<boolean>(false)

    const handleModalOpen = (): void => { setModalOpen(true) }
    const handleModalClose = (): void => { setModalOpen(false) }

    const handleUnetworkModalOpen = (): void => { setUnetworkModalOpen(true) }
    const handleUnetworkModalClose = (): void => { setUnetworkModalOpen(false) }

    const handleSnackbarOpen = (): void => { setSnackbarOpen(true) }
    const handleSnackbarClose = (): void => { setSnackbarOpen(false) }

    const changeTheme = (): void => {
        if (theme.palette.mode === 'light') setTheme(darkTheme)
        else setTheme(lightTheme)

        handleMenuClose()
    }

    const handleFeedback = (): void => {
        handleModalOpen()
        handleMenuClose()
    }

    const handleClick = (
        e: any,
        elements: string[],
        icons: React.ReactNode[] = [],
        onClickEvents: Array<() => void> = elements.map(() => handleMenuClose),
        userMenu: boolean = false
    ): void => {
        const mapedElements = elements.map((el, i) =>
            <MenuItem onClick={onClickEvents[i]} key={i} disableRipple>{icons && icons[i]}{el}</MenuItem>
        )
                
        if (userMenu) setMenuContent([
            <MenuItem disableRipple key={-2}>
                <Avatar sx={{ background: 'transparent' }} /> Perfil
            </MenuItem>,
            <Divider key={-1} />,
            ...mapedElements
        ]) 
        else setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)

    }
    const handleMenuClose = (): void => { setAnchorEl(null) }
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        handleModalClose()
        handleSnackbarOpen()
    }

    const handleHelp = (): void => {
        handleUnetworkModalOpen()
        handleMenuClose()
    }

    const notification = true

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
            {/* #2b2430 <--- Opção de cor */}
            <Box>
                <Box bgcolor={theme.palette.mode === 'light' ? 'white' : '#221f24'} >
                    <Box 
                        width='100%'
                        gap={2}
                        p={1}
                        position='relative'
                        mb={-4}
                        top={2}
                        zIndex={1}
                        display='flex'
                        justifyContent='end'
                        alignItems='center'
                    >
                        <Minimize onClick={minimize} sx={{ height: '15px', width: '15px', cursor: 'pointer', ':hover': { color: 'text.secondary' } }} />
                        <FilterNone onClick={maximize} sx={{ height: '15px', width: '15px', cursor: 'pointer', ':hover': { color: 'text.secondary' } }} />
                        <Close onClick={close} sx={{ height: '15px', width: '15px', cursor: 'pointer', ':hover': { color: 'text.secondary' } }} />
                    </Box>
                    <Box p='1.5rem' display='flex' justifyContent='space-around' alignItems='center' >
                        <Box onClick={() => { navigate('/app') }} sx={{ cursor: 'pointer' }} display='flex' justifyContent='center' alignItems='center'>
                            <img height={50} width={50} src={ theme.palette.mode === 'light' ? logo : lightLogo}></img>
                            <Typography ml={1}>UNetwork</Typography>
                        </Box>
                        <Box display='flex' width='33%'>
                            <CustomInput
                                width='100%'
                                placeholder='Pesquise...'
                                icon={<Search />}
                            />
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center' height='100%' gap={5}>
                            <CustomLink to='/app/forum' name='Fóruns' />
                            <CustomLink to='/app/classes' name='Classes' />
                            <CustomLink to='/app/materials' name='Materiais' />
                            <CustomLink to='/app/news' name='Notícias' />
                        </Box>
                        <Box gap={3} display='flex'>
                            <Box> {
                                notification ?
                                    <Badge badgeContent='+99' color='primary'>
                                        <IconButton onClick={e => { handleClick(e, [ 'Message1', 'Message2' ]) }}>
                                            <Avatar>
                                                <Notifications />
                                            </Avatar>
                                        </IconButton>
                                    </Badge>    
                                    :
                                    <IconButton onClick={e => { handleClick(e, [ 'Message1', 'Message2' ]) }}>
                                        <Avatar>
                                            <Notifications />
                                        </Avatar>
                                    </IconButton>
                            }
                                
                            </Box>
                            <IconButton onClick={e => { handleClick(e, 
                                [ 'Configurações', 'Ajuda e suporte', 'Dar feedback', theme.palette.mode === 'light' ? 'Tema Escuro' : 'Tema Claro', 'Sair' ],
                                [ 
                                    <Settings key={0} />,
                                    <Help key={1} />,
                                    <Feedback key={2} />,
                                    theme.palette.mode === 'light' ? <DarkMode key={3} /> : <LightMode key={4} />,
                                    <ExitToApp key={5} /> 
                                ],
                                [   () => {},
                                    handleHelp,
                                    handleFeedback,
                                    changeTheme,
                                    () => { handleMenuClose(); close() } 
                                ],
                                true
                            ) }}>
                                <Avatar sx={{ background: 'white', color: 'grey.400' }} />
                            </IconButton>
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
                <FeedbackForm handleSubmit={(e: FormEvent<HTMLFormElement>) => { handleSubmit(e) }} />
            </Modal>
            <UNetworkModal
                title='FAQ'
                handleClose={handleUnetworkModalClose}
                open={unetworkModalOpen}
            >
                <Box component='span'>Perguntas Feitas Frequentemente (FAQ)</Box><br /><br />
                <Box component='span' fontWeight={600}>O que é a UNetwork?</Box><br />R: A UNetwork é uma rede social que permite aos usuários criar perfis, compartilhar conteúdo e se conectar com outros usuários. Oferecemos diversas funcionalidades, como postagens de fotos e vídeos, mensagens privadas e grupos de discussão. Nosso objetivo é fornecer uma plataforma segura e amigável para que os usuários possam se conectar e compartilhar suas experiências.<br /><br />
                <Box component='span' fontWeight={600}>Como faço para denunciar um conteúdo ou usário abusivo?</Box><br />R: Basta clicar nos três pontinhos do determinado usuário ou post e então clicar em "Denunciar".<br /><br />
                <Box component='span' fontWeight={600}>Como faço para enviar uma sugestão ou feedback?</Box><br />R: Abra o menu do usuário clicando na sua foto de perfil no canto superior direito e depois clique na opção "Dar feedback".<br /><br />
            </UNetworkModal>
            <Snackbar 
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message='Feedback enviado!'
                autoHideDuration={3000}
                action={action}
            />
        </>
    )
}
