import { Box, Typography } from '@mui/material'
import { CustomDivider, Topic } from '../../layout'
import { AnimateOnScroll } from '../Misc'
import Image from 'mui-image'
import { Diversity3, Forum, Newspaper } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export default function AboutSection() {
    
    const { t } = useTranslation()

    return (
        <Box>  
            <Box id='sobre' display='flex' justifyContent='center' alignItems='center' flexDirection='column' m={2.5}>
                <AnimateOnScroll style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}  animateOnce animation='fadeInUp'>
                    <Typography variant="h3">{t('about.title')}</Typography>
                    <CustomDivider sx={{ width: '50%' }} />
                </AnimateOnScroll>
            </Box>
            <AnimateOnScroll style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}  animateOnce animation='fadeInUp'>
                <Box mt={10} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <Topic 
                        boxStyle={{ textAlign: 'center' }}
                        title={t('about.feature1.title')}
                        text={t('about.feature1.content')}
                    />
                </Box>
            </AnimateOnScroll>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll animateOnce animation='fadeInLeft' duration={1500}>
                    <Box sx={{ width: '99%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Diversity3 sx={{ width: 500, height: 500 }} />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title={t('about.feature2.title')}
                            text={t('about.feature2.content')}
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll animateOnce animation='fadeInRight' duration={1500}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title={t('about.feature3.title')}
                            text={t('about.feature3.content')}
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                    <Box mb={5} sx={{ width: '50%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Forum sx={{ width: '37.5rem', height: '37.5rem' }} />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll animateOnce animation='fadeInLeft' duration={1500}>
                    <Box sx={{ width: '99%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Newspaper sx={{ width: '37.5rem', height: '37.5rem' }} />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title={t('about.feature4.title')}
                            text={t('about.feature4.content')}
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                </AnimateOnScroll>
            </Box>
        </Box>
    )
}