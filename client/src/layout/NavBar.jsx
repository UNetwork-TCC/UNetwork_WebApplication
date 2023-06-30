import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Box, IconButton, Menu, Typography } from '@mui/material'

import {
    AccountCircle,
    MenuBook,
    Chat,
    Bookmark,
    Groups,
    Newspaper,
    Close,
} from '@mui/icons-material'

export default function NavBar({ buttonStyle, navStyle }) {

    const notStylized = {
        width:'100%',
        borderRadius: '20px',
        mb: '7vh',
        pr:'0',
        ':hover': {
            borderRadius: '20px 0 0 20px',
        }
    }
    const textButtons = {
        fontSize: '18px',
        ml: '10px',
        pr: '70px',        
    }

    const Stylized = {
        width:'100%',
        borderRadius: '20px 0 0 20px',
        bgcolor: '#673AB7',
        color: 'white',
        
        pr:'0',
        mb: '7vh',
        ':hover': {
            borderRadius: '20px 0 0 20px',
            bgcolor: '#673AB7',
            color: 'white',    
        }
    }

    const navigate = useNavigate()
    
    navStyle = 'sideBar'
    return (

        <Box height={'90vh'} width={'20vw'} sx={{ display: 'flex', flexDirection: 'column', mt: '3vh', }}>
            <Box display={'flex'} sx={{ width: '170px', mt: '10px', height: '75px', bgcolor: 'white', borderRadius: '0 10px 10px 0px', mb: '2vh' }}>
                <Box sx={{ bgcolor: '#673AB7', width: '60px', borderRadius: '0 8px 8px 0px', m: '5px 0', }}>
                    <IconButton size='small'>
                        <AccountCircle sx={{ fontSize: '60px', color: 'white', position: 'absolute', left: '15px', top: '-7.5px', margin: '0' }} />
                    </IconButton>
                </Box>
                <Box sx={{ width: '120px', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    {navStyle && <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>USERNAME</Typography>}
                    {navStyle && <Typography sx={{ fontSize: '10px' }}>Estudante</Typography>}
                    {navStyle && <Typography sx={{ fontSize: '10px' }}>X Conexões</Typography>}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '10px', height: '60vh', width: '20vw', ml: '4.5%',}}>
                <Box sx={{width:'95.5%'}}>
                    <IconButton onClick={() => navigate('/materials')} sx={buttonStyle !== 'Materials' ? (notStylized) : (Stylized)} >
                        <MenuBook fontSize='large' />
                        {navStyle && <Typography sx={textButtons}>Materiais</Typography>}
                    </IconButton>
                </Box>
                <Box sx={{width:'95.5%'}}>
                    <IconButton onClick={() => navigate('/Chat')} sx={buttonStyle !== 'Chat' ? (notStylized) : (Stylized)}>
                        <Chat fontSize='large' />
                        {navStyle && <Typography sx={textButtons}>Conversas</Typography>}
                    </IconButton>
                </Box>
                <Box sx={{width:'95.5%'}}>
                    <IconButton onClick={() => navigate('/Classes')} className='Classes' sx={buttonStyle !== 'Classes' ? (notStylized) : (Stylized)}>
                        <Groups fontSize='large' />
                        {navStyle && <Typography sx={textButtons}>Classes</Typography>}
                    </IconButton>
                </Box>
                <Box sx={{width:'95.5%'}}>
                    <IconButton onClick={() => navigate('/Favorites')} sx={buttonStyle !== 'Favorites' ? (notStylized) : (Stylized)}>
                        <Bookmark fontSize='large' />
                        {navStyle && <Typography sx={textButtons}>Favoritos</Typography>}
                    </IconButton>
                </Box>
                <Box sx={{width:'95.5%'}}>
                    <IconButton onClick={() => navigate('/News')} sx={buttonStyle !== 'News' ? (notStylized) : (Stylized)}>
                        <Newspaper fontSize='large' />
                        {navStyle && <Typography sx={textButtons}>Notícias</Typography>}
                    </IconButton>
                </Box>
                <Box sx={{width:'95.5%'}}>
                    <IconButton sx={{pl: '20px', borderRadius: '20px' }} onClick={() => navStyle = 'false'} >
                        <Close fontSize='large' />
                    </IconButton>
                </Box>
                
            </Box>

        </Box>

    )
}
