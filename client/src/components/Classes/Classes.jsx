import { Image } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Classes({ material, description }) {
    return (
        <Box sx={{ width: '17.5%', height: '33vh', mr:'7.5%', mb:'3%', }}>
            <Box sx={{ bgcolor: 'black', width: '100%', height: '45%', borderRadius: '10px', boxShadow:'0px 0px 10px #aaaaaa'}} />
            <Box sx={{ width: '100%', height: '23%', mt: '5%', mb: '5%' }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 'bold', mb: '2%' }}>{material}</Typography>
                <Typography sx={{ fontSize: '10px', color: 'rgba(0,0,0,0.54)' }}>{description}</Typography>
            </Box>
            <Box sx={{ width: '100%', height: '13%', fontSize:'10px'}}>
                icones das pessoas
            </Box>
            
                <Box sx={{ display: 'flex', justifyContent: 'center', border: '1.5px solid #673AB7', fontSize: '10px', fontWeight: 'bold', borderRadius: '30px', color: '#673AB7', padding: '3px 12px', ':hover': { cursor: 'pointer', color: 'white', bgcolor: '#673AB7' } }}>ENTRAR NA CLASSES</Box>
            

        </Box>
    )
}
