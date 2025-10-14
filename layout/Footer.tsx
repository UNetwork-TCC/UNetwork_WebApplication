import { Avatar, Box, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FacebookRounded, Instagram, Language, LinkedIn, Twitter } from '@mui/icons-material'
import { type ReactElement, useEffect } from 'react'

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
                && language !== 'es'
            ) localStorage.setItem('lang', 'pt') 

            localStorage.setItem('lang', language)
            window.location.reload()
        }
    }, [ language ])

    const renderSection = (section: 'SECTION1' | 'SECTION2') => (
        <Box
            display='flex'
            flexDirection='column'
            gap={2}
            mb={mobileMatches ? 5 : 0}
            mr={mobileMatches ? 0 : 4}
        >
            <Typography
                mb={2}
                fontWeight={900}
                color='primary.main'
                variant='h6'
            >
                {t(I18N.LANDING_PAGE.FOOTER[section].TITLE)}
            </Typography>
            {['OPTION1', 'OPTION2', 'OPTION3'].map((option) => (
                <Typography
                    key={option}
                    sx={{
                        cursor: 'pointer',
                        ':hover': { textDecoration: 'underline' },
                        whiteSpace: 'nowrap'
                    }}
                >
                    {t(I18N.LANDING_PAGE.FOOTER[section][option as 'OPTION1' | 'OPTION2' | 'OPTION3'])}
                </Typography>
            ))}
        </Box>
    )

    const renderLanguageSelector = () => (
        <Box>
            <Select
                onChange={e => {
                    localStorage.setItem('lang', e.target.value)
                    window.location.href = '/' + e.target.value
                }}
                fullWidth
                sx={{
                    mt: 5,
                    pl: 4,
                    height: 50,
                    [theme.breakpoints.down('md')]: {
                        mt: 3
                    }
                }}
                defaultValue='pt'
                value={localStorage.getItem('lang') ?? lang}
            >
                {[
                    { value: 'pt', label: 'PT', flag: '/assets/svg/Flags/BR.svg', alt: 'Brazil flag' },
                    { value: 'en', label: 'EN', flag: '/assets/svg/Flags/US.svg', alt: 'US flag' },
                    { value: 'es', label: 'ES', flag: '/assets/svg/Flags/ES.svg', alt: 'Spain flag' }
                ].map(({ value, label, flag, alt }) => (
                    <MenuItem key={value} value={value}>
                        <Box display='flex' position='relative' bottom={3}>
                            <Image
                                width={30}
                                height={30}
                                alt={alt}
                                style={{ marginRight: 10, position: 'relative', top: 5 }}
                                src={flag}
                            />
                            <Typography position='relative' top={8}>
                                {label}
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
            <Language sx={{ position: 'relative', bottom: 35, left: 13 }} />
        </Box>
    )

    const renderSocialIcons = () => (
        <Box display='flex' gap={2} mb={mobileMatches ? 3 : 0}>
            {[
                { icon: <FacebookRounded />, key: 'facebook' },
                { icon: <LinkedIn />, key: 'linkedin' },
                { icon: <Twitter />, key: 'twitter' },
                { icon: <Instagram />, key: 'instagram' }
            ].map(({ icon, key }) => (
                <Avatar
                    key={key}
                    sx={{
                        cursor: 'pointer',
                        bgcolor: 'primary.main',
                        transition: '.3s',
                        ':hover': { bgcolor: 'primary.light' }
                    }}
                >
                    {icon}
                </Avatar>
            ))}
        </Box>
    )

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
                src='/assets/svg/Footer/FooterBackground.svg'
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
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: mobileMatches ? 'column' : 'row',
                    justifyContent: mobileMatches ? 'flex-start' : 'space-around',
                    alignItems: 'center',
                    p: mobileMatches ? 14 : 0,
                    [theme.breakpoints.down('sm')]: {
                        flexDirection: 'row'
                    }
                }}
            >
                {!mobileMatches && (
                    <Box width='20%'>
                        <Typography mb={2.5}>{t(I18N.LANDING_PAGE.FOOTER.COPYRIGHT)}</Typography>
                        <Typography>{t(I18N.LANDING_PAGE.FOOTER.COPYRIGHT2)}</Typography>
                    </Box>
                )}

                <Box
                    display='flex'
                    flexDirection={mobileMatches ? 'column' : 'row'}
                    width={mobileMatches ? '100%' : 'auto'}
                >
                    {renderSection('SECTION1')}
                    {renderSection('SECTION2')}
                    <Box>
                        {renderSocialIcons()}
                        {renderLanguageSelector()}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}