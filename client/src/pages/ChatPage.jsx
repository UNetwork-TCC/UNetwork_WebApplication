import { Box, Divider, IconButton, Typography, useMediaQuery } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { MobileNavBar, MobileHeader2, NavBar, Header2 } from '../layout'
import ChatArea from '../components/Chat/ChatArea'
import MobileChatArea from '../components/Chat/MobileChatArea'
import { useChatPageStyles } from '../styles'

export default function ChatPage() {
    const classes = useChatPageStyles()
    const matches = useMediaQuery('(min-width: 600px)')

    console.log(matches)

    const icon = {
        m: '5px 0 0 0',
    }

    return (
        <Box sx={!matches && ({ fontSize: '10px' })}>
            {matches ? <Header2 /> : <MobileHeader2 />}

            <Divider sx={{ bgcolor: '#673AB7', height: '10px', mt: '5px' }} variant="middle" />
            <Box sx={{ display: 'flex' }}>
                {matches && (
                    <NavBar />
                )}
                <Divider sx={{ bgcolor: 'gray', width: '1px', m: '30px 5px 5px 5px', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={matches ? ({ mr: '5px', width: '18vw' }) : ({ width: '40vw' })}>
                    <Box sx={{ display: 'flex', alignItems: 'center', m: '10px 0 10px 10px' }}>
                        <Typography sx={!matches ? {fontSize: '15px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px', marginTop: '5px',} : {fontSize:'35px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px'}}>Conversas</Typography>
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
                        <IconButton sx={{mb:'15px', }}>
                            <AccountCircleIcon sx={matches ? { fontSize: '70px' } : { fontSize: '45px', }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={matches ? { fontSize: '12px', fontWeight: 'bold', color: 'black' } : { fontSize: '12px', fontWeight: 'bold', color: 'black' }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                        <IconButton sx={{mb:'15px'}}>
                            <AccountCircleIcon sx={matches ? { fontSize: '70px' } : { fontSize: '45px', }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={matches ? { fontSize: '12px', fontWeight: 'bold', color: 'black' } : { fontSize: '12px', fontWeight: 'bold', color: 'black' }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                        <IconButton sx={{mb:'15px'}}>
                            <AccountCircleIcon sx={matches ? { fontSize: '70px' } : { fontSize: '45px', }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={matches ? { fontSize: '12px', fontWeight: 'bold', color: 'black' } : { fontSize: '12px', fontWeight: 'bold', color: 'black' }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                        <IconButton sx={{mb:'15px'}}>
                            <AccountCircleIcon sx={matches ? { fontSize: '70px' } : { fontSize: '45px', }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={matches ? { fontSize: '12px', fontWeight: 'bold', color: 'black' } : { fontSize: '12px', fontWeight: 'bold', color: 'black' }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                        <IconButton sx={{mb:'15px'}}>
                            <AccountCircleIcon sx={matches ? { fontSize: '70px' } : { fontSize: '45px', }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
                                <Typography sx={matches ? { fontSize: '12px', fontWeight: 'bold', color: 'black' } : { fontSize: '12px', fontWeight: 'bold', color: 'black' }}>Usuario XXX</Typography>
                                <Typography sx={{ fontSize: '12px' }}>last mensage</Typography>
                            </Box>
                        </IconButton>
                    </Box>

                </Box>
                <Divider sx={{ bgcolor: 'gray', width: '1px', m: '5px', }} variant="middle" orientation='vertical' flexItem />
                {matches ? <ChatArea /> : <MobileChatArea />}
            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
