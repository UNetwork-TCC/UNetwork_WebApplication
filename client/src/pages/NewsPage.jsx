import { Box, Divider } from '@mui/material'
import { Chat } from '../components'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'


export default function NewsPage() {
    return (
        <Box>
            <Header2/>
            <Divider sx={{bgcolor: '#673AB7', height:'10px', mt:'5px'}} variant="middle" />
            <Box classname='tudo' sx={{display:'flex'}}>             
                <NavBar className/>
                <Divider sx={{bgcolor: 'gray', width:'1px', m:'5px',}} variant="middle" orientation='vertical' flexItem/>
                <Box className="Conversas" sx={{mr:'5px'}}>
                    Noticias
                </Box>
            </Box>
            
            
        </Box>
        
    )
}
