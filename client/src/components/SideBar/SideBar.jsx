import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'

import {
    AccountCircle,
    MenuBook,
    Chat,
    Bookmark,
    Groups,
    Newspaper,
    Menu,
    BorderBottom,
} from '@mui/icons-material'
import { NavBar } from '../../layout'

export default function SideBar({ buttonStyle }) {

    const navType = NavBar.navType

    const notStylized = {
        borderRadius: '20px',
        mb:'5vh',
        ml:'5px',
    }

    const Stylized = {
        borderRadius: '40px 40px 40px 40px',
        bgcolor: '#673AB7',
        color: 'white',
        mb:'6vh',
        p:'11.43px 12.80px',
        ':hover': {
            borderRadius: '40px 40px 40px 40px',
            bgcolor: '#673AB7',
            color: 'white',
            mr: '0',
        }
    }

    const navigate = useNavigate()

    return (
        <Box height={'100vh'} width={'6vw'} sx={{mt:'20px'}}>        
            <Box sx={{ display: 'flex', flexDirection: 'column',  mt: '10px', width: '20vw', ml: '8px' }}>
                <Box sx={{ml:'7px', mb:'5vh', color:'rgba(0, 0, 0, 0.54)'}}>
                    <AccountCircle sx={{fontSize:'3rem'}} />
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/materials')} sx={buttonStyle !== 'Materials' ? (notStylized) : (Stylized)}>
                        <MenuBook fontSize='large' />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/Chat')} sx={buttonStyle !== 'Chat' ? (notStylized) : (Stylized)}>
                        <Chat fontSize='large' />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/Classes')} className='Classes' sx={buttonStyle !== 'Classes' ? (notStylized) : (Stylized)}>
                        <Groups fontSize='large' />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/Favorites')} sx={buttonStyle !== 'Favorites' ? (notStylized) : (Stylized)}>
                        <Bookmark fontSize='large' />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/News')} sx={buttonStyle !== 'News' ? (notStylized) : (Stylized)}>
                        <Newspaper fontSize='large' />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton sx={buttonStyle !== 'News' ? (notStylized) : (Stylized)}>
                        <Menu fontSize='large' />
                    </IconButton>
                </Box>
                

            </Box>


        </Box>
    )
}
