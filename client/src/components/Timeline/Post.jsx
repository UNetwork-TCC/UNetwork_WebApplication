import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { AccountCircle, MoreHoriz, FavoriteBorder, Reply, ChatBubbleOutline } from '@mui/icons-material'
import Comment from './Comment'
import Image from 'mui-image'

export default function Post({ username, data, date, description }) {
    return (
        <Box sx={{ width: '100%', mb:'2%'}}>
            <Box sx={{ width: '100%', height: '15%', display: 'flex' }}>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <AccountCircle sx={{ fontSize: '9.1vh', color:'gray'}} />
                    <Box sx={{ mt: '1.9vh', ml: '1.6vh' }}>
                        <Typography sx={{ fontSize: '2.3vh', fontWeight: 'bold' }}>{username}</Typography>
                        <Typography sx={{ fontSize: '1.6vh', color: 'rgba(0,0,0,.50)' }}>{data} • {date}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <MoreHoriz sx={{fontSize:'3.1vh'}}/>
                </Box>
            </Box>
            <Box sx={{ml:'1.1vh'}}>
                <Box sx={{ width: '100%', mt: '.6vh' }}>
                    <Box sx={{ mb: '1%', }}>
                        <Typography sx={{fontSize:'3.1vh'}}>AAAAAAA</Typography>
                        <Typography sx={{fontSize:'3.1vh'}}>AAAAAAA</Typography>
                        <Typography sx={{fontSize:'3.1vh'}}>AAAAAAA</Typography>
                        <Typography sx={{fontSize:'3.1vh'}}>AAAAAAA</Typography>
                        <Typography sx={{fontSize:'3.1vh'}}>TESTE PARA SABER SE É</Typography>
                        <Typography sx={{fontSize:'3.1vh'}}>FLEXIVEL!!!!!!</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', height: '8%', mb: '1%' }}>
                    <FavoriteBorder sx={{ fontSize: '3.6vh', mr: '3.1vh', cursor: 'pointer', color: '#A0A9D0' }} />
                    <ChatBubbleOutline sx={{ fontSize: '3.6vh', mr: '3.1vh', cursor: 'pointer', color: '#A0A9D0' }} />
                    <Reply sx={{ transform: 'scaleX(-1)', fontSize: '3.8vh', pb: '.3vh', cursor: 'pointer', color: '#A0A9D0', }} />
                </Box>
                <Box sx={{ width: '100%', height: '25%', display: 'flex', mb: '1.5%' }}>
                    <Typography sx={{ fontSize: '1.9vh', color: 'rgba(0,0,0,.70)' }}><b>{username}</b>: {description}</Typography>
                </Box>

                <Comment />
            </Box>
            <Divider sx={{mt:'2%', width:'100%'}} flexItem />
        </Box>
    )
}
