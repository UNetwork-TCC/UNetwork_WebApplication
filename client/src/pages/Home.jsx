import { Footer, Header } from '../layout'
import liquidBg from '../assets/svg/Home/LiquidBg.svg'
import peopleVector from '../assets/svg/Home/PeopleVector.svg'
import Image from 'mui-image'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Animation } from 'react-animate-style'
import { ComunitySection, DiscoverSection, AboutSection } from '../components'
import Topic from '../layout/Topic'
import { useTheme } from '@emotion/react'
import { Link, useParams } from 'react-router-dom'
import { Book, Token, WorkHistory } from '@mui/icons-material'
import { AnimateOnScroll } from '../components/Misc'

function Home() {
    const theme = useTheme()
    const { lang } = useParams()

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
                <Box p='25px' m='25px' width='45%'>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}>
                        <Typography mb={4} variant='h1' fontWeight={900}>Desperte seu potencial na UNetwork</Typography>
                    </Animation>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true} animationInDelay={250}>
                        <Typography mt={4} variant='h3' color='text.secondary' fontWeight={900}>Conecte-se com mentores, colegas e amigos em uma comunidade que impulsiona seu crescimento.</Typography>
                        <Box mt={5} display='flex'>
                            <Button variant='contained'>
                                <Link style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }} to='/auth'>Comece Já!</Link>
                            </Button>
                            <Typography color='primary.main' ml={5} width='30%'>+5000 pessoas como você estão usando esta rede social!</Typography>
                        </Box>
                    </Animation>
                </Box>
                <Box sx={{ pointerEvents: 'none' }} width='40%'>
                </Box>
            </Box>
            <Box mt={10} mb={20} display='flex' justifyContent='center' alignItems='center' height='20vh' width='100%'>
                <Box gap={20} p m={5} display='flex' justifyContent='space-evenly' alignItems='center' width='80%'>
                    <Box width='50%' overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={350}>
                            <Box>
                                <Typography sx={{ fontSize: '1.7rem' }} mb={2} variant='h5' fontWeight={900} color='secondary.main'><WorkHistory sx={{ mb: '-3px', mr: '5px' }}/>Impulsione seu aprendizado!</Typography>
                                <Typography sx={{ fontSize: '1.3rem' }} variant='h6' color='secondary.main'>Com a UNetowrk, você pode aprender até 50% mais rápido do que em um ambiente de aprendizado comum! Cresça com o conhecimento!</Typography>
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                    <Box overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={450}>
                            <Box>
                                <Typography sx={{ fontSize: '1.7rem' }} mb={2} variant='h5' fontWeight={900} color='secondary.main'><Book sx={{ mb: '-3px', mr: '5px' }}/>Conheça e desfrute da comunidade!</Typography>
                                <Typography sx={{ fontSize: '1.3rem' }} variant='h6' color='secondary.main'>Troque conhecimento com outros estudantes! Conheça-os e faça novos amigos!</Typography>
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                    <Box overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={550}>
                            <Box>
                                <Typography sx={{ fontSize: '1.7rem' }} mb={2} variant='h5' fontWeight={900} color='secondary.main'><Token sx={{ mb: '-3px', mr: '5px' }}/>Design de interface de usuário inovador!</Typography>
                                <Typography sx={{ fontSize: '1.3rem' }} variant='h6' color='secondary.main'>Troque conhecimento com outros estudantes! Conheça-os e faça novos amigos!</Typography>
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                </Box>
            </Box>
            <Box mb={50} id="descubra">
                <DiscoverSection />
                <ComunitySection />
                <AboutSection />
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
    )
}

export default Home