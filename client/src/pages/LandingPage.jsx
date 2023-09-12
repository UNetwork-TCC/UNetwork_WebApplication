import { Footer, LandingPageHeader } from '../layout'
import liquidBg from '../assets/svg/Home/LiquidBg.svg'
import peopleVector from '../assets/svg/Home/PeopleVector.svg'
import Image from 'mui-image'
import { Box, Button, Typography } from '@mui/material'
import { Animation } from 'react-animate-style'
import { ComunitySection, DiscoverSection, AboutSection } from '../components'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import { Book, Token, WorkHistory } from '@mui/icons-material'
import { AnimateOnScroll } from '../components/Misc'
import { useTranslation } from 'react-i18next'

function LandingPage() {
    const theme = useTheme()

    const { t } = useTranslation()

    return (
        <Box id='inicio' sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.paper', width: '100%' }}>
            <LandingPageHeader />
            <Box>
                <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' left='63%' bottom={90} position='absolute'>
                    <Image src={liquidBg} duration={1000} />
                </Box>
                <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' left='56%' bottom={5} position='absolute'>
                    <Image src={peopleVector} duration={1000} />
                </Box>
            </Box>
            <Box id="início" display='flex' justifyContent='space-evenly' alignItems='center' width='100%'>
                <Box p='25px' m='25px' width='45%'>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}>
                        <Typography mb={4} variant='h1' fontWeight={900}>{t('header.title')}</Typography>
                    </Animation>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true} animationInDelay={250}>
                        <Typography mt={4} variant='h3' color='text.secondary' fontWeight={900}>{t('header.subtitle')}</Typography>
                        <Box mt={5} display='flex'>
                            <Button variant='contained'>
                                <Link style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }} to='/app'>{t('header.btn')}</Link>
                            </Button>
                            <Typography color='primary.main' ml={5} width='30%'>{t('header.caption')}</Typography>
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
                                <Typography sx={{ fontSize: '1.7rem' }} mb={2} variant='h5' fontWeight={900} color='secondary.main'><WorkHistory sx={{ mb: '-3px', mr: '5px' }} />{t('header.feature1.title')}</Typography>
                                <Typography sx={{ fontSize: '1.3rem' }} variant='h6' color='secondary.main'>{t('header.feature1.content')}</Typography>
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                    <Box overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={450}>
                            <Box>
                                <Typography sx={{ fontSize: '1.7rem' }} mb={2} variant='h5' fontWeight={900} color='secondary.main'><Book sx={{ mb: '-3px', mr: '5px' }} />{t('header.feature2.title')}</Typography>
                                <Typography sx={{ fontSize: '1.3rem' }} variant='h6' color='secondary.main'>{t('header.feature2.content')}</Typography>
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                    <Box overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={550}>
                            <Box>
                                <Typography sx={{ fontSize: '1.7rem' }} mb={2} variant='h5' fontWeight={900} color='secondary.main'><Token sx={{ mb: '-3px', mr: '5px' }} />{t('header.feature3.title')}</Typography>
                                <Typography sx={{ fontSize: '1.3rem' }} variant='h6' color='secondary.main'>{t('header.feature3.title')}</Typography>
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

export default LandingPage