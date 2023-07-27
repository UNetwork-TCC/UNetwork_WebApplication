import { Box, Divider, useMediaQuery } from '@mui/material'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'


export default function FavoritesPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius:'30px' }} variant="middle" />
            <Box sx={{ display: 'flex' }}>
                {matches && (
                    <NavBar buttonStyle={'Favorites'} />
                )}
                <Divider sx={{m: '10px 5px 10px 0', }} variant="middle" orientation='vertical' flexItem />
                <Box className="Conversas" sx={{ mr: '5px' }}>
                    Favoritos
                </Box>
            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
