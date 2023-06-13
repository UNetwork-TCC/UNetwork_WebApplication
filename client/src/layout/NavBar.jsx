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
    ClearOutlined
} from '@mui/icons-material'

export default function NavBar() {

    const notStylized ={
        pl:'20px',
        borderRadius: '30px',
    }

    const textButtons ={ 
        fontSize: '18px',
        ml: '10px',
        pr: '20px'
    }

    const navigate = useNavigate()

    return (
        <Box height={'100vh'} width={'200px'} sx={{ display: 'flex', flexDirection: 'column', mt:'3vh', }}>
            <Box display={'flex'} sx={{ width: '170px', mt: '10px', height: '75px', bgcolor: 'white', borderRadius: '0 10px 10px 0px', mb:'2vh' }}>
                <Box sx={{ bgcolor: '#673AB7', width: '60px', borderRadius: '0 8px 8px 0px', m: '5px 0', }}>
                    <IconButton size='small'>
                        <AccountCircle sx={{ fontSize: '60px', color: 'white', position: 'absolute', left: '15px', top: '-7.5px', margin:'0'}} />
                    </IconButton>
                </Box>
                <Box sx={{ width: '120px', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>USERNAME</Typography>
                    <Typography sx={{ fontSize: '10px' }}>Estudante</Typography>
                    <Typography sx={{ fontSize: '10px' }}>X Conexões</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '60vh',width:'17.5vw', mt: '20px', ml: '20px' }}>
                <Box >
                    <IconButton onClick={() => navigate('/materials')} sx={notStylized} >
                        <MenuBook fontSize='large' />
                        <Typography sx={textButtons}>Materiais</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/Chat')} sx={notStylized}>
                        <Chat fontSize='large' />
                        <Typography sx={textButtons}>Conversas</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/Classes')} className='Classes' sx={notStylized}>
                        <Groups fontSize='large' />
                        <Typography sx={textButtons}>Classes</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/Favorites')} sx={notStylized}>
                        <Bookmark fontSize='large' />
                        <Typography sx={textButtons}>Favoritos</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => navigate('/News')} sx={notStylized}>
                        <Newspaper fontSize='large' />
                        <Typography sx={textButtons}>Notícias</Typography>
                    </IconButton>
                </Box>

            </Box>
            

        </Box>
    )
}
