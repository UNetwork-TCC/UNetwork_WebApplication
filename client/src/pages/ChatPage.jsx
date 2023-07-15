import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { MobileNavBar, MobileHeader2, NavBar, Header2 } from '../layout'
import ChatArea from '../components/Chat/ChatArea'
import MobileChatArea from '../components/Chat/MobileChatArea'
import { Contact,  } from '../components'
import { GroupAddOutlined } from '@mui/icons-material'

export default function ChatPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    
    return (
        <Box sx={{ overflow: 'hidden'}}>
            {matches ? <Header2 /> : <MobileHeader2 />}

            <Divider sx={{ bgcolor: '#673AB7', height: '5px', m: '5px 2% 0 2%', borderRadius: '30px' }} variant="middle" />
            <Box sx={{ display: 'flex',  }}>
                {matches && (
                    <NavBar buttonStyle={'Chat'} />
                )
                }
                <Divider sx={{ p: '1.1vh 0 1.1vh 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={matches ? ({ width: '20%', height: '88.5vh', }) : ({ width: '40%', height: '88.5vh', })}>
                    <Box sx={{ display: 'flex', alignItems: 'center', m: '0px 0 0px 1.5vh', height: '12.5%', }}>
                        <Typography sx={!matches ? { fontSize: '22.5px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px', marginTop: '5px', } : { fontSize: '5vh', color: '#673AB7', fontWeight: 'bold', marginRight: '0' }}>Conversas</Typography>
                        <Box sx={{ ml: '7%', display: 'flex', height: '50%', alignItems: 'center', mt: '4%' }}>
                            <GroupAddOutlined sx={{ fontSize: '3vh', color: 'gray', mr: '1.3vw' }} />
                            <SearchIcon sx={{ fontSize: '3vh', color: 'gray' }} />
                        </Box>
                    </Box>
                    <Divider sx={{}} flexItem />

                    <Box sx={{ maxHeight: '90%', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' }, scrollBehavior: 'smooth', pt: '2%' }}>

                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />
                        <Contact username={'Usuario XXX'} />

                    </Box>

                </Box>
                <Divider sx={{}} variant="middle" orientation='vertical' flexItem />
                {matches ? <ChatArea /> : <MobileChatArea />}
            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
