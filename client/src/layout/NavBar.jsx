import { useNavigate } from 'react-router-dom'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

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

export default function NavBar({ buttonStyle }) {

    const notStylized = {
        width: '100%',
        borderRadius: '35px 0 0 35px',
        mb: '2em',
        p: '1em 0',
        pl: '1.5em',
        display: 'flex',
        color: '#979797',
        ':hover': {
            color: '#979797',
            cursor: 'pointer',
        }
    }
    const textButtons = {
        fontSize: '2em',
        pl: '0.7em',
    }

    const Stylized = {
        width: '100%',
        borderRadius: '3.6vh 0 0 3.6vh',
        bgcolor: '#673AB7',
        color: 'white',
        display: 'flex',
        p: '1em 0',
        pl: '1.5em',
        color: 'white',
        mb: '2em',
        ':hover': {
            cursor: 'pointer',
        }
    }

    const notStylizedClosed = {
        borderRadius: '2.1vh',
        mb: '2.5em',
        pl: '1em',
        color: 'gray',
    }

    const StylizedClosed = {
        width: '100%',
        color: '#673AB7',
        mb: '2.5em',
        pl: '1em',
        ':hover': {
            
            cursor:'pointer'

        }
    }

    const navigate = useNavigate()

    const [navStyle, setNavStyle] = useState(true)

    return (

        <Box sx={navStyle ? { mt: '4vh', width: '12.8%', height: '100%', fontSize: '10px', } : { mt: '2.1vh', height: '100%', width: '6%', }}>
            <Box display={'flex'} sx={{ width: '100%', height: '11.5%', bgcolor: 'white', borderRadius: '0 1.1vh 1.1vh 0px', mb: '2vh', }}>
                <Box sx={navStyle ? { bgcolor: '#673AB7', width: '9em', borderRadius: '0 0.9vh 0.9vh 0px', m: '0.6vh 0', } : {}}>
                    <Box >
                        <AccountCircle sx={navStyle ? { fontSize: '8.9vh', color: 'white', position: 'absolute', left: '35px', margin: '0' } : {  mb: '2vh', color: 'rgba(0, 0, 0, 0.54)', fontSize: '9.0vh' }} />
                    </Box>
                </Box>
                {navStyle && (
                    <Box sx={{ width: '18.1vh', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', height:'100%' }}>
                        <Typography sx={{ fontSize: '1.6em', fontWeight: 'bold' }}>USERNAME</Typography>
                        <Typography sx={{ fontSize: '1.6em' }}>Estudante</Typography>
                        <Typography sx={{ fontSize: '1.6em' }}>X Conexões</Typography>
                    </Box>
                )}

            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', pl: '4.5%', }}>
                <Box sx={{ height:'70%', width:'100%', }}>
                    <Box sx={{ width: '100%' }}>
                        <Box onClick={() => navigate('/materials')} sx={navStyle ? buttonStyle !== 'Materials' ? (notStylized) : (Stylized) : buttonStyle !== 'Materials' ? (notStylizedClosed) : (StylizedClosed)} >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <MenuBook sx={navStyle ? { fontSize: '4.5em' } : { fontSize: '3em' }} />
                                {navStyle && <Typography sx={textButtons}>Materiais</Typography>}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width:'100%' }}>
                        <Box onClick={() => navigate('/chat')} sx={navStyle ? buttonStyle !== 'Chat' ? (notStylized) : (Stylized) : buttonStyle !== 'Chat' ? (notStylizedClosed) : (StylizedClosed)} >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chat sx={navStyle ? { fontSize: '4.5em' } : { fontSize: '3em' }} />
                                {navStyle && <Typography sx={textButtons}>Conversas</Typography>}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box onClick={() => navigate('/Classes')} sx={navStyle ? buttonStyle !== 'Classes' ? (notStylized) : (Stylized) : buttonStyle !== 'Classes' ? (notStylizedClosed) : (StylizedClosed)} >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Groups sx={navStyle ? { fontSize: '4.5em' } : { fontSize: '3em' }} />
                                {navStyle && <Typography sx={textButtons}>Classes</Typography>}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box onClick={() => navigate('/Favorites')} sx={navStyle ? buttonStyle !== 'Favorites' ? (notStylized) : (Stylized) : buttonStyle !== 'Favorites' ? (notStylizedClosed) : (StylizedClosed)} >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Bookmark sx={navStyle ? { fontSize: '4.5em' } : { fontSize: '3em' }} />
                                {navStyle && <Typography sx={textButtons}>Favoritos</Typography>}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box onClick={() => navigate('/News')} sx={navStyle ? buttonStyle !== 'News' ? (notStylized) : (Stylized) : buttonStyle !== 'News' ? (notStylizedClosed) : (StylizedClosed)} >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Newspaper sx={navStyle ? { fontSize: '4.5em' } : { fontSize: '3em' }} />
                                {navStyle && <Typography sx={textButtons}>Notícias</Typography>}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', height:'20%' }} >
                    <Box sx={{  borderRadius: '20px', color: '#979797', }} >
                        {navStyle === true ? (
                            <Close sx={{ fontSize: '4.2em', ml: '0.5em' }} onClick={() => setNavStyle(false)} />
                        )
                            :
                            (
                                <Menu sx={{ fontSize: '3.5em', ml: '0.2em' }} onClick={() => setNavStyle(true)} />
                            )
                        }
                    </Box>
                </Box>

            </Box>

        </Box>

    )
}
