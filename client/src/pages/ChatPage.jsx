import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { MobileNavBar, MobileHeader2, NavBar, Header2 } from '../layout'
import ChatArea from '../components/Chat/ChatArea'
import MobileChatArea from '../components/Chat/MobileChatArea'
import { Contact, } from '../components'
import { GroupAddOutlined } from '@mui/icons-material'


export default function ChatPage() {
    const matches = useMediaQuery('(min-width: 600px)')

    return (
        <Box sx={{ overflow: 'hidden' }}>
            {matches ? <Header2 /> : <MobileHeader2 />}

            <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius: '3.1vh' }} variant="middle" />
            <Box sx={{ display: 'flex', width: '100vw', height:'88vh'}}>
                {matches && (
                    <NavBar buttonStyle={'Chat'} />
                )
                }
                <Divider sx={{ p: '1.1vh 0 1.1vh 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={matches ? ({ width: '28%', maxWidth: '40%', height: '88.5vh', }) : ({ width: '40%', height: '88.5vh', })}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: '0px 0 0px 3%', height: '12.5%', fontSize: '10px', width: '99%',}}>
                        <Box sx={{width:'70%',maxWidth:'80%'}}>
                            <Typography sx={!matches ? { fontSize: '22.5px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px', marginTop: '5px', } : { color: '#673AB7', fontWeight: 'bold', fontSize:'5em'}}>Conversas</Typography>
                        </Box>
                        <Box sx={{display: 'flex', height: '50%', alignItems: 'center', mt: '3%', width: '30%', pl:'5%' }}>
                            <GroupAddOutlined sx={{ fontSize: '3em', color: 'gray', mr: '20%', ml:'3%' }} />
                            <SearchIcon sx={{ fontSize: '3em', color: 'gray' }} />
                        </Box>
                    </Box>
                    <Divider sx={{}} flexItem />

                    <Box sx={{ width: '100%', maxHeight: '90%', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' }, scrollBehavior: 'smooth', pt: '2%', }}>

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
