import { Footer, LandingPageHeader } from '$layout'
import { ComunitySection, DiscoverSection, AboutSection, AnimateOnScroll } from '$components'

import liquidBg from '$assets/svg/Home/LiquidBg.svg'
import peopleVector from '$assets/svg/Home/PeopleVector.svg'
import Image from 'mui-image'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Animation } from 'react-animate-style'
import { Link } from 'react-router-dom'
import { Book, Token, WorkHistory } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { type ReactElement } from 'react'

function LandingPage(): ReactElement {
    const theme = useTheme()

    const { t } = useTranslation()

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    function Heading({ title, content, icon } : { title: string, content: string, icon: ReactElement }): ReactElement {
        return (
            <>
                <Typography 
                    sx={{ fontSize: '1.7rem' }} 
                    mb={2} variant='h5' 
                    fontWeight={900} 
                    color='secondary.main'
                >
                    <Box mb='-3px' mr='5px'>
                        {icon}
                    </Box>
                    {t(title)}
                </Typography>
                <Typography 
                    sx={{ fontSize: '1.3rem' }} 
                    variant='h6' 
                    color='secondary.main'
                >
                    {t(content)}
                </Typography>
            </>
        )
    }

    return (
        <Box id='inicio' sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.paper', width: '100%' }}>
            <LandingPageHeader />
            {!matches && (
                <Box>
                    <Box 
                        sx={{ 
                            pointerEvents: 'none',
                            width: '100%',
                            height: '100%',
                            left: '63%',
                            bottom: 90,
                            position: 'absolute' 
                        }} 
                    >
                        <Image src={liquidBg} duration={1000} />
                    </Box>
                    <Box 
                        sx={{ 
                            pointerEvents: 'none',
                            width: '100%',
                            height: '100%',
                            left: '56%',
                            bottom: 5,
                            position: 'absolute'
                        }} 
                    >
                        <Image src={peopleVector} duration={1000} />
                    </Box>
                </Box>
            )}
            <Box id="início" display='flex' justifyContent='space-evenly' alignItems='center' width='100%'>
                <Box p='25px' m='25px' width={!matches ? '45%' : '100%'}>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}>
                        <Typography mb={4} variant='h1' fontWeight={900}>{t('header.title')}</Typography>
                    </Animation>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true} animationInDelay={250}>
                        <Typography mt={4} variant='h3' color='text.secondary' fontWeight={900}>{t('header.subtitle')}</Typography>
                        <Box mt={!matches ? 5 : 3} display='flex'>
                            <Button variant='contained'>
                                <Link style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }} to='/auth/register'>{t('header.btn')}</Link>
                            </Button>
                            <Typography color='primary.main' ml={5} width={!matches ? '30%' : '50%'}>{t('header.caption')}</Typography>
                        </Box>
                    </Animation>
                </Box>
                {!matches && (
                    <Box sx={{ pointerEvents: 'none' }} width='40%'>
                    </Box>
                )}
            </Box>
            <Box mt={!matches ? 10 : 30} mb={!matches ? 20 : 35} display='flex' justifyContent='center' alignItems='center' height='20vh' width='100%'>
                <Box 
                    display='flex' 
                    gap={!matches ? 20 : 5} 
                    p={1} 
                    m={5} 
                    flexDirection={!matches ? 'row' : 'column'} 
                    justifyContent='space-evenly' 
                    alignItems='center' 
                    width='100%'
                >
                    <Box width={!matches ? '50%' : '100%'} overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={350}>
                            <Box>
                                <Heading
                                    title='header.feature1.title'
                                    content='header.feature1.content'
                                    icon={<WorkHistory />}
                                />
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                    <Box overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={450}>
                            <Box>
                                <Heading
                                    title='header.feature2.title'
                                    content='header.feature2.content'
                                    icon={<Book />}
                                />
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                    <Box overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={550}>
                            <Box>
                                <Heading
                                    title='header.feature3.title'
                                    content='header.feature3.content'
                                    icon={<Token />}
                                />
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