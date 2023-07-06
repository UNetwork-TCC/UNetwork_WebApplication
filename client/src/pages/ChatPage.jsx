import { Box, Divider, IconButton, Typography, useMediaQuery } from '@mui/material'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { MobileNavBar, MobileHeader2, NavBar, Header2 } from '../layout'
import ChatArea from '../components/Chat/ChatArea'
import MobileChatArea from '../components/Chat/MobileChatArea'
import { useChatPageStyles } from '../styles'
import { Contact, SideBar } from '../components'
import { GroupAddOutlined } from '@mui/icons-material'

export default function ChatPage() {
    const classes = useChatPageStyles()
    const matches = useMediaQuery('(min-width: 600px)')

    const icon = {
        m: '10px 0 0 0',
    }

    const navStyle = NavBar.navStyle


    return (
        <Box>
            {matches ? <Header2 /> : <MobileHeader2 />}

            <Divider sx={{ bgcolor: '#673AB7', height: '5px', m: '5px 2% 0 2%', borderRadius:'30px' }} variant="middle" />
            <Box sx={{ display: 'flex', overflow: 'hidden', }}>
                {matches && (
                    <NavBar buttonStyle={'Chat'} />
                )
                }
                <Divider sx={{ p: '10px 0 10px 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={matches ? ({ width: '20%', height: '89vh', }) : ({ width: '40%', height: '89vh', })}>
                    <Box sx={{ display: 'flex', alignItems: 'center', m: '0px 0 0px 10px', height: '15%', }}>
                        <Typography sx={!matches ? { fontSize: '22.5px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px', marginTop: '5px', } : { fontSize: '5.6vh', color: '#673AB7', fontWeight: 'bold', marginRight: '0' }}>Conversas</Typography>
                        <Box sx={{ ml: '5%', display:'flex', height:'50%', alignItems:'center', mt:'4%'}}>
                            
                                <GroupAddOutlined sx={{fontSize:'3vh', color:'gray', mr:'.6vw'}} />
                            
                            
                                <SearchIcon sx={{fontSize:'3vh', color:'gray'}} />
                            

                        </Box>
                    </Box>
                    <Divider sx={{}} flexItem />

                    <Box sx={{ maxHeight: '90%', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' }, scrollBehavior: 'smooth', pt:'2%' }}>

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
