import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SettingsIcon from '@mui/icons-material/Settings'
import { Chat } from '../../components'
import { Box, Divider, IconButton, Typography} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function ChatArea() {
    return (
        <Box sx={{ height: '100%', width: '58.5%', display: 'flex', flexDirection: 'column', m: '5px 0' }}>
            <Box sx={{ height: '15vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: '10px' }}>
                    <IconButton >
                        <AccountCircleIcon sx={{ fontSize: '70px', }} />
                    </IconButton>
                    <Box sx={{ ml: '5px', display: 'flex', flexDirection: 'column', }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black', m: '0', }}>Usuario XXX</Typography>
                        <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                    </Box>
                </Box>
                <Box>
                    <IconButton>
                        <VideocamOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <LocalPhoneIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </Box>
            </Box>
            <Divider sx={{ m: '5px 0', p: '0', }} flexItem />
            <Box sx={{ height: '61vh' }}>

            </Box>
            <Box sx={{ height: '9vh', display: 'flex', justifyContent: 'center', pt: '5px', }}>
                <Chat />
            </Box>
            
        </Box>
    )
}
