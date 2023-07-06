import { Image } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Classes({ material, description }) {
    return (
        <Box sx={{ width: '17.5%', height: '33vh', mr:'7.5%', mb:'3%', }}>
            <Box sx={{ bgcolor: 'black', width: '100%', height: '45%', borderRadius: '20px', boxShadow:'0px 0px 10px #aaaaaa'}} />
            <Box sx={{ width: '100%', height: '23%', mt: '5%', mb: '5%' }}>
                <Typography sx={{ fontSize: '2.1vh', fontWeight: 'bold', mb: '2%' }}>{material}</Typography>
                <Typography sx={{ fontSize: '1.6vh', color: 'rgba(0,0,0,0.54)' }}>{description}</Typography>
            </Box>
            <Box sx={{ width: '100%', height: '13%', fontSize:'1.7vh'}}>
                icones das pessoas
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', border: '1.5px solid #673AB7', fontSize: '1.6vh', fontWeight: 'bold', borderRadius: '30px', color: '#673AB7', padding: '3px 12px', ':hover': { cursor: 'pointer', color: 'white', bgcolor: '#673AB7' } }}>ENTRAR NA CLASSES</Box>
            

        </Box>
    )
}
