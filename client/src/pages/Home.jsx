import { Footer, Header } from '../layout'
import liquidBg from '../assets/svg/Home/LiquidBg.svg'
import peopleVector from '../assets/svg/Home/PeopleVector.svg'
import Image from 'mui-image'
import { Box, Divider, Typography } from '@mui/material'
import { Animation } from 'react-animate-style'
import { DiscoverSection } from '../components'
import Topic from '../layout/Topic'

function Home() {
    return (
        <Box id='inicio' sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.paper', width: '100%' }}>
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
            <Box display='flex' justifyContent='center' alignItems='center' height='20vh' width='100%'>
                <Box p m={5} display='flex' justifyContent='center' alignItems='center' width='75%'>
                    <Box overflow='hidden' m='0 50px'>
                        <Animation animationIn="fadeInUp" animationOut="fadeOut" isVisible={true} animationInDelay={350}>
                            <Topic 
                                title='Decubra!'
                                text='Descubra um mundo de conexões.'
                            />
                        </Animation>
                    </Box>
                    <Divider orientation='vertical' flexItem variant='middle'/>
                    <Box overflow='hidden' m='0 50px'>
                        <Animation animationIn="fadeInUp" animationOut="fadeOut" isVisible={true} animationInDelay={450}>
                            <Topic 
                                title='Conheça!'
                                text='Faça amigos, navegue, curta.'
                            />
                        </Animation>
                    </Box>
                    <Divider orientation='vertical' flexItem variant='middle'/>
                    <Box overflow='hidden' m='0 50px'>
                        <Animation animationIn="fadeInUp" animationOut="fadeOut" isVisible={true} animationInDelay={550}>
                            <Topic 
                                title='Cresça!'
                                text='Impulsione seu aprendizado.'
                            />
                        </Animation>
                    </Box>
                </Box>
            </Box>
            <Box id="descubra">
                <DiscoverSection />
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
    )
}

export default Home