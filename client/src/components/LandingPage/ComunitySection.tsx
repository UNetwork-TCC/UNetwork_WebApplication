import { Box, Typography, useTheme } from '@mui/material'
import { CustomDivider, Topic } from '$layout'
import { AnimateOnScroll } from '$components'
import ComunityFeature from '$assets/img/Home/ComunityFeature_Shadow.png'
import Image from 'mui-image'
import ComunityFeatureVideo from '$assets/video/ComunityFeatureVideo.mp4'
import { useTranslation } from 'react-i18next'
import { type ReactElement } from 'react'

export default function ComunitySection(): ReactElement {
    const theme = useTheme()

    const { t } = useTranslation()

    return (
        <Box position='relative' bottom={400} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
            <Box id='comunidade' display='flex' justifyContent='center' alignItems='center' flexDirection='column' m={2.5}>
                <AnimateOnScroll style={{ flexDirection: 'column' }}  animateOnce animation='fadeInUp'>
                    <Typography variant="h3">{t('community.title')}</Typography>
                    <CustomDivider />
                </AnimateOnScroll>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' mt={10}>
                <AnimateOnScroll animateOnce animation='fadeInUp'>
                    <Topic
                        boxStyle={{ textAlign: 'center' }}
                        title={t('community.feature1.title')}
                        text={t('community.feature1.content')}
                    />
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center'>
                <AnimateOnScroll animateOnce animation='fadeInUp'>
                    <Image width={'70rem'} height={400} src={ComunityFeature}/>
                </AnimateOnScroll>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <AnimateOnScroll animateOnce animation='fadeInUp'>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <video style={{ boxShadow: `5px 5px 5px ${theme.palette.common.black}` }} autoPlay loop height={360} width={640}>
                            <source src={ComunityFeatureVideo} type='video/mp4'/>
                        </video>
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box mt={20} width='60%' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                <Typography mb={1} fontSize='1.3rem' variant="body1" >Xing Ling - <Box fontWeight={900} color='primary.main' component='span'>@LittleXing</Box></Typography>
                <Typography mt={1} fontSize='1rem' variant="body2" textAlign='center'>{t('community.content')}</Typography>
            </Box>
        </Box>
    )
}