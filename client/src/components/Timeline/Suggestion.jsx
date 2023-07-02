import { AccountCircle, Favorite, PhotoLibrary } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

export default function Suggestion({username}) {
    return (
        <Box display={'flex'} sx={{ width: '90%', height: '75px', bgcolor: 'white', borderRadius: '0 10px 10px 0px', mb: '2vh', }}>
            <Box sx={{ bgcolor: '#673AB7', width: '17.5%', borderRadius: '0 8px 8px 0px', m: '5px 0', }}>
                <IconButton size='small'>
                    <AccountCircle sx={{ fontSize: '60px', color: 'white', position: 'absolute', left: '15px', top: '-6px', margin: '0',  }} />
                </IconButton>
            </Box>
            <Box sx={{ width: '37.5%', display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
                <Box sx={{ width: '80%', ml: '25%'}}>
                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>{username}</Typography>
                    <Typography sx={{ fontSize: '10px' }}>Série</Typography>
                    <Typography sx={{ fontSize: '10px' }}>X Conexões</Typography>
                </Box>
            </Box>

            <Box sx={{ width: '45%', height:'100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <Box sx={{display:'flex',}}>
                    <Box sx={{ display: 'flex' }}>
                        <Favorite sx={{ fontSize: '15px', ml:'5px', color:'red'}} />
                        <Typography sx={{ fontSize: '10px', color: 'rgba(0,0,0,0.54)', ml:'5px' }}>X Likes</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <PhotoLibrary sx={{ fontSize: '15px', ml:'10px', color:'rgba(0,0,255,.70)'}} />
                        <Typography sx={{ fontSize: '10px', color: 'rgba(0,0,0,0.54)', ml:'5px' }}>X Posts</Typography>
                    </Box>
                </Box>
                <Typography sx={{ width:'90%',bgcolor:'#673AB7',color:'white', textAlign:'center' , textTransform: 'uppercase', fontSize: '8px', border: '1px solid #673AB7', borderRadius: '30px', padding:'0 5px', m:'10% 5% 0 5%', ':hover':{cursor:'pointer'}}}>Ver Perfil</Typography>
            </Box>
        </Box>

    )
}
