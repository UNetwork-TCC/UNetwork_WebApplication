import { useNavigate } from 'react-router-dom'
import { Box, Button, IconButton, Typography } from '@mui/material'

import {
    AccountCircle,
    MenuBook,
    Chat,
    Bookmark,
    Groups,
    Newspaper,
    Close,
    Menu
} from '@mui/icons-material'
import { useEffect, useState } from 'react'

export default function NavBar({ buttonStyle}) {

    const notStylized = {
        width: '100%',
        borderRadius: '35px 0 0 35px',
        mb: '4vh',
        p: '2.1vh 0',
        pl: '2.5vh',
        display: 'flex',
        color: '#979797',
        ':hover': {
            borderRadius: '20px 0 0 20px',
            color: '#979797',
            cursor: 'pointer',
        }
    }
    const textButtons = {
        fontSize: '2.8vh',
        ml: '1.6vh',
    }

    const Stylized = {
        width: '75%',
        borderRadius: '3.6vh 0 0 3.6vh',
        bgcolor: '#673AB7',
        color: 'white',
        display: 'flex',
        p: '2.1vh 0',
        pl: '2.5vh',
        color: 'white',
        mb: '4vh',
        ':hover': {
            cursor: 'pointer',
        }
    }

    const notStylizedClosed = {
        borderRadius: '2.1vh',
        mb: '7vh',
        ml: '2.5vh',
        color: 'gray',
    }

    const StylizedClosed = {
        width: '9vh',
        borderRadius: '100%',
        bgcolor: '#673AB7',
        color: 'white',
        mb: '6vh',
        p: '1.8vh 1.8vh',
        ml: '0.75vh',
        ':hover': {
            bgcolor: '#673AB7',
            color: 'white',

        }
    }

    const navigate = useNavigate()

    const [navStyle, setNavStyle] = useState(true)

    return (

        <Box sx={navStyle ? { mt: '4vh', width: '15vw', height: '100%' } : { mt: '2.1vh', height: '100%', width: '6vw' }}>
            <Box display={'flex'} sx={{ width: '25.6vh', height: '10.1vh', bgcolor: 'white', borderRadius: '0 1.1vh 1.1vh 0px', mb: '4vh', }}>
                <Box sx={navStyle ? { bgcolor: '#673AB7', width: '9.1vh', borderRadius: '0 0.9vh 0.9vh 0px', m: '0.6vh 0', } : {}}>
                    <IconButton >
                        <AccountCircle sx={navStyle ? { fontSize: '9.1vh', color: 'white', position: 'absolute', left: '3.6vh', top: '-0.6vh', margin: '0' } : { ml: '0.7vh', mb: '4vh', color: 'rgba(0, 0, 0, 0.54)', fontSize: '9.0vh' }} />
                    </IconButton>
                </Box>
                {navStyle && (
                    <Box sx={{ width: '18.1vh', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '1.6vh', fontWeight: 'bold' }}>USERNAME</Typography>
                        <Typography sx={{ fontSize: '1.6vh' }}>Estudante</Typography>
                        <Typography sx={{ fontSize: '1.6vh' }}>X Conexões</Typography>
                    </Box>
                )}

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '20px', height: '60vh', width: '20vw', ml: '4.5%', }}>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/materials')} sx={navStyle ? buttonStyle !== 'Materials' ? (notStylized) : (Stylized) : buttonStyle !== 'Materials' ? (notStylizedClosed) : (StylizedClosed)} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MenuBook sx={navStyle ? { fontSize: '4.5vh' } : { fontSize: '5.5vh' }} />
                            {navStyle && <Typography sx={textButtons}>Materiais</Typography>}
                        </Box>
                    </Box>
                    <Box onClick={() => navigate('/chat')} sx={navStyle ? buttonStyle !== 'Chat' ? (notStylized) : (Stylized) : buttonStyle !== 'Chat' ? (notStylizedClosed) : (StylizedClosed)} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Chat sx={navStyle ? { fontSize: '4.5vh' } : { fontSize: '5.5vh' }} />
                            {navStyle && <Typography sx={textButtons}>Conversas</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/Classes')} sx={navStyle ? buttonStyle !== 'Classes' ? (notStylized) : (Stylized) : buttonStyle !== 'Classes' ? (notStylizedClosed) : (StylizedClosed)} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Groups sx={navStyle ? { fontSize: '4.5vh' } : { fontSize: '5.5vh' }} />
                            {navStyle && <Typography sx={textButtons}>Classes</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/Favorites')} sx={navStyle ? buttonStyle !== 'Favorites' ? (notStylized) : (Stylized) : buttonStyle !== 'Favorites' ? (notStylizedClosed) : (StylizedClosed)} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Bookmark sx={navStyle ? { fontSize: '4.5vh' } : { fontSize: '5.5vh' }} />
                            {navStyle && <Typography sx={textButtons}>Favoritos</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }}>
                    <Box onClick={() => navigate('/News')} sx={navStyle ? buttonStyle !== 'News' ? (notStylized) : (Stylized) : buttonStyle !== 'News' ? (notStylizedClosed) : (StylizedClosed)} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Newspaper sx={navStyle ? { fontSize: '4.5vh' } : { fontSize: '5.5vh' }} />
                            {navStyle && <Typography sx={textButtons}>Notícias</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '95.5%' }} >
                    <Box sx={{ pl: '2.5vh', borderRadius: '20px', color: '#979797' }}   >
                        {navStyle === true ? (
                            <Close sx={{ fontSize: '4.2vh' }} onClick={() => setNavStyle(false)} />
                        )
                            :
                            (
                                <Menu sx={{ fontSize: '5.5vh' }} onClick={() => setNavStyle(true)} />
                            )
                        }
                    </Box>
                </Box>

            </Box>

        </Box>

    )
}
