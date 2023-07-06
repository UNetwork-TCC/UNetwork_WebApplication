import { Image } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function File({fileName, description}) {
    return (
        <Box sx={{display:'flex', mb:'2%', cursor:'pointer'}}>
            <Box sx={{bgcolor:'#D1C4E9', height:'3vw', width:'3vw'}}>
            
            </Box>
            <Box sx={{ml:'1.5%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <Typography sx={{textTransform:'uppercase', color:'#673AB7', fontSize: '1.9vh', fontWeight:'bold'}}>{fileName}</Typography>
                <Typography sx={{fontSize: '1.6vh'}}>{description}</Typography>
            </Box>
        </Box>
    )
}
