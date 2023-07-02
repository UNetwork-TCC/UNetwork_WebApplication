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
        <Box sx={{ width: '100vw', height: '9vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '0px 30px' }} >
            <Box display={'flex'} alignItems={'center'} sx={{}} onClick={() => navigate('/timeline')}>
                <img width={50} height={50} src={Logo} alt="Logo" />
                <Typography sx={{ fontSize: '25px', fontWeight: '600' }}>Social</Typography>
            </Box>
            {/* Search */}
            <Box>
                <Container sx={{ display: 'flex', position: 'relative' }}>
                    <Box
                        component="form"
                        sx={{ p: '0 0 0 6px', display: 'flex', alignItems: 'center', width: 600, border: '1px gray solid', borderRadius: '20px' }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Pesquise..."
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />

                        <IconButton color="primary" sx={{ p: '10px', ml: '5px', bgcolor: '#673AB7', borderRadius: '0 20px 20px 0', color: 'white', ':hover': { bgcolor: '#A020F0' } }} aria-label="SendButton" size='small'>
                            <SearchIcon fontSize='small' />
                        </IconButton>
                    </Box>
                </Container>
            </Box>



            <Box sx={{ display: 'flex' }} alignItems={'center'}>
                <IconButton sx={icon}>
                    <ForumIcon />
                </IconButton>
                <IconButton sx={icon}>
                    <NotificationsIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem variant="middle" />
                <IconButton>
                    <AccountCircleIcon />
                </IconButton>
                <Typography sx={{ fontSize: '10px' }}>USERNAME</Typography>
            </Box>
        </Box>
    )
}

