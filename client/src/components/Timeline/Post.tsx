import { Box, Divider, Typography } from '@mui/material'
import { AccountCircle, MoreHoriz, FavoriteBorder, Reply, ChatBubbleOutline } from '@mui/icons-material'
import Comment from './Comment'
import { type ReactElement } from 'react'

export default function Post({
    username,
    data,
    date,
    description 
} : {
    username: string,
    data: string,
    date: string,
    description: string
}) : ReactElement {
    return (
        <Box sx={{ width: '100%', mb:'2%' }}>
            <Box sx={{ width: '100%', height: '15%', display: 'flex' }}>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <AccountCircle sx={{ fontSize: '90px', color:'gray', width:'100px' }} />
                    <Box sx={{ mt: '15px', ml: '1.5%' }}>
                        <Typography sx={{ fontSize: '22px', fontWeight: 'bold' }}>{username}</Typography>
                        <Typography sx={{ fontSize: '15px', color: 'rgba(0,0,0,.50)' }}>{data} • {date}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MoreHoriz sx={{ fontSize:'3.1vh' }}/>
                </Box>
            </Box>
            <Box sx={{ ml:'1.1vh' }}>
                <Box sx={{ width: '100%', mt: '.6vh' }}>
                    <Box sx={{ mb: '1%', maxWidth:'100em' , display:'flex', flexDirection:'column' }}>
                        <Typography sx={{ fontSize:'35px', wordWrap:'break-word' }}>
                        AAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        dadada
                        dua
                        idad
                        dada
                        auda
                        da
                        dadada </Typography>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', height: '8%', mb: '1%' }}>
                    <FavoriteBorder sx={{ fontSize: '35px', mr: '3.1vh', cursor: 'pointer', color: '#A0A9D0' }} />
                    <ChatBubbleOutline sx={{ fontSize: '35px', mr: '3.1vh', cursor: 'pointer', color: '#A0A9D0' }} />
                    <Reply sx={{ transform: 'scaleX(-1)', fontSize: '37px', pb: '.3vh', cursor: 'pointer', color: '#A0A9D0' }} />
                </Box>
                <Box sx={{ width: '100%', height: '25%', display: 'flex', mb: '1.5%' }}>
                    <Typography sx={{ fontSize: '18px', color: 'rgba(0,0,0,.70)' }}><b>{username}</b>: {description}</Typography>
                </Box>

                <Comment />
            </Box>
            <Divider sx={{ mt:'2%', width:'100%' }} flexItem />
        </Box>
    )
}
