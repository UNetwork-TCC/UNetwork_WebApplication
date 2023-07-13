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
    
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    return (
        <Box sx={{ width: '100vw', height: '10vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '0 4vh' }} >
            <Box display={'flex'} alignItems={'center'} sx={{}} onClick={() => navigate('/timeline')}>
                <img style={{ width: '8.1vh', height: '8.1vh', }} src={Logo} alt="Logo" />
                <Typography sx={{ fontSize: '4.1vh', fontWeight: '600', }}>Social</Typography>
            </Box>
            {/* Search */}

            <Box sx={{ display: 'flex', }}>
                <Box
                    component="form"
                    sx={{ p: '0 0 0 .7vh', display: 'flex', alignItems: 'center', width: '100vh', height: '4.55vh', border: '.2vh gray solid', borderRadius: '2.1vh' }}
                >
                    <InputBase
                        sx={{ ml: '2vh', flex: 1, fontSize: '3.1vh' }}
                        placeholder="Pesquise..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />

                    <Box sx={{ ml: '1vh', width: '5vh', height: '100%', bgcolor: '#673AB7', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0 2.1vh 2.1vh 0', color: 'white', ':hover': { bgcolor: '#A020F0' } }} aria-label="SendButton">
                        <SearchIcon sx={{ fontSize: '2.9vh' }} />
                    </Box>
                </Box>
            </Box>




            <Box sx={{ display: 'flex', }} alignItems={'center'}>

                <ForumIcon sx={{ fontSize: '3.6vh',  mr: '2.1vh', color:'gray'}} />

                <NotificationsIcon sx={{ fontSize: '3.6vh', mr: '2.1vh',color:'gray'}} />

                <Divider orientation="vertical" flexItem variant="middle" sx={{ mr: '2.1vh' }} />

                <AccountCircleIcon sx={{ fontSize: '5.1vh', mr: '1vh', color:'gray'}} />

                <Typography sx={{ fontSize: '1.6vh' }}>USERNAME</Typography>
            </Box>
        </Box>
    )
}

