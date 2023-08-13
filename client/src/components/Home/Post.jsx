import { AccountBox, FavoriteBorder, Favorite, ChatBubbleRounded, Reply, MoreVert} from '@mui/icons-material'
import { Box, Card, Container, IconButton, Typography } from '@mui/material'
import { useState } from 'react'

export default function Post({ title, date, name, content }) {

    const [favoriteClicked, setFavoriteCLicket] = useState(false)

    const buttons = {
        fontSize: '1.3em',

    }

    const areaIcons = {
        bgcolor: '#d3d3d3',
        borderRadius: '15px',
        ':hover': { bgcolor: '#d3d3d3' },
        mr:'1em'

    }

    return (
        <Card variant="elevation" elevation={2} sx={{
            minHeight: '15rem',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '10px',
            mb:'3em'
        }}>
            <Container sx={{ width: '95%', height: '100%', pt: '3em', pb: '3em' }}>
                <Box sx={{ height: '7em', display:'flex', alignItems:'center', justifyContent:'space-between',}}>
                    <Typography sx={{ fontSize: '4em', fontWeight: 'bold' }}>{title}</Typography>
                    <MoreVert sx={{fontSize:'3em'}}/>
                </Box>
                <Box sx={{ height: '8em', }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccountBox sx={{ fontSize: '7em' }} />
                        <Box sx={{ ml: '0.5em' }}>
                            <Typography sx={{ fontSize: '2em', fontWeight: 'bold', }}>{name}</Typography>
                            <Typography sx={{ color: 'gray', fontSize: '1.7em', fontWeight: 'bold' }}>{date}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{}}>

                    <Typography sx={{ fontSize: '2.5em' }}>{content}</Typography>
                    
                    
                    
                </Box>
                <Box sx={{ height: '5em', mt: '1.5em' }}>
                    <IconButton sx={areaIcons}>
                        {favoriteClicked ?
                            <Favorite onClick={() => setFavoriteCLicket(false)} sx={{ fontSize: '1.3em', color: 'red' }} /> :
                            <FavoriteBorder onClick={() => setFavoriteCLicket(true)} sx={buttons} />}
                    </IconButton>
                    <IconButton sx={areaIcons}><ChatBubbleRounded sx={buttons} /></IconButton>
                    <IconButton sx={areaIcons}><Reply sx={{...buttons, transform: 'scaleX(-1)'}} /></IconButton>
                </Box>
            </Container>
        </Card>
    )
}
