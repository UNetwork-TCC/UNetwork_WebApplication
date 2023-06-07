import { Box, Divider, IconButton, Typography, useMediaQuery } from '@mui/material'
import { Chat } from '../components'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import VideocamIcon from '@mui/icons-material/Videocam'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SettingsIcon from '@mui/icons-material/Settings'
import MobileNavBar from '../layout/MobileNavBar'

export default function ChatPage() {

    const matches = useMediaQuery('(min-width: 600px)')

    console.log(matches);

    const icon = {
        m: '5px 0 0 0',
    }

    return (
        <Box sx={!matches && ({ fontSize: '54px' })}>
            <Header2 />
            <Divider sx={{ bgcolor: '#673AB7', height: '10px', mt: '5px' }} variant="middle" />
            <Box sx={{ display: 'flex' }}>
                { matches && (
                    <NavBar />
                )}
                <Divider sx={{ bgcolor: 'gray', width: '1px', m: '5px', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ mr: '5px', width: '20vw' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', m: '10px 0 10px 10px' }}>
                        <Typography sx={{ fontSize: '35px', color: '#673AB7', fontWeight: 'bold', mr: '5px' }}>Conversas</Typography>
                        <Box sx={{ ml: '5px' }}>
                            <IconButton size='small' sx={icon}>
                                <EditIcon fontSize='small' />
                            </IconButton>
                            <IconButton size='small' sx={icon}>
                                <SearchIcon fontSize='small' />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box>
                        <IconButton >
                            <AccountCircleIcon sx={{ fontSize: '70px' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: 'black', }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                        <IconButton>
                            <AccountCircleIcon sx={{ fontSize: '70px' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: 'black', }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                        <IconButton>
                            <AccountCircleIcon sx={{ fontSize: '70px' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: 'black', }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                        <IconButton>
                            <AccountCircleIcon sx={{ fontSize: '70px' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: 'black', }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                        <IconButton>
                            <AccountCircleIcon sx={{ fontSize: '70px' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: 'black', }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                    </Box>

                </Box>
                <Divider sx={{ bgcolor: 'gray', width: '1px', m: '5px', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ height: '100vh', width: '65vw', display: 'flex', flexDirection: 'column', m: '5px 0' }}>
                    <Box sx={{ height: '15vh', display:'flex', alignItems:'center', justifyContent:'space-between', pr:'20px'}}>
                        <Box sx={{display:'flex', alignItems: 'center', ml:'10px'}}>
                            <IconButton >
                                <AccountCircleIcon sx={{ fontSize: '70px', }} />
                            </IconButton>
                            <Box sx={{ ml: '5px', display:'flex', flexDirection:'column', }}>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black', m:'0',  }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <IconButton>
                                <VideocamIcon/>
                            </IconButton>
                            <IconButton>
                                <LocalPhoneIcon/>
                            </IconButton>
                            <IconButton>
                                <SettingsIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider sx={{ bgcolor: 'gray', height: '1px', m: '5px 0', p: '0' }} flexItem />
                    <Box sx={{ height: '63vh' }}>
                        
                    </Box>
                    <Box sx={{ height: '9vh', display: 'flex', justifyContent: 'center', pt: '5px',}}>
                        <Chat />
                    </Box>
                    {!matches && (
                        <MobileNavBar />
                    )}
                </Box>
            </Box>


        </Box>

    )
}
