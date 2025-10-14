import { Avatar, Box, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FacebookRounded, Instagram, Language, LinkedIn, Twitter } from '@mui/icons-material'
import { type ReactElement, useEffect } from 'react'

import FlagBR from '@/public/assets/svg/Flags/BR.svg'
import FlagUS from '@/public/assets/svg/Flags/US.svg'
import FlagDE from '@/public/assets/svg/Flags/DE.svg'
import FlagFR from '@/public/assets/svg/Flags/FR.svg'
import FlagES from '@/public/assets/svg/Flags/ES.svg'
import FlagRU from '@/public/assets/svg/Flags/RU.svg'
import FlagSA from '@/public/assets/svg/Flags/SA.svg'
import FlagCN from '@/public/assets/svg/Flags/CN.svg'
import FlagJP from '@/public/assets/svg/Flags/JP.svg'
import FlagIN from '@/public/assets/svg/Flags/IN.svg'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { I18N } from '@/utils/i18n/enums'
import Image from 'next/image'

export default function Footer(): ReactElement {
    const { lang: language } = useParams()
    const { t } = useTranslation()
    const lang = navigator.language.split('-')[1].toLowerCase()

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    const mobileMatches = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        if (language && language !== localStorage.getItem('lang')) {
            if (
                language !== 'pt'
                && language !== 'en'
                && language !== 'fr'
                && language !== 'de'
                && language !== 'es'
                && language !== 'hi'
                && language !== 'ru'
                && language !== 'zh'
                && language !== 'jp'
                && language !== 'ar'
            ) localStorage.setItem('lang', 'pt') 

            localStorage.setItem('lang', language)
            window.location.reload()
        }
    }, [ language ])

    return (
        <Box 
            sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '180vh',
                height: '70vh',
                width: '100%',
                [theme.breakpoints.only('xl')]: {
                    backgroundSize: '205vh'
                },
                [theme.breakpoints.down('sm')]: {
                    backgroundSize: '160vh',
                    height: '60vh',
                    width: '120%'
                }
            }}
        >
            <Image 
                src='' 
                alt='FooterBackground' 
                width={0}
                height={0}
                style={{
                    position: 'absolute',
                    height: '90%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }} 
            />
            <Box 
                sx={{
                    [theme.breakpoints.down('sm')]: {
                        flexDirection: 'row'
                    }
                }} 
                display='flex'
                width='100%'
                height='100%'
                justifyContent={!mobileMatches ? 'space-around' : 'flex-start'}
                p={mobileMatches ? 14 : 0}
                alignItems='center'
            >
                {!matches && (
                    <Box width='20%'>
                        <Typography mb={2.5}>{t(I18N.LANDING_PAGE.FOOTER.COPYRIGHT)}</Typography>
                        <Typography>{t(I18N.LANDING_PAGE.FOOTER.COPYRIGHT2)}</Typography>
                    </Box>
                )}
                {!mobileMatches ? (
                    <>
                        <Box display='flex' flexDirection='column' gap={2}>
                            <Typography mb={2} fontWeight={900} color='primary.main' variant='h6'>{t(I18N.LANDING_PAGE.FOOTER.SECTION1_TITLE)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION1_OPTION1)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION1_OPTION2)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION1_OPTION3)}</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column' gap={2}>
                            <Typography mb={2} fontWeight={900} color='primary.main' variant='h6'>{t(I18N.LANDING_PAGE.FOOTER.SECTION2_TITLE)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION2_OPTION1)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION2_OPTION2)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION2_OPTION3)}</Typography>
                        </Box>
                        <Box>
                            <Box display='flex' gap={2}>
                                <Avatar sx={{ cursor: 'pointer', bgcolor: 'primary.main', transition: '.3s', ':hover': { bgcolor: 'primary.light' } }}>
                                    <FacebookRounded />
                                </Avatar>
                                <Avatar sx={{ cursor: 'pointer', bgcolor: 'primary.main', transition: '.3s', ':hover': { bgcolor: 'primary.light' } }}>
                                    <LinkedIn />
                                </Avatar>
                                <Avatar sx={{ cursor: 'pointer', bgcolor: 'primary.main', transition: '.3s', ':hover': { bgcolor: 'primary.light' } }}>
                                    <Twitter />
                                </Avatar>
                                <Avatar sx={{ cursor: 'pointer', bgcolor: 'primary.main', transition: '.3s', ':hover': { bgcolor: 'primary.light' } }}>
                                    <Instagram />
                                </Avatar>
                            </Box>
                            <Box>
                                <Box>
                                    <Select onChange={e => {
                                        localStorage.setItem('lang', e.target.value)
                                        window.location.href = '/' + e.target.value
                                    }} fullWidth sx={{ mt: 5, pl: 4, height: 50 }} defaultValue='pt' value={localStorage.getItem('lang') ?? lang}>
                                        <MenuItem value='pt'>
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Brazil flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagBR}/>
                                                <Typography position='relative' top={8}>
                                                    BR
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='en' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="US flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagUS}/>
                                                <Typography position='relative' top={8}>
                                                    US
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='fr' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="France flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagFR}/>
                                                <Typography position='relative' top={8}>
                                                    FR
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='es' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Spain flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagES}/>
                                                <Typography position='relative' top={8}>
                                                    ES
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='de' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Germany flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagDE}/>
                                                <Typography position='relative' top={8}>
                                                    DE
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='zh' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="China flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagCN}/>
                                                <Typography position='relative' top={8}>
                                                    ZH
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='ar' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Saudi Arabia flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagSA}/>
                                                <Typography position='relative' top={8}>
                                                    AR
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='ru' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Russia flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagRU}/>
                                                <Typography position='relative' top={8}>
                                                    RU
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='jp' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Japan flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagJP}/>
                                                <Typography position='relative' top={8}>
                                                    JP
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='hi' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="India flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagIN}/>
                                                <Typography position='relative' top={8}>
                                                    HI
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                    <Language sx={{ position: 'relative', bottom: 35, left: 13 }} />
                                </Box>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' flexDirection='column' gap={2}>
                            <Typography mb={2} fontWeight={900} color='primary.main' variant='h6'>{t(I18N.LANDING_PAGE.FOOTER.SECTION1_TITLE)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION1_OPTION1)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION1_OPTION2)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION1_OPTION3)}</Typography>
                        </Box>
                        <Box display='flex' mt={mobileMatches ? 5 : 0} mb={mobileMatches ? 5 : 0} flexDirection='column' gap={2}>
                            <Typography mb={2} fontWeight={900} color='primary.main' variant='h6'>{t(I18N.LANDING_PAGE.FOOTER.SECTION2_TITLE)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION2_OPTION1)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION2_OPTION2)}</Typography>
                            <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>{t(I18N.LANDING_PAGE.FOOTER.SECTION2_OPTION3)}</Typography>
                        </Box>
                        <Box>
                            <Box display='flex' gap={2}>
                                <Avatar sx={{ cursor: 'pointer', bgcolor: 'primary.main', transition: '.3s', ':hover': { bgcolor: 'primary.light' } }}>
                                    <FacebookRounded />
                                </Avatar>
                                <Avatar sx={{ cursor: 'pointer', bgcolor: 'primary.main', transition: '.3s', ':hover': { bgcolor: 'primary.light' } }}>
                                    <LinkedIn />
                                </Avatar>
                                <Avatar sx={{ cursor: 'pointer', bgcolor: 'primary.main', transition: '.3s', ':hover': { bgcolor: 'primary.light' } }}>
                                    <Twitter />
                                </Avatar>
                                <Avatar sx={{ cursor: 'pointer', bgcolor: 'primary.main', transition: '.3s', ':hover': { bgcolor: 'primary.light' } }}>
                                    <Instagram />
                                </Avatar>
                            </Box>
                            <Box>
                                <Box>
                                    <Select onChange={e => {
                                        localStorage.setItem('lang', e.target.value)
                                        window.location.href = '/' + e.target.value
                                    }} fullWidth sx={{ mt: 5, pl: 4, height: 50 }} defaultValue='pt' value={localStorage.getItem('lang') ?? lang}>
                                        <MenuItem value='pt'>
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Brazil flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagBR}/>
                                                <Typography position='relative' top={8}>
                                                    BR
                                                </Typography>
                                            </Box>
                                            </MenuItem>
                                        <MenuItem value='en' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagUS}/>
                                                <Typography position='relative' top={8}>
                                                    US
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='fr' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagFR}/>
                                                <Typography position='relative' top={8}>
                                                    FR
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='es' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagES}/>
                                                <Typography position='relative' top={8}>
                                                    ES
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='de' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagDE}/>
                                                <Typography position='relative' top={8}>
                                                    DE
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='zh' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagCN}/>
                                                <Typography position='relative' top={8}>
                                                    ZH
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='ar' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagSA}/>
                                                <Typography position='relative' top={8}>
                                                    AR
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='ru' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagRU}/>
                                                <Typography position='relative' top={8}>
                                                    RU
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='jp' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagJP}/>
                                                <Typography position='relative' top={8}>
                                                    JP
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value='hi' >
                                            <Box display='flex' position='relative' bottom={3}>
                                                <Image width={30} height={30} alt="Flag" style={{ marginRight: 10, position: 'relative', top: 5 }} src={FlagIN}/>
                                                <Typography position='relative' top={8}>
                                                    HI
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                    <Language sx={{ position: 'relative', bottom: 35, left: 13 }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
                
            </Box>
        </Box>
    )
}