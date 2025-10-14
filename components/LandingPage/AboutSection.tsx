import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { CustomDivider, Topic } from '@/layout'
import { AnimateOnScroll } from '@/components'
import { Diversity3, Forum, Newspaper } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { type ReactElement } from 'react'
import { I18N } from '@/utils/i18n/enums'

const { LANDING_PAGE: { SECTIONS: { ABOUT } } } = I18N

export default function AboutSection(): ReactElement {
    
    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const { t } = useTranslation()

    return (
        <Box>  
            <Box id='sobre' display='flex' justifyContent='center' alignItems='center' flexDirection='column' m={!matches ? 2.5 : 0}>
                <AnimateOnScroll style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} animateOnce animation='fadeInUp'>
                    <Typography variant="h3">{t(ABOUT.TITLE)}</Typography>
                    <CustomDivider sx={!matches ? { width: '50%' } : { width: '40%' }} />
                </AnimateOnScroll>
            </Box>
            <AnimateOnScroll style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} animateOnce animation='fadeInUp'>
                <Box sx={{ width: matches ? '80%' : 'auto' }} mt={10} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <Topic 
                        boxStyle={{ textAlign: 'center' }}
                        title={t(ABOUT.FEATURE1_TITLE)}
                        text={t(ABOUT.FEATURE1_CONTENT)}
                        fontSize={'1.7rem'}
                    />
                </Box>
            </AnimateOnScroll>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll style={{ display: 'flex', flexDirection: matches ? 'column' : 'row', gap: matches ? 40 : 0 }} animateOnce animation='fadeInLeft' duration={1500}>
                    <Box sx={{ width: '99%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Diversity3 sx={{ width: !matches ? '31.25rem' : '20rem', height: !matches ? '31.25rem' : '20rem' }} />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title={t(ABOUT.FEATURE2_TITLE)}
                            text={t(ABOUT.FEATURE2_CONTENT)}
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll 
                    style={{ display: 'flex', 
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
                            title={t(ABOUT.FEATURE3_TITLE)}
                            text={t(ABOUT.FEATURE3_CONTENT)}
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                    <Box mb={5} sx={{ width: '50%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Forum sx={{ width: !matches ? '31.25rem' : '20rem', height: !matches ? '31.25rem' : '20rem' }} />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll style={{ display: 'flex', flexDirection: matches ? 'column' : 'row', gap: matches ? 40 : 0 }} animateOnce animation='fadeInLeft' duration={1500}>
                    <Box sx={{ width: '99%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Newspaper sx={{ width: !matches ? '31.25rem' : '20rem', height: !matches ? '37.5rem' : '20rem' }} />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title={t(ABOUT.FEATURE4_TITLE)}
                            text={t(ABOUT.FEATURE4_CONTENT)}
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                </AnimateOnScroll>
            </Box>
        </Box>
    )
}