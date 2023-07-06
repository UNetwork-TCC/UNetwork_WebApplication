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
        borderRadius: '35px 0 0 35px',
        mb: '4vh',
        p: '20px 0',
        pl: '2.1vh',
        display: 'flex',
        color:'#979797',
        ':hover': {
            borderRadius: '20px 0 0 20px',
            color:'#979797',
            cursor:'pointer',
        }
    }
    const textButtons = {
        fontSize: '3.1vh',
        ml: '1.6vh',
        
        
    }

    const Stylized = {
        width: '90%',
        borderRadius: '35px 0 0 35px',
        bgcolor: '#673AB7',
        color: 'white',
        display: 'flex',
        p: '20px 0',
        pl: '2.1vh',
        color:'white',
        mb: '4vh',
        ':hover': {
            borderRadius: '35px 0 0 35px',
            bgcolor: '#673AB7',
            color: 'white',
            cursor:'pointer',
        }
    }

    const navigate = useNavigate()

    navStyle = 'sideBar'
    return (

        <Box height={'100%'} width={'18vw'} sx={{ mt: '3vh'}}>
            <Box display={'flex'} sx={{ width: '25.6vh', height: '10.1vh', bgcolor: 'white', borderRadius: '0 10px 10px 0px', mb: '3vh', }}>
                <Box sx={{ bgcolor: '#673AB7', width: '90px', borderRadius: '0 8px 8px 0px', m: '5px 0', }}>
                    <IconButton size='small'>
                        <AccountCircle sx={{ fontSize: '9.1vh', color: 'white', position: 'absolute', left: '35px', top: '-8px', margin: '0' }} />
                    </IconButton>
                </Box>
                <Box sx={{ width: '180px', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    {navStyle && <Typography sx={{ fontSize: '1.6vh', fontWeight: 'bold' }}>USERNAME</Typography>}
                    {navStyle && <Typography sx={{ fontSize: '1.6vh' }}>Estudante</Typography>}
                    {navStyle && <Typography sx={{ fontSize: '1.6vh' }}>X Conexões</Typography>}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '10px', height: '60vh', width: '20vw', ml: '4.5%', }}>
                <Box sx={{ width: '95.5%',}}>
                    <Box onClick={() => navigate('/materials')} sx={buttonStyle !== 'Materials' ? (notStylized) : (Stylized)} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MenuBook sx={{fontSize:'5vh'}} />
                            {navStyle && <Typography sx={textButtons}>Materiais</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/Chat')} sx={buttonStyle !== 'Chat' ? (notStylized) : (Stylized)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chat sx={{fontSize:'5vh'}} />
                            </Box>
                            {navStyle && <Typography sx={textButtons}>Conversas</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/Classes')} className='Classes' sx={buttonStyle !== 'Classes' ? (notStylized) : (Stylized)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Groups sx={{fontSize:'5vh'}} />
                            {navStyle && <Typography sx={textButtons}>Classes</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/Favorites')} sx={buttonStyle !== 'Favorites' ? (notStylized) : (Stylized)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Bookmark sx={{fontSize:'5vh'}} />
                            {navStyle && <Typography sx={textButtons}>Favoritos</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/News')} sx={buttonStyle !== 'News' ? (notStylized) : (Stylized)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Newspaper sx={{fontSize:'5vh'}} />
                            {navStyle && <Typography sx={textButtons}>Notícias</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box sx={{ pl: '20px', borderRadius: '20px', color:'#979797' }} onClick={() => navStyle = 'false'} >
                        <Close sx={{fontSize:'5.0vh'}} />
                    </Box>
                </Box>

            </Box>

        </Box>

    )
}
