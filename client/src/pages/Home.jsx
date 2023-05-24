import { Header, Layout } from '../layout'
import liquidBg from '../assets/svg/LiquidBg.svg'
import Image from 'mui-image'
import { Box } from '@mui/material'

function Home() {

    return (
        <Layout sx={{ minHeight: '100vh' }}>
            <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' position='absolute'>
                <Image src={liquidBg} />
                <Box></Box>
            </Box>
            <Header />
        </Layout>
    )
}

export default Home