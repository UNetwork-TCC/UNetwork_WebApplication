import { Avatar, Box, Button, Divider, IconButton, MenuItem, Modal, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Chat, ChatArea, Contact, ContactsArea } from '$components'
import { CustomInput, AppLayout, CustomMenu } from '$layout'
import { Add, Search, VideocamOutlined, LocalPhone, Settings, AccountBox, FmdGood, Block, Report } from '@mui/icons-material'
import { type ReactElement, useState } from 'react'
import { type contact } from '$types'

export default function ChatPage(): ReactElement {

    const theme = useTheme()

    const onClickEvents = {
        item1: () => {
            console.log('oi')
            handleClose()
        },

        item2: () => {
            console.log('tcchau')
            handleClose()
        }
    }

    const [ open, setOpen ] = useState(false)

    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [ Contacts, setContacts ] = useState<contact[]>([])
    const [ ContactsAttributes, setContactsAttributes ] = useState<contact>({ name: '', code: '', date: '', notification: '' })

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const createContacts = (): void => {
        // ...

        if (ContactsAttributes.name) {
            setContacts([
                ...Contacts,
                ContactsAttributes
            ])
            handleClose()
        }
        else alert('preencha todos os campos!')
    }

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

    return (
        <AppLayout withSidebars>
            <Box sx={{ width: '100%', height: '100%', display: 'flex' }} >
                <ContactsArea>
                    <Box sx={{ width: '100%', height: '17%' }}>
                        <Stack gap={2} sx={{ position: 'sticky', top: '0' }}>
                            <Box display={'flex'} sx={{ alignItems: 'center', ml: '5%' }}>
                                <Box sx={{ width: '70%' }}>
                                    <Typography variant='h4' sx={{}}>Conversas</Typography>
                                </Box>
                                <Box sx={{ width: '25%', display: 'flex', justifyContent: 'space-between' }}>
                                    <IconButton onClick={handleOpen}>
                                        <Add />
                                    </IconButton>
                                    <IconButton>
                                        <Settings />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{}}>
                                <CustomInput
                                    width='95%'
                                    bgcolor={theme.palette.mode === 'light' ? 'white' : undefined}
                                    color='#673AB7'
                                    iconColor={'white'}
                                    placeholder='Procurar...'
                                    icon={<Search />}
                                    sx={{ ml: '5%' }}
                                />
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{
                        width: '100%', height: '87%',
                        overflow: 'scroll',
                        '::-webkit-scrollbar': { display: 'none' }
                    }}>
                        <Stack gap={1} sx={{ mt: '2%', width: '100%', height: '100%' }}>
                            <Contact notification={8} date={'19:45'} user={{ name: 'Alfa' }} />
                            <Contact notification={6} date={'3 Dias'} user={{ name: 'Leonardo' }} />
                            <Contact notification={3} date={'1 Ano'} user={{ name: 'Torugo' }} />
                            <Contact date={'3 Dias'} user={{ name: 'Guilherme Lima' }} />
                            <Contact notification={1} date={'3 Dias'} user={{ name: 'Elizabeth' }} />
                            <Contact notification={14} date={'3 Dias'} user={{ name: 'Jhow' }} />
                            <Contact notification={56} date={'3 Dias'} user={{ name: 'Luizinho' }} />
                            <Contact notification={99} date={'3 Dias'} user={{ name: 'Paulo Rogério de Neves Oliveira' }} /> {/* "+99" medo */}
                            <Contact notification={7} date={'3 Dias'} user={{ name: 'Rian' }} />
                            <Contact notification={1} date={'3 Dias'} user={{ name: 'Vitor Santos' }} />
                            <Contact notification={3} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            <Contact notification={2} date={'2h'} user={{ name: 'Paulin' }} />
                            <Contact notification={3} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            <Contact notification={3} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            <Contact notification={3} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            {Contacts.map(e => (
                                <Contact user={{ name: e.name }} key={e.name} />
                            ))}
                        </Stack>
                    </Box>
                </ContactsArea>
                <Divider orientation='vertical' role="presentation" flexItem sx={{ height: '100%' }} />
                <ChatArea>
                    <Box sx={{ width: '100%', height: '11%', display: 'flex', alignItems: 'center', p: '0 3%', pb: '4%' }}>
                        <Avatar variant='rounded' sx={{ borderRadius: 5, height: '3.5rem', width: '3.5rem' }}>

                        </Avatar>
                        <Box sx={{ width: '75%', maxWidth: '75%' }}>
                            <Typography noWrap sx={{ fontSize: '1.5rem', ml: '2%' }} >Username</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '25%' }} gap={3}>
                            <IconButton sx={{}}>
                                <VideocamOutlined sx={{ fontSize: '2.25rem', color: 'gray' }} />
                            </IconButton>
                            <IconButton sx={{}}>
                                <LocalPhone sx={{ fontSize: '1.75rem', color: 'gray' }} />
                            </IconButton>
                            <IconButton sx={{}} 
                                onClick={
                                    e => { handleClick(e, 
                                        [ 'Ver Contato', 'Pesquisar', 'Fixar', 'Limpar conversa', 'Denunciar', 'Bloquear' ],
                                        [ onClickEvents.item1, onClickEvents.item2 ],
                                        [ <AccountBox key={null}/>,<Search key={null}/>, <FmdGood key={null}/>, null ,<Report key={null}/>, <Block key={null}/> ]
                                                                    
                                    ) }
                                }
                            >
                                <Settings sx={{ fontSize: '2rem', color: 'gray' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider flexItem />
                    <Box sx={{ width: '100%', height: '78%', display: 'flex', alignItems: 'center' }}>

                    </Box>
                    <Divider flexItem sx={{}} />
                    <Box sx={{ width: '100%', height: '10%', display: 'flex', pt: '2%' }}>
                        <Chat chatClass={{ name: 'A' }} />
                    </Box>
                    <CustomMenu
                        anchorEl={anchorEl}
                        open={openCustonMenu}
                        onClose={handleCloseCustonMenu}
                    >
                        {menuContent}
                    </CustomMenu>
                </ChatArea>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disableAutoFocus
            >
                <Box p={1} sx={{ height: matches ? '45  vh' : '40vh', width: '35vw', bgcolor: 'background.paper' }} borderRadius={2} >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            Adicionar contato
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
                        <TextField
                            onChange={e => { setContactsAttributes({ ...ContactsAttributes, name: e.target.value }) }}
                            id="outline-basic"
                            label="Adicionar pelo nome"
                            value={ContactsAttributes.name}
                            fullWidth
                        />
                                               
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} >
                            <Button onClick={handleClose} variant='outlined' fullWidth>
                                Cancelar
                            </Button>
                            <Button onClick={createContacts} variant='outlined' fullWidth>
                                Criar
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Modal>

        </AppLayout>
    )
}
