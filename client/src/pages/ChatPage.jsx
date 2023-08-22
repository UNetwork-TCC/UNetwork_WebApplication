import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import AppLayout from '../layout/AppLayout'
import { useTheme } from '@emotion/react'
import { Chat, ChatArea, Contact, ContactsArea } from '../components'
import CustomInput from '../layout/CustomInput'
import { Add, Search, ModeEditOutlineRounded, VideocamOutlined, LocalPhone, Settings } from '@mui/icons-material'
import ChatAreaOld from '../components/Chat/ChatAreaOld'




export default function ChatPage() {
    const theme = useTheme()



    return (
        <AppLayout withSidebars>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', }} >
                <ContactsArea>
                    <Stack gap={4} sx={{}}>
                        <Box display={'flex'} sx={{ alignItems: 'center', ml: '5%' }}>
                            <Box sx={{ width: '70%' }}>
                                <Typography variant='h4' sx={{}}>Conversas</Typography>
                            </Box>
                            <Box sx={{ width: '25%', display: 'flex', justifyContent: 'space-between' }}>
                                <IconButton>
                                    <Add />
                                </IconButton>
                                <IconButton>
                                    <ModeEditOutlineRounded />
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
                        <Stack gap={1}>
                            <Contact notification={'8'} date={'19:45'} user={{ name: 'Alfa' }} />
                            <Contact notification={'6'} date={'3 Dias'} user={{ name: 'Leonardo' }} />
                            <Contact notification={'3'} date={'1 Ano'} user={{ name: 'Torugo' }} />
                            <Contact notification={''} date={'3 Dias'} user={{ name: 'Kauê' }} />
                            <Contact notification={'1'} date={'3 Dias'} user={{ name: 'Elizabeth' }} />
                            <Contact notification={'14'} date={'3 Dias'} user={{ name: 'Jhow' }} />
                            <Contact notification={'56'} date={'3 Dias'} user={{ name: 'Luizinho' }} />
                            <Contact notification={'99'} date={'3 Dias'} user={{ name: 'Paulo Rogério de Neves Oliveira' }} /> {/* "+99" medo */}
                            <Contact notification={'7'} date={'3 Dias'} user={{ name: 'Rian' }} />
                            <Contact notification={'1'} date={'3 Dias'} user={{ name: 'Vitor Santos' }} />
                            <Contact notification={'3'} date={'3 Dias'} user={{ name: 'Pacheco' }} />


                        </Stack>
                    </Stack>
                </ContactsArea>
                <Divider orientation='vertical' role="presentation" flexItem sx={{ height: '100%', }} />
                <ChatArea>
                    <Box sx={{ width: '100%', height:'11%',display: 'flex', alignItems: 'center', p: '0 3%', pb:'4%', }}>
                        <Avatar variant='rounded' sx={{ borderRadius: 5, height: '3.5rem', width: '3.5rem' }}>

                        </Avatar>
                        <Box sx={{ width: '75%', maxWidth: '75%' }}>
                            <Typography noWrap sx={{ fontSize: '1.5rem', ml: '2%' }} >Username</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '25%', }} gap={3}>
                            <IconButton sx={{ }}>
                                <VideocamOutlined sx={{ fontSize: '2.25rem', color: 'gray' }} />
                            </IconButton>
                            <IconButton sx={{ }}>
                                <LocalPhone sx={{ fontSize: '1.75rem', color: 'gray' }} />
                            </IconButton>
                            <IconButton sx={{ }}>
                                <Settings sx={{ fontSize: '2rem', color: 'gray' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider flexItem/>
                    <Box sx={{ width:'100%', height:'78%', display:'flex', alignItems:'center' }}>

                    </Box> 
                    <Divider flexItem sx={{}}/>
                    <Box sx={{ width:'100%', height:'10%', display:'flex', pt:'2%' }}>
                        <Chat/>
                    </Box> 
                    
                </ChatArea>
            </Box>

        </AppLayout>
    )
}
