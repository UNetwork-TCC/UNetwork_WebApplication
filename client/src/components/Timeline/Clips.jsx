import { Box, Typography } from '@mui/material'
import React from 'react'
import { AccountCircle } from '@mui/icons-material'

export default function Clips({username}) {
  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'10%', height:'100%', justifyContent:'center', ml:'3.2%', cursor:'pointer'}}>
        <AccountCircle sx={{fontSize:'70px', color:'gray'}}></AccountCircle>
        <Typography sx={{fontSize:'12px', fontWeight:'bold'}}>{username}</Typography>
    </Box>
  )
}
