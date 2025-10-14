import { Box, Divider, Typography, useTheme } from '@mui/material'
import { Animation } from 'react-animate-style'

import { AnimateOnScroll } from '@/components'
import { CustomDivider, Topic } from '@/layout'
import { Person, Group } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { type ReactElement } from 'react'
import { useMediaQuery } from '@mui/material'
import { I18N } from '@/utils/i18n/enums'
import Image from 'next/image'

const { LANDING_PAGE: { SECTIONS: { DISCOVER } } } = I18N

export default function DiscoverSection(): ReactElement {
    const { t } = useTranslation()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box>
            <Box m={2.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                    <Animation animationIn='fadeInUp' isVisible animationInDelay={300}>
                        <Typography variant="h3">{t(DISCOVER.TITLE)}</Typography>
                        <CustomDivider 
                            sx={matches ? {
                                position: 'relative', 
                                width: '50%', 
                                right: '30%' 
                            } : {}} 
                        />
                    </Animation>
                </Box>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll style={{ display: 'flex', flexDirection: matches ? 'column' : 'row', gap: matches ? 40 : 0 }} animateOnce animation='fadeInLeft' duration={1500}>
                    <Box sx={{ width: '100%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Image alt='Discover Feature' style={{ userSelect: 'none' }} height={!matches ? 375 : 250} width={!matches ? 375 : 250} src='/assets/svg/Home/DiscoverFeature.svg' />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title={t(DISCOVER.FEATURE1_TITLE)}
                            text={t(DISCOVER.FEATURE1_CONTENT)}
                            boxStyle={{ width: !matches ? '70%' : '90%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={!matches ? 5 : 10}>
                <AnimateOnScroll 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        flexDirection: matches ? 'column-reverse' : 'row', 
                        gap: matches ? 40 : 0 
                    }} 
                    animateOnce 
                    animation='fadeInRight' 
                    duration={1500}
                >
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title={t(DISCOVER.FEATURE2_TITLE)}
                            text={t(DISCOVER.FEATURE2_CONTENT)}
                            boxStyle={{ width: !matches ? '70%' : '40%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                    <Box mb={5} sx={{ width: '50%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Image alt='DiscoverFeature2' style={{ userSelect: 'none' }} height={!matches ? 375 : 280} width={!matches ? 700 : 600} src='/assets/svg/Home/DiscoverFeature2.svg' />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' flexDirection='column' alignItems='center' p={5} mt={!matches ? 20 : 10}>
                <AnimateOnScroll animateOnce style={{ flexDirection: 'column' }} animation='fadeInUp' duration={1500}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title={t(DISCOVER.FEATURE3_TITLE)}
                            text={t(DISCOVER.FEATURE3_CONTENT)}
                            boxStyle={{ textAlign: 'center', width: !matches ? '100%' : '80%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                    <Box sx={{ postion: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Image 
                            alt='DiscoverFeature3'
                            style={{ 
                                userSelect: 'none',
                                marginLeft: !matches ? '100px' : 40,
                                marginTop: !matches ? '20px' : 130,
                                zIndex: 2 
                            }} 
                            height={!matches ? 437.5 : 180}
                            width={!matches ? 687.5 : 360} 
                            src='/assets/svg/Home/DiscoverFeature3.svg'
                        />
                        <Box position='relative' top={!matches ? 300 : 150} display='flex' justifyContent='center' alignItems='center'>
                            <Box>
                                <Typography color='secondary.dark' variant='h3'>+5K</Typography>
                                <Box display='flex'>
                                    <Person sx={{ m: '5px 10px 0 0' }} />
                                    <Typography variant='h5'>{t(DISCOVER.CONTENT1)}</Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ m: '0 75px' }} />
                            <Box>
                                <Typography color='secondary.dark' variant='h3'>+200</Typography>
                                <Box display='flex'>
                                    <Group sx={{ m: '5px 10px 0 0' }} />
                                    <Typography variant='h5'>{t(DISCOVER.CONTENT2)}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </AnimateOnScroll>
                <Box mb={5} sx={{ width: '100vw', postion: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image 
                        alt='DiscoverFeature3Decoration'
                        height={!matches ? 100 : 65}
                        width={!matches ? 100 : 65} 
                        src='/assets/svg/Home/DiscoverFeature3Decoration.svg' 
                        style={{ 
                            userSelect: 'none',
                            position: 'relative',
                            bottom: !matches ? 375 : 180,
                            zIndex: 1
                        }} 
                    />
                </Box>
            </Box>
        </Box>
    )
}