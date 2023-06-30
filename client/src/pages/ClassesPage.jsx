import { Box, Divider, useMediaQuery } from '@mui/material'
import { Chat, SideBar } from '../components'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'


export default function ClassesPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '10px', mt: '5px' }} variant="middle" />
            <Box sx={{ display: 'flex' }}>
                {matches && (
                    <NavBar buttonStyle={'Classes'} />
                )}
                <Divider sx={{ bgcolor: 'gray', m: '0 5px 0 0'}} variant="middle" orientation='vertical' flexItem />
                <Box className="Conversas" sx={{ mr: '5px' }}>
                    Suas Classes
                </Box>
            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
