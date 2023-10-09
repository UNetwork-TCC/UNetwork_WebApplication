import VideocamIcon from '@mui/icons-material/Videocam'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SettingsIcon from '@mui/icons-material/Settings'
import { Chat } from '..'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { type ReactElement } from 'react'

export default function MobileChatArea(): ReactElement {
    return (
        <Box sx={{ height: '85vh', width: '60vw', display: 'flex', flexDirection: 'column', m: '5px 0' }}>
            <Box sx={{ height: '15vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: '0px' }}>
                    <IconButton >
                        <AccountCircleIcon sx={{ fontSize: '50px' }} />
                    </IconButton>
                    <Box sx={{ ml: '5px', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: 'black', m: '0' }}>Usuario XXX</Typography>
                        <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                    </Box>
                </Box>
                <Box sx={{ display:'flex', flexDirection:'column' }}>
                    <IconButton sx={{}}>
                        <VideocamIcon />
                    </IconButton>
                    <IconButton>
                        <LocalPhoneIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </Box>
            </Box>
            <Divider sx={{ bgcolor: 'gray', height: '1px', m: '5px 0', p: '0' }} flexItem />
            <Box sx={{ height: '63vh' }}>

            </Box>
            <Box sx={{ height: '9vh', display: 'flex', justifyContent: 'center' }}>
                <Chat chatClass={{ name: 'b' }} />
            </Box>
            
        </Box>
    )
}
