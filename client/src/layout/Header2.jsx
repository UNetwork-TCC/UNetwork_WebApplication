import { Box, Divider, IconButton, Typography, Container, InputBase } from '@mui/material'
import React, { useState } from 'react'
import Logo from '../assets/img/Logo.png'
import { Chat } from '../components'
import ForumIcon from '@mui/icons-material/Forum'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

export default function Header2() {
    const icon = {
        marginRight: '20px',
        
    }

    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    return (
        <Box sx={{ width: '100vw', height: '10vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '0px 4vh' }} >
            <Box display={'flex'} alignItems={'center'} sx={{}} onClick={() => navigate('/timeline')}>
                <img width={80} height={80} src={Logo} alt="Logo" />
                <Typography sx={{ fontSize: '4.1vh', fontWeight: '600' }}>Social</Typography>
            </Box>
            {/* Search */}
            <Box>
                <Container sx={{ display: 'flex', }}>
                    <Box
                        component="form"
                        sx={{ p: '0 0 0 6px', display: 'flex', alignItems: 'center', width: '100vh', height:'4.55vh' ,border: '1px gray solid', borderRadius: '20px' }}
                    >
                        <InputBase
                            sx={{ ml: 2, flex: 1, fontSize:'3.1vh' }}
                            placeholder="Pesquise..."
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />

                        <IconButton color="primary" sx={{ ml: '5px', bgcolor: '#673AB7', borderRadius: '0 20px 20px 0', color: 'white', ':hover': { bgcolor: '#A020F0' } }} aria-label="SendButton" size='small'>
                            <SearchIcon sx={{fontSize:'3.6vh'}} />
                        </IconButton>
                    </Box>
                </Container>
            </Box>



            <Box sx={{ display: 'flex', }} alignItems={'center'}>
                <IconButton sx={icon}>
                    <ForumIcon sx={{fontSize:'3.6vh'}}/>
                </IconButton>
                <IconButton sx={icon}>
                    <NotificationsIcon sx={{fontSize:'3.6vh'}}/>
                </IconButton>
                <Divider orientation="vertical" flexItem variant="middle" sx={{mr:'20px'}}/>
                <IconButton>
                    <AccountCircleIcon sx={{fontSize:'5.1vh'}}/>
                </IconButton>
                <Typography sx={{ fontSize: '1.6vh' }}>USERNAME</Typography>
            </Box>
        </Box>
    )
}

