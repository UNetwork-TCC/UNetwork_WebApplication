import React from 'react'
import { Box, IconButton, Typography, } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ChatIcon from '@mui/icons-material/Chat'
import GroupsIcon from '@mui/icons-material/Groups'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { useNavigate } from 'react-router-dom'

export default function NavBar({style}) {

    const notStylized ={
        pl:'20px',
        borderRadius: '30px',
    }
    const stylized = {

        bgcolor: '#673AB7',
        color: 'white',
        borderRadius: '30px',
        pl:'20px',
    }

    const textButtons ={ 
        fontSize: '18px',
        ml: '10px',
        pr: '20px'
    }

    function changeStyle(style) {
        if(style === 3){
            classes = document.getElementsByClassName('.classe')
            classes = sx(stylized)
        }
    }

    const navigate = useNavigate()

    return (
        <Box height={'100vh'} width={'200px'} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box display={'flex'} sx={{ width: '170px', mt: '10px', height: '70px', bgcolor: 'white', borderRadius: '0 10px 10px 0px' }}>
                <Box sx={{ bgcolor: '#673AB7', width: '60px', borderRadius: '0 10px 10px 0px', m: '5px 0' }}>
                    <IconButton sx={{ position: 'absolute', left: '15px', top: '77.5px' }}>
                        <AccountCircleIcon sx={{ fontSize: '60px', color: 'white' }} />
                    </IconButton>
                </Box>
                <Box sx={{ width: '120px', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>USERNAME</Typography>
                    <Typography sx={{ fontSize: '10px' }}>Estudante</Typography>
                    <Typography sx={{ fontSize: '10px' }}>X Conexões</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '60vh',width:'17.5vw', mt: '20px', ml: '20px' }}>
                <Box >
                    <IconButton onClick={() => navigate('/materials')} sx={notStylized} >
                        <MenuBookIcon fontSize='large' />
                        <Typography sx={textButtons}>Materiais</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/Chat')} sx={notStylized}>
                        <ChatIcon fontSize='large' />
                        <Typography sx={textButtons}>Conversas</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/Classes')} className='Classes' sx={notStylized}>
                        <GroupsIcon fontSize='large' />
                        <Typography sx={textButtons}>Classes</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/Favorites')} sx={notStylized}>
                        <BookmarkIcon fontSize='large' />
                        <Typography sx={textButtons}>Favoritos</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/News')} sx={notStylized}>
                        <NewspaperIcon fontSize='large' />
                        <Typography sx={textButtons}>Notícias</Typography>
                    </IconButton>
                </Box>

            </Box>
            <Box sx={{ mt: '20px', ml: '20px' }}>
                <IconButton>
                    <ClearOutlinedIcon fontSize='large' />
                </IconButton>
            </Box>

        </Box>
    )
}
