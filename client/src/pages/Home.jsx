import { Header } from '../layout'
import liquidBg from '../assets/svg/LiquidBg.svg'
import peopleVector from '../assets/svg/PeopleVector.svg'
import Image from 'mui-image'
import { Box, Divider, Typography } from '@mui/material'
import { Animation } from 'react-animate-style'
import { Circle } from '@mui/icons-material'

function Home() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.paper', width: '100%' }}>
            <Header />
            <Box>
                <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' left='63%' bottom={90} position='absolute'>
                    <Image src={liquidBg} duration={1000} />
                </Box>
                <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' left='56%' bottom={5} position='absolute'>
                    <Image src={peopleVector} duration={1000}  />
                </Box>
            </Box>
            <Box id="início" display='flex' justifyContent='space-evenly' alignItems='center' width='100%'>
                <Box p='25px' m='25px' width='40%'>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}>
                        <Typography mb={4} variant='h2' fontWeight={900}>Desperte seu potencial na UNetwork</Typography>
                    </Animation>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true} animationInDelay={250}>
                        <Typography mt={4} variant='h4' color='text.secondary' fontWeight={900}>Conecte-se com mentores, colegas e amigos em uma comunidade que impulsiona seu crescimento.</Typography>
                    </Animation>
                </Box>
                <Box width='40%'>
                </Box>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' height='40vh' width='100%'>
                <Box p m={5} display='flex' justifyContent='center' alignItems='center' width='75%'>
                    <Box overflow='hidden' m='0 50px'>
                        <Animation animationIn="fadeInUp" animationOut="fadeOut" isVisible={true} animationInDelay={350}>
                            <Typography mb={2} variant='h5' fontWeight={900} color='secondary.main'><Circle/> Descubra!</Typography>
                            <Typography variant='h6' color='text.secondary'>Descubra um mundo de conexões.</Typography>
                        </Animation>
                    </Box>
                    <Divider sx={{ borderColor: 'tinyElements' }} orientation='vertical' flexItem variant='middle'/>
                    <Box overflow='hidden' m='0 50px'>
                        <Animation animationIn="fadeInUp" animationOut="fadeOut" isVisible={true} animationInDelay={450}>
                            <Typography mb={2} variant='h5' fontWeight={900} color='secondary.main'><Circle/> Conheça!</Typography>
                            <Typography variant='h6' color='text.secondary'>Faça amigos, navegue, curta.</Typography>
                        </Animation>
                    </Box>
                    <Divider sx={{ borderColor: 'tinyElements' }} orientation='vertical' flexItem variant='middle'/>
                    <Box overflow='hidden' m='0 50px'>
                        <Animation animationIn="fadeInUp" animationOut="fadeOut" isVisible={true} animationInDelay={550}>
                            <Typography mb={2} variant='h5' fontWeight={900} color='secondary.main'><Circle/> Cresça!</Typography>
                            <Typography variant='h6' color='text.secondary'>Impulsione seu aprendizado.</Typography>
                        </Animation>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Home