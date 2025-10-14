import { Box, Button, Divider, Link as MuiLink, Typography } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import { type ReactElement } from 'react'
import { useStyles } from '@/styles'
import logo from '@/public/assets/img/Logo.png'
import lightLogo from '@/public/assets/img/LightLogo.png'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { I18N } from '@/utils/i18n/enums'

export default function LandingPageHeader(): ReactElement {
    const theme = useTheme()
    const classes = useStyles(theme)
    const router = useRouter()

    const { t } = useTranslation()

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    function StyledLink({ name, onClick } : { name: string, onClick?: () => void }): ReactElement {
        return (
            <MuiLink className={`${classes.navLinks}`} href={`#${name}`} onClick={onClick}>
                <Typography>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
            </MuiLink>
        )
    }

    const setAppTheme = (): void => {
        if (theme.palette.mode === 'light')
            theme.palette.mode = 'dark'
        else
            theme.palette.mode = 'light'
    }      

    return (
        <Box
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            position='sticky'
            width='100vw'
            gap={2}
            p={2.5}
        >
            <Box onClick={() => { router.push('/') }} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                { theme?.palette.mode === 'light' ?
                    <Image width={!matches ? 75 : 30} height={!matches ? 75 : 30} src={logo} alt="Logo" />
                    :                    
                    <Image width={!matches ? 75 : 30} height={!matches ? 75 : 30} src={lightLogo} alt="Logo" />
                }
                {!matches && (
                    <Typography variant='inherit' sx={{ letterSpacing: '2px', mt: 1 }}>UNetwork</Typography>
                )}
            </Box>
            {!matches && (
                <Box display='flex' width={!matches ? 300 : 100} gap={5} p={1}>
                    <StyledLink onClick={() => { router.push('/') }} name={t(I18N.LANDING_PAGE.NAV.BTN1)} />
                    <StyledLink name={t(I18N.LANDING_PAGE.NAV.BTN2)} />
                    <StyledLink name={t(I18N.LANDING_PAGE.NAV.BTN3)} />
                    <StyledLink name={t(I18N.LANDING_PAGE.NAV.BTN4)} />
                </Box>
            )}
            <Box gap={2} display='flex' height='100%'>
                <Box mr={2}>
                    <Button onClick={() => { router.push('/auth/login') }}>{t(I18N.LANDING_PAGE.NAV.BTN5)}</Button>
                    <Button onClick={() => { router.push('/auth/register') }} sx={{ borderRadius: '20px', marginLeft: '25px' }} variant='contained'>{t(I18N.LANDING_PAGE.NAV.BTN6)}</Button>
                </Box>
                {/* <Box height={40} border='1px solid'></Box> */}
                <Divider sx={{ borderColor: 'tinyElements' }} orientation='vertical' flexItem />
                <Box display='flex' justifyContent='center' alignItems='center'>
                    { theme?.palette.mode === 'light' ?
                        <DarkMode onClick={setAppTheme} sx={{ height: '30px', width: '50px', cursor: 'pointer' }} />
                        :
                        <LightMode onClick={setAppTheme} sx={{ height: '30px', width: '50px', cursor: 'pointer' }} />
                    }
                </Box>
            </Box>
        </Box>
    )
}
