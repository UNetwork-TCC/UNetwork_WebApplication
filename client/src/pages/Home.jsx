import { Header, Layout } from '../layout'
import { Box } from '@mui/material'
import { NavBar, News } from '../components'

function Home() {

    return (
        <Layout>
            <Header />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <NavBar />
                <News sx={{ alignSelf: 'end' }} />
            </Box>
        </Layout>

    )
}

export default Home