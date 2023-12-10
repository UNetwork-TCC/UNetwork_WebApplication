import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { CustomDivider, Topic } from '$layout'
import { AnimateOnScroll } from '$components'
import ComunityFeature from '$assets/img/Home/ComunityFeature_Shadow.png'
import Image from 'mui-image'
import ComunityFeatureVideo from '$assets/video/ComunityFeatureVideo.mp4'
import { useTranslation } from 'react-i18next'
import { type ReactElement } from 'react'

export default function ComunitySection(): ReactElement {
    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const { t } = useTranslation()

    return (
        <Box position='relative' bottom={!matches ? 400 : 300} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
            <Box id='comunidade' display='flex' justifyContent='center' alignItems='center' flexDirection='column' m={2.5}>
                <AnimateOnScroll style={{ flexDirection: 'column' }}  animateOnce animation='fadeInUp'>
                    <Typography variant="h3">{t('community.title')}</Typography>
                    <CustomDivider 
                        sx={
                            matches ? {
                                position: 'relative', 
                                width: '50%', 
                                right: '18%'
                            } : {}
                        } 
                    />
                </AnimateOnScroll>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' mt={10}>
                <AnimateOnScroll animateOnce animation='fadeInUp'>
                    <Topic
                        boxStyle={{ textAlign: 'center' }}
                        title={t('community.feature1.title')}
                        text={t('community.feature1.content')}
                        fontSize={'1.7rem'}
                    />
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center'>
                <AnimateOnScroll animateOnce animation='fadeInUp'>
                    <Image width={!matches ? '70rem' : '35rem'} height={!matches ? 400 : 260} src={ComunityFeature}/>
                </AnimateOnScroll>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <AnimateOnScroll animateOnce animation='fadeInUp'>
                    <Box mt={matches ? -5 : 0} display='flex' justifyContent='center' alignItems='center'>
                        <video style={{ boxShadow: `5px 5px 5px ${theme.palette.common.black}` }} autoPlay loop height={!matches ? 360 : 208} width={!matches ? 640 : 370}>
                            <source src={ComunityFeatureVideo} type='video/mp4'/>
                        </video>
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box mt={!matches ? 20 : 10} width={!matches ? '60%' : '90%'} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                <Typography mb={1} fontSize='1.3rem' variant="body1" >Xing Ling - <Box fontWeight={900} color='primary.main' component='span'>@LittleXing</Box></Typography>
                <Typography mt={1} fontSize='1rem' variant="body2" textAlign='center'>{t('community.content')}</Typography>
            </Box>
        </Box>
    )
}