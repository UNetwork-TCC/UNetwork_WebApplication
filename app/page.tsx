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
              sx={{ fontSize: '1.7rem' }} 
              mb={2} variant='h5' 
              fontWeight={900} 
              color='secondary.main'
          >
              <Box mb='-3px' mr='5px'>
                  {icon}
              </Box>
              {title}
          </Typography>
          <Typography 
              sx={{ fontSize: '1.3rem' }} 
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
            <Box id="início" display='flex' justifyContent='space-evenly' alignItems='center' width='100%'>
                <Box p='25px' m='25px' width={!matches ? '45%' : '100%'}>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}>
                        <Typography mb={4} variant='h1' fontWeight={900}>{t(I18N.LANDING_PAGE.HEADER.TITLE)}</Typography>
                    </Animation>
                    <Animation animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true} animationInDelay={250}>
                        <Typography mt={4} variant='h3' color='text.secondary' fontWeight={900}>{t(I18N.LANDING_PAGE.HEADER.SUBTITLE)}</Typography>
                        <Box mt={!matches ? 5 : 3} display='flex'>
                            <Button variant='contained'>
                                <p style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }} onClick={() => router.push('/auth/register')}>{t(I18N.LANDING_PAGE.HEADER.START_BTN)}</p>
                            </Button>
                            <Typography color='primary.main' ml={5} width={!matches ? '30%' : '50%'}>{t(I18N.LANDING_PAGE.HEADER.CAPTION)}</Typography>
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