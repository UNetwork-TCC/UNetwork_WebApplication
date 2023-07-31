import { Box, Divider, useMediaQuery } from '@mui/material'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'
import AddIcon from '@mui/icons-material/Add'


export default function FavoritesPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box sx={{ overflow: 'hidden' }}> 
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius:'3.1vh' }} variant="middle" />
            <Box sx={{ display: 'flex', height:'88vh' }}>
                {matches && (
                    <NavBar buttonStyle={'Favorites'} />
                )}
                <Divider sx={{m: '10px 5px 10px 0', }} variant="middle" orientation='vertical' flexItem />
                <Box className="Conversas" sx={{ mr: '5px' }}>
                    <Box className="Conversas" sx={{ mr: '5px'}}>
                        <AddIcon sx={{ color:'gray', padding:''}}/> 
                    </Box>
                    <Divider sx={{m: '10px 5px 10px 0', }} variant="middle" orientation='horizontal' flexItem/> 
                </Box>
                
            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
