import NavBar from '../components/Home/NavBar'
import Header from '../layout/Header'
import Noticia from '../components/Home/Noticia'
import { Box } from '@mui/material'


function Home() {  

    return (
        <Box>
            <Header/>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <NavBar/>
                <Noticia sx={{alignSelf: 'end'}} />           
            </Box>
        </Box>

    )
}

export default Home