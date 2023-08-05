import { Box, Divider } from '@mui/material'

export default function FavoritesPage() {
    return (
        <Box sx={{ overflow: 'hidden' }}> 
            <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius:'3.1vh' }} variant="middle" />
            <Box sx={{ display: 'flex', height:'88vh' }}>
                <Divider sx={{ m: '1.1vh 0 1.1vh 0', }} variant="middle" orientation='vertical' flexItem />
                <Box className="Conversas" sx={{ width:'86vw' }}>
                    Favoritos
                </Box>
            </Box>
        </Box>

    )
}
