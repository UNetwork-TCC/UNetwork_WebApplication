import { Box, Divider, IconButton, Typography, useMediaQuery } from '@mui/material'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { MobileNavBar, MobileHeader2, NavBar, Header2 } from '../layout'
import ChatArea from '../components/Chat/ChatArea'
import MobileChatArea from '../components/Chat/MobileChatArea'
import { useChatPageStyles } from '../styles'
import { Contact, SideBar } from '../components'

export default function ChatPage() {
    const classes = useChatPageStyles()
    const matches = useMediaQuery('(min-width: 600px)')

    const icon = {
        m: '5px 0 0 0',
    }

    const navStyle = NavBar.navStyle


    return (
        <Box sx={!matches && ({ fontSize: '10px' })}>
            {matches ? <Header2 /> : <MobileHeader2 />}

            <Divider sx={{ bgcolor: '#673AB7', height: '10px', mt: '5px' }} variant="middle" />
            <Box sx={{ display: 'flex' ,}}>
                {matches && ( 
                    <NavBar buttonStyle={'Chat'} />
                    )
                }
                <Divider sx={{ bgcolor: 'gray', m: '0 5px 0 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={matches ? ({ mr: '5px', width: '20vw' }) : ({ width: '40vw' })}>
                    <Box sx={{ display: 'flex', alignItems: 'center', m: '10px 0 10px 10px' }}>
                        <Typography sx={!matches ? { fontSize: '15px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px', marginTop: '5px', } : { fontSize: '35px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px' }}>Conversas</Typography>
                        <Box sx={{ ml: '5px' }}>
                            <IconButton size='small' sx={icon}>
                                <GroupAddOutlinedIcon fontSize='small' />
                            </IconButton>
                            <IconButton size='small' sx={icon}>
                                <SearchIcon fontSize='small' />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box>
                        <Contact username={'Usuario XXX'}/>
                        <Contact username={'Usuario XXX'}/>
                        <Contact username={'Usuario XXX'}/>
                        <Contact username={'Usuario XXX'}/>

                    </Box>

                </Box>
                <Divider sx={{ bgcolor: 'gray', width: '1px', m: '0 0px 0 5px', }} variant="middle" orientation='vertical' flexItem />
                {matches ? <ChatArea /> : <MobileChatArea />}
            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
