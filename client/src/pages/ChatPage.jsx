import { Avatar, Box, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material'
import AppLayout from '../layout/AppLayout'
import { Chat, ChatArea, Contact, ContactsArea } from '../components'
import CustomInput from '../layout/CustomInput'
import { Add, Search, VideocamOutlined, LocalPhone, Settings } from '@mui/icons-material'
import { useState } from 'react'
import { CustomMenu } from '../layout'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'


export default function ChatPage() {

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
    
    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState(null)
    
    const open = Boolean(anchorEl)
    const [chatArr, setChatArr] = useState([])
    
    const handleClick = (e, elements, onClickEvents = elements.map(() => handleClose), icons = null) => {
        const mapedElements = elements.map((e, i) =>
            <MenuItem onClick={onClickEvents[i]} key={i} disableRipple>{icons && icons[i]}{e}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const {username} = useParams()
    const room = 'leon'
    console.log(username);
    const handleSubmit = async () => {
        const socket = await io.connect('https://studious-cod-p6x6pgr94gp27rvg-3001.app.github.dev/')
        let message = prompt('digita a mensagem truta:')
        let data = {
            message, 
            sendedAt: '', 
            sendedBy: '', 
            room}

        console.log(socket);
        socket.emit('select_room', {room, username})
        socket.emit('message', data)
        socket.on('message', data => setChatArr([...chatArr, data]))
    }


    return (
        <AppLayout withSidebars>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', }} >
                <ContactsArea>
                    <Box sx={{ width: '100%', height: '17%' }}>
                        <Stack gap={2} sx={{ position: 'sticky', top: '0', }}>
                            <Box display={'flex'} sx={{ alignItems: 'center', ml: '5%' }}>
                                <Box sx={{ width: '70%' }}>
                                    <Typography variant='h4' sx={{}}>Conversas</Typography>
                                </Box>
                                <Box sx={{ width: '25%', display: 'flex', justifyContent: 'space-between' }}>
                                    <IconButton>
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
                                    bgcolor='white'
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
                            <Contact notification={'8'} date={'19:45'} user={{ name: 'Alfa' }} />
                            <Contact notification={'6'} date={'3 Dias'} user={{ name: 'Leonardo' }} />
                            <Contact notification={'3'} date={'1 Ano'} user={{ name: 'Torugo' }} />
                            <Contact notification={''} date={'3 Dias'} user={{ name: 'Guilherme Lima' }} />
                            <Contact notification={'1'} date={'3 Dias'} user={{ name: 'Elizabeth' }} />
                            <Contact notification={'14'} date={'3 Dias'} user={{ name: 'Jhow' }} />
                            <Contact notification={'56'} date={'3 Dias'} user={{ name: 'Luizinho' }} />
                            <Contact notification={'99'} date={'3 Dias'} user={{ name: 'Paulo Rogério de Neves Oliveira' }} /> {/* "+99" medo */}
                            <Contact notification={'7'} date={'3 Dias'} user={{ name: 'Rian' }} />
                            <Contact notification={'1'} date={'3 Dias'} user={{ name: 'Vitor Santos' }} />
                            <Contact notification={'3'} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            <Contact notification={'2'} date={'2h'} user={{ name: 'Paulin' }} />
                            <Contact notification={'3'} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            <Contact notification={'3'} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            <Contact notification={'3'} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                        </Stack>
                    </Box>
                </ContactsArea>
                <Divider orientation='vertical' role="presentation" flexItem sx={{ height: '100%', }} />
                <ChatArea>
                    <Box sx={{ width: '100%', height: '11%', display: 'flex', alignItems: 'center', p: '0 3%', pb: '4%', }}>
                        <Avatar variant='rounded' sx={{ borderRadius: 5, height: '3.5rem', width: '3.5rem' }}>

                        </Avatar>
                        <Box sx={{ width: '75%', maxWidth: '75%' }}>
                            <Typography noWrap sx={{ fontSize: '1.5rem', ml: '2%' }} >Username</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '25%', }} gap={3}>
                            <IconButton sx={{}}>
                                <VideocamOutlined sx={{ fontSize: '2.25rem', color: 'gray' }} />
                            </IconButton>
                            <IconButton sx={{}}>
                                <LocalPhone sx={{ fontSize: '1.75rem', color: 'gray' }} />
                            </IconButton>
                            <IconButton sx={{}} 
                                onClick={
                                    e => handleClick(e, 
                                        [ 'Ver Contato', 'Pesquisar', 'Fixar' ,'Silenciar', 'Limpar conversa', 'Denunciar', 'Bloquear', ],
                                        [ onClickEvents.item1, onClickEvents.item2 ],
                                                                    
                                    )
                                }
                            >
                                <Settings sx={{ fontSize: '2rem', color: 'gray' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider flexItem />
                    <Box sx={{ width: '100%', height: '78%', display: 'flex', alignItems: 'center' }}>
                        {chatArr}
                    </Box>
                    <Divider flexItem sx={{}} />
                    <Box sx={{ width: '100%', height: '10%', display: 'flex', pt: '2%' }}>
                        <Chat handleSubmit={handleSubmit} />
                    </Box>
                    <CustomMenu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {menuContent}
                    </CustomMenu>
                </ChatArea>
            </Box>

        </AppLayout>
    )
}
