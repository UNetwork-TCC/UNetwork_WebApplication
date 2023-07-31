import { Box, Divider, useMediaQuery } from '@mui/material'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'


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
                <Divider sx={{ m: '1.1vh 0 1.1vh 0', }} variant="middle" orientation='vertical' flexItem />
                <Box className="Conversas" sx={{ width:'86vw' }}>
                    Favoritos
                </Box>
            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
