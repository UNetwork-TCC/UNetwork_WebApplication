import { Image } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function File({fileName, description}) {
  return (
    <Box sx={{display:'flex', mb:'3%', cursor:'pointer'}}>
        <Box sx={{bgcolor:'#D1C4E9', height:'3vw', width:'3vw'}}>
            
        </Box>
        <Box sx={{ml:"1.5%", display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography sx={{textTransform:'uppercase', color:'#673AB7', fontSize: '12px', fontWeight:'bold'}}>{fileName}</Typography>
            <Typography sx={{fontSize: '10px'}}>{description}</Typography>
        </Box>
    </Box>
  )
}
