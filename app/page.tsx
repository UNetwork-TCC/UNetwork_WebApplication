'use client';

import { Footer, LandingPageHeader } from '@/layout'
import { ComunitySection, DiscoverSection, AboutSection, AnimateOnScroll } from '@/components'

import Image from 'next/image'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Animation } from 'react-animate-style'
import { Book, Token, WorkHistory } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import { I18N } from '@/utils/i18n/enums';

function Heading({ title, content, icon } : { title: string, content: string, icon: ReactElement }): ReactElement {
  return (
      <>
          <Typography
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.7rem' } }}
              mb={2} variant='h5'
              fontWeight={900}
              color='secondary.main'
          >
              <Box mb='-3px' mr='5px' component='span' display='inline-flex' alignItems='center'>
                  {icon}
              </Box>
              {title}
          </Typography>
          <Typography
              sx={{ fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' } }}
              variant='h6'
              color='secondary.main'
          >
              {content}
          </Typography>
      </>
  )
}

export default function LandingPage(): ReactElement {
    const theme = useTheme()
    const { t } = useTranslation()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const router = useRouter()

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
                        <Image width={500} height={500} alt='liquidBg' src='/assets/svg/Home/LiquidBg.svg' />
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
                        <Image width={500} height={500} alt='peopleVector' src='/assets/svg/Home/PeopleVector.svg' />
                    </Box>
                </Box>
            )}
            <Box
                id="início"
                display='flex'
                justifyContent='space-evenly'
                alignItems='center'
                width='100%'
                px={{ xs: 2, sm: 3 }}
            >
                <Box
                    p={{ xs: '15px', sm: '20px', md: '25px' }}
                    m={{ xs: '15px', sm: '20px', md: '25px' }}
                    width={{ xs: '100%', md: '45%' }}
                >
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}>
                        <Typography
                            mb={{ xs: 2, sm: 3, md: 4 }}
                            variant='h1'
                            fontWeight={900}
                            sx={{
                                fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '6rem' }
                            }}
                        >
                            {t(I18N.LANDING_PAGE.HEADER.TITLE)}
                        </Typography>
                    </Animation>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true} animationInDelay={250}>
                        <Typography
                            mt={{ xs: 2, sm: 3, md: 4 }}
                            variant='h3'
                            color='text.secondary'
                            fontWeight={900}
                            sx={{
                                fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.5rem', lg: '3rem' }
                            }}
                        >
                            {t(I18N.LANDING_PAGE.HEADER.SUBTITLE)}
                        </Typography>
                        <Box
                            mt={{ xs: 2, sm: 3, md: 5 }}
                            display='flex'
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            gap={{ xs: 2, sm: 0 }}
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                        >
                            <Button variant='contained' sx={{ minWidth: { xs: '100%', sm: 'auto' } }}>
                                <Typography
                                    component='span'
                                    sx={{ textDecoration: 'none', color: theme.palette.primary.contrastText }}
                                    onClick={() => router.push('/auth/register')}
                                >
                                    {t(I18N.LANDING_PAGE.HEADER.START_BTN)}
                                </Typography>
                            </Button>
                            <Typography
                                color='primary.main'
                                ml={{ xs: 0, sm: 5 }}
                                width={{ xs: '100%', sm: '50%', md: '30%' }}
                                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                            >
                                {t(I18N.LANDING_PAGE.HEADER.CAPTION)}
                            </Typography>
                        </Box>
                    </Animation>
                </Box>
                {!matches && (
                    <Box sx={{ pointerEvents: 'none' }} width='40%'>
                    </Box>
                )}
            </Box>
            <Box
                mt={{ xs: 20, sm: 25, md: 30, lg: 10 }}
                mb={{ xs: 25, sm: 30, md: 35, lg: 20 }}
                display='flex'
                justifyContent='center'
                alignItems='center'
                minHeight='20vh'
                width='100%'
                px={{ xs: 2, sm: 3 }}
            >
                <Box
                    display='flex'
                    gap={{ xs: 5, md: 10, lg: 20 }}
                    p={{ xs: 1, sm: 2 }}
                    m={{ xs: 2, sm: 3, md: 5 }}
                    flexDirection={{ xs: 'column', md: 'row' }}
                    justifyContent='space-evenly'
                    alignItems='center'
                    width='100%'
                >
                    <Box width={{ xs: '100%', md: '50%' }} overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={350}>
                            <Box>
                                <Heading
                                    title={t(I18N.LANDING_PAGE.HEADER.FEATURE1.TITLE)}
                                    content={t(I18N.LANDING_PAGE.HEADER.FEATURE1.CONTENT)}
                                    icon={<WorkHistory />}
                                />
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                    <Box overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={450}>
                            <Box>
                                <Heading
                                    title={t(I18N.LANDING_PAGE.HEADER.FEATURE2.TITLE)}
                                    content={t(I18N.LANDING_PAGE.HEADER.FEATURE2.CONTENT)}
                                    icon={<Book />}
                                />
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                    <Box overflow='hidden'>
                        <AnimateOnScroll animation="fadeInUp" animateOnce delay={550}>
                            <Box>
                                <Heading
                                    title={t(I18N.LANDING_PAGE.HEADER.FEATURE3.TITLE)}
                                    content={t(I18N.LANDING_PAGE.HEADER.FEATURE3.CONTENT)}
                                    icon={<Token />}
                                />
                            </Box>
                        </AnimateOnScroll>
                    </Box>
                </Box>
            </Box>
            <Box
                mb={{ xs: 20, sm: 30, md: 40, lg: 50 }}
                id="descubra"
                px={{ xs: 2, sm: 3 }}
            >
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