import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ChatIcon from '@mui/icons-material/Chat'
import GroupsIcon from '@mui/icons-material/Groups'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'



export default function NavBar() {
    return (
        <Box height={'100vh'} width={'200px'} sx={{ display: 'flex', flexDirection: 'column'}}>
            <Box display={'flex'} sx={{ width: '170px', mt: '10px', height: '70px', bgcolor:'white', borderRadius:'0 10px 10px 0px'}}>
                <Box sx={{ bgcolor: 'purple', width: '60px', borderRadius:'0 10px 10px 0px', m:'5px 0' }}>
                    <IconButton sx={{ position: 'absolute', left:'15px', top:'77.5px' }}>
                        <AccountCircleIcon sx={{fontSize:'60px', color:'white' }}/>
                    </IconButton>
                </Box>
                <Box sx={{ width: '120px', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>USERNAME</Typography>
                    <Typography sx={{ fontSize: '10px' }}>Estudante</Typography>
                    <Typography sx={{ fontSize: '10px' }}>X Conexões</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '60vh', mt:'20px', ml:'20px'}}>
                <Box>
                    <IconButton>
                        <MenuBookIcon fontSize='large' />
                        <Typography sx={{ fontSize: '18px', m: '5px' }}>Materiais</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton>
                        <ChatIcon fontSize='large' />
                        <Typography sx={{ fontSize: '18px', m: '5px' }}>Conversas</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton>
                        <GroupsIcon fontSize='large' />
                        <Typography sx={{ fontSize: '18px', m: '5px' }}>Classes</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton>
                        <BookmarkIcon fontSize='large' />
                        <Typography sx={{ fontSize: '18px', m: '5px' }}>Favoritos</Typography>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton>
                        <NewspaperIcon fontSize='large' />
                        <Typography sx={{ fontSize: '18px', m: '5px' }}>Notícias</Typography>
                    </IconButton>
                </Box>
                
            </Box>
                <Box sx={{mt:'20px', ml:'20px'}}>
                    <IconButton>
                        <ClearOutlinedIcon fontSize='large' />
                    </IconButton>
                </Box>
        </Box>
    )
}
