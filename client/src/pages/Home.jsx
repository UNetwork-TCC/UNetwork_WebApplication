import { Header } from '../layout'
import liquidBg from '../assets/svg/LiquidBg.svg'
import peopleVector from '../assets/svg/PeopleVector.svg'
import Image from 'mui-image'
import { Box } from '@mui/material'

function Home() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}>
            <Header />
            <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' left='63%' bottom={90} position='absolute'>
                <Image src={liquidBg} />
            </Box>
            <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' left='56%' bottom={5} position='absolute'>
                <Image src={peopleVector} />
            </Box>
        </Box>
    )
}

export default Home