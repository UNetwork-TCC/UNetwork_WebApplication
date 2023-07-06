import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SettingsIcon from '@mui/icons-material/Settings'
import { Chat } from '../../components'
import { Box, Divider, IconButton, Typography} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function ChatArea() {
    return (
        <Box sx={{ height: '100%', width: '62vw', display: 'flex', flexDirection: 'column', m: '7.5px 0', }}>
            <Box sx={{ height: '15vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: '15px' }}>
                    <IconButton >
                        <AccountCircleIcon sx={{ fontSize: '11vh', }} />
                    </IconButton>
                    <Box sx={{ ml: '0.5vh', display: 'flex', flexDirection: 'column', }}>
                        <Typography sx={{ fontSize: '3.1vh', fontWeight: 'bold', color: 'black', m: '0', }}>Usuario XXX</Typography>
                        <Typography sx={{ fontSize: '1.9vh' }}>Serie</Typography>
                    </Box>
                </Box>
                <Box sx={{display:'flex', alignItems:'center', width:'20vh', height:'4vh'}}>
                    <Box sx={{mr:'3vh'}}>
                        <VideocamOutlinedIcon sx={{fontSize:'4.7vh', color:'gray'}}/>
                    </Box>
                    <Box sx={{mr:'3vh'}}>
                        <LocalPhoneIcon sx={{fontSize:'3.6vh', color:'gray'}}/>
                    </Box>
                    <Box sx={{mr:'3vh'}}>
                        <SettingsIcon sx={{fontSize:'3.6vh', color:'gray'}}/>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ m: '0 0', p: '0', }} flexItem />
            <Box sx={{ height: '65vh' }}>

            </Box>
            <Divider sx={{ m: '0px 0', p: '0', }} flexItem />
            <Box sx={{ height: '5vh', display: 'flex', justifyContent: 'center', mt: '15px',}}>
                <Chat />
            </Box>
            
        </Box>
    )
}
