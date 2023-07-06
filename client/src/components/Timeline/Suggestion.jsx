import { AccountCircle, Favorite, PhotoLibrary } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

export default function Suggestion({username}) {
    return (
        <Box display={'flex'} sx={{ width: '95%', height: '10.6vh', bgcolor: 'white', borderRadius: '0 15px 15px 0px', mb: '2vh',}}>
            <Box sx={{ bgcolor: '#673AB7', width: '20%', borderRadius: '0 12px 12px 0px', m: '5px 0', }}>
                <IconButton size='small'>
                    <AccountCircle sx={{ fontSize: '9.1vh', color: 'white', position: 'absolute', left: '4.1vh', top: '-4px', margin: '0',  }} />
                </IconButton>
            </Box>
            <Box sx={{ width: '37.5%', display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
                <Box sx={{ width: '80%', ml: '30%'}}>
                    <Typography sx={{ fontSize: '1.6vh', fontWeight: 'bold' }}>{username}</Typography>
                    <Typography sx={{ fontSize: '1.6vh' }}>Série</Typography>
                    <Typography sx={{ fontSize: '1.6vh' }}>X Conexões</Typography>
                </Box>
            </Box>

            <Box sx={{ width: '45%', height:'100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <Box sx={{display:'flex',}}>
                    <Box sx={{ display: 'flex' }}>
                        <Favorite sx={{ fontSize: '2.3vh', ml:'5px', color:'red'}} />
                        <Typography sx={{ fontSize: '1.6vh', color: 'rgba(0,0,0,0.54)', ml:'5px' }}>X Likes</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <PhotoLibrary sx={{ fontSize: '2.3vh', ml:'10px', color:'rgba(0,0,255,.70)'}} />
                        <Typography sx={{ fontSize: '1.6vh', color: 'rgba(0,0,0,0.54)', ml:'5px' }}>X Posts</Typography>
                    </Box>
                </Box>
                <Typography sx={{ width:'90%',bgcolor:'#673AB7',color:'white', textAlign:'center' , textTransform: 'uppercase', fontSize: '1.3vh', border: '1px solid #673AB7', borderRadius: '30px', padding:'0 5px', m:'10% 5% 0 5%', ':hover':{cursor:'pointer'}}}>Ver Perfil</Typography>
            </Box>
        </Box>

    )
}
