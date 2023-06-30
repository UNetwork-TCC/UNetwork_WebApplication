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
        width: '100%',
        borderRadius: '20px',
        mb: '4vh',
        p: '10px 0',
        pl: '20px',
        display: 'flex',
        color:'#979797',
        ':hover': {
            borderRadius: '20px 0 0 20px',
            color:'#979797'
        }
    }
    const textButtons = {
        fontSize: '17px',
        ml: '10px',
        pr: '70px',
        
    }

    const Stylized = {
        width: '100%',
        borderRadius: '20px 0 0 20px',
        bgcolor: '#673AB7',
        color: 'white',
        display: 'flex',
        p: '10px 0',
        pl: '20px',
        color:'white',
        mb: '3.5vh',
        ':hover': {
            borderRadius: '20px 0 0 20px',
            bgcolor: '#673AB7',
            color: 'white',
        }
    }

    const navigate = useNavigate()

    navStyle = 'sideBar'
    return (

        <Box height={'100%'} width={'20vw'} sx={{ mt: '3vh', }}>
            <Box display={'flex'} sx={{ width: '170px', height: '75px', bgcolor: 'white', borderRadius: '0 10px 10px 0px', mb: '2vh' }}>
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

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '10px', height: '60vh', width: '20vw', ml: '4.5%', }}>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/materials')} sx={buttonStyle !== 'Materials' ? (notStylized) : (Stylized)} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MenuBook fontSize='large' />
                            {navStyle && <Typography sx={textButtons}>Materiais</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/Chat')} sx={buttonStyle !== 'Chat' ? (notStylized) : (Stylized)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chat fontSize='large' />
                            </Box>
                            {navStyle && <Typography sx={textButtons}>Conversas</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/Classes')} className='Classes' sx={buttonStyle !== 'Classes' ? (notStylized) : (Stylized)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Groups fontSize='large' />
                            {navStyle && <Typography sx={textButtons}>Classes</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/Favorites')} sx={buttonStyle !== 'Favorites' ? (notStylized) : (Stylized)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Bookmark fontSize='large' />
                            {navStyle && <Typography sx={textButtons}>Favoritos</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/News')} sx={buttonStyle !== 'News' ? (notStylized) : (Stylized)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Newspaper fontSize='large' />
                            {navStyle && <Typography sx={textButtons}>Notícias</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box sx={{ pl: '20px', borderRadius: '20px', color:'#979797' }} onClick={() => navStyle = 'false'} >
                        <Close fontSize='large' />
                    </Box>
                </Box>

            </Box>

        </Box>

    )
}
