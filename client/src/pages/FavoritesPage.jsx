import { Box, Divider, useMediaQuery } from '@mui/material'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'


export default function FavoritesPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '10px', mt: '5px' }} variant="middle" />
            <Box classname='tudo' sx={{ display: 'flex' }}>
                {matches && (
                    <NavBar />
                )}
                <Divider sx={{ bgcolor: 'gray', width: '1px', m: '30px 5px 5px 5px', }} variant="middle" orientation='vertical' flexItem />
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
