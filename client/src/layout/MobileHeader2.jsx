import { Box, Divider, IconButton, Typography, Container, InputBase } from '@mui/material'
import React, { useState } from 'react'
import Logo from '../assets/img/Logo.png'
import { Chat } from '../components'
import ForumIcon from '@mui/icons-material/Forum'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

export default function MobileHeader2() {
    const icon = {
        marginRight: '10px',
    }

    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    return (
        <Box sx={{ width: '100vw', height: '9vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '0px 30px' }} >
            <Box display={'flex'} alignItems={'center'} sx={{}} onClick={() => navigate('/')}>
                <img width={50} height={50} src={Logo} alt="Logo" />
                <Typography sx={{ fontSize: '25px', fontWeight: '600' }}>Social</Typography>
            </Box>
            {/* Search */}
            
            <Box sx={{ display: 'flex', }} alignItems={'center'}>
                <IconButton sx={icon}>
                    <SearchIcon fontSize='small' />
                </IconButton>
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
            </Box>
        </Box>
    )
}

