import { AccountCircle, Favorite, PhotoLibrary } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

export default function Suggestion({ username } : { username: string }) {
    return (
        <Box display={'flex'} sx={{ width: '95%', height: '105px', bgcolor: 'white', borderRadius: '0 1.6vh 1.6vh 0', mb: '2vh', }}>
            <Box sx={{ bgcolor: '#673AB7', width: '20%', maxWidth:'20%' , maxHeight:'100%', borderRadius: '0 1.3vh 1.3vh 0px', m: '.6vh 0', }}>
                <IconButton size='small'>
                    <AccountCircle sx={{ fontSize: '90px', color: 'white', position: 'absolute', left: '40px', top: '-.7vh', margin: '0',  }} />
                </IconButton>
            </Box>
            <Box sx={{ width: '37.5%', display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
                <Box sx={{ width: '80%', ml: '30%' }}>
                    <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>{username}</Typography>
                    <Typography sx={{ fontSize: '15px' }}>Série</Typography>
                    <Typography sx={{ fontSize: '15px' }}>X Conexões</Typography>
                </Box>
            </Box>

            <Box sx={{ width: '45%', height:'100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{ display:'flex', }}>
                    <Box sx={{ display: 'flex' }}>
                        <Favorite sx={{ fontSize: '22px', ml:'.6vh', color:'red' }} />
                        <Typography sx={{ fontSize: '15px', color: 'rgba(0,0,0,0.54)', ml:'.6vh' }}>X Likes</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <PhotoLibrary sx={{ fontSize: '22px', ml:'1.1vh', color:'rgba(0,0,255,.70)' }} />
                        <Typography sx={{ fontSize: '15px', color: 'rgba(0,0,0,0.54)', ml:'.6vh' }}>X Posts</Typography>
                    </Box>
                </Box>
                <Typography sx={{ width:'90%',bgcolor:'#673AB7',color:'white', textAlign:'center' , textTransform: 'uppercase', fontSize: '1.3vh', border: '.2vh solid #673AB7', borderRadius: '3.1vh', padding:'0 .6vh', m:'10% 5% 0 5%', ':hover':{ cursor:'pointer' } }}>Ver Perfil</Typography>
            </Box>
        </Box>

    )
}
