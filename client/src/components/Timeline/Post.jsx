import { Box, Typography } from '@mui/material'
import React from 'react'
import { AccountCircle, MoreHoriz, FavoriteBorder, Reply, ChatBubbleOutline } from '@mui/icons-material'
import Comment from './Comment'
import Image from 'mui-image'

export default function Post({ username, data, date, description }) {
    return (
        <Box sx={{ width: '100%', mb:'5%'}}>
            <Box sx={{ width: '100%', height: '15%', display: 'flex' }}>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <AccountCircle sx={{ fontSize: '60px', color:'gray'}} />
                    <Box sx={{ mt: '12px', ml: '10px' }}>
                        <Typography sx={{ fontSize: '', fontWeight: 'bold' }}>{username}</Typography>
                        <Typography sx={{ fontSize: '10px', color: 'rgba(0,0,0,.50)' }}>{data} • {date}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <MoreHoriz />
                </Box>
            </Box>
            <Box sx={{ml:'10px'}}>
                <Box sx={{ width: '100%', mt: '5px' }}>
                    <Box sx={{ mb: '1%' }}>
                        {/* <Typography>AAAAAAA</Typography>
                        <Typography>AAAAAAA</Typography>
                        <Typography>AAAAAAA</Typography>
                        <Typography>AAAAAAA</Typography>
                        <Typography>TESTE PARA SABER SE É</Typography>
                        <Typography>FLEXIVEL!!!!!!</Typography> */}
                        <Image src='data:image/jpeg;base64,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'/>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', height: '8%', mb: '1%' }}>
                    <FavoriteBorder sx={{ fontSize: '25px', mr: '30px', cursor: 'pointer', color: '#A0A9D0' }} />
                    <ChatBubbleOutline sx={{ fontSize: '25px', mr: '30px', cursor: 'pointer', color: '#A0A9D0' }} />
                    <Reply sx={{ transform: 'scaleX(-1)', fontSize: '27px', pb: '2px', cursor: 'pointer', color: '#A0A9D0', }} />
                </Box>
                <Box sx={{ width: '100%', height: '25%', display: 'flex', mb: '1%' }}>
                    <Typography sx={{ fontSize: '13px', color: 'rgba(0,0,0,.70)' }}><b>{username}</b>: {description}</Typography>
                </Box>

                <Comment />
            </Box>
        </Box>
    )
}
