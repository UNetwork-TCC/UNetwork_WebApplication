import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SettingsIcon from '@mui/icons-material/Settings'
import { Chat } from '..'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function ChatAreaOld() {
    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', m: '0.76vh 0', }}>
            <Box sx={{ height: '15%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width:'100%', }}>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: '1.6vh', width:'95%', }}>
                    <IconButton >
                        <AccountCircleIcon sx={{ fontSize: '110px', }} />
                    </IconButton>
                    <Box sx={{ ml: '0.5vh', display: 'flex', flexDirection: 'column', }}>
                        <Typography sx={{ fontSize: '30px', fontWeight: 'bold', color: 'black', }}>Usuario XXX</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Serie</Typography>
                    </Box>
                </Box>
                <Box sx={{ display:'flex', alignItems:'center', width:'20%', height:'4vh' }}>
                    <Box sx={{ mr:'3vh' }}>
                        <VideocamOutlinedIcon sx={{ fontSize:'45px', color:'gray' }}/>
                    </Box>
                    <Box sx={{ mr:'3vh' }}>
                        <LocalPhoneIcon sx={{ fontSize:'35px', color:'gray' }}/>
                    </Box>
                    <Box sx={{ mr:'3vh' }}>
                        <SettingsIcon sx={{ fontSize:'35px', color:'gray' }}/>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ m: '0 0', p: '0', }} flexItem />
            <Box sx={{ height: '65vh' }}>

            </Box>
            <Divider sx={{ }} flexItem />
            <Box sx={{ height: '5%', display: 'flex', justifyContent: 'center', mt: '1.5vh', }}>
                <Chat chatClass={{ name: 'a' }}  />
            </Box>
            
        </Box>
    )
}
