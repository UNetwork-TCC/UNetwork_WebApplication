import { Box, Button, Divider, Link as MuiLink, Typography } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import { type ReactElement, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { darkTheme, lightTheme } from '$themes'
import { themeContext } from '$contexts'
import { useStyles } from '$styles'
import logo from '$assets/img/Logo.png'
import lightLogo from '$assets/img/LightLogo.png'
import { useTranslation } from 'react-i18next'

export default function LandingPageHeader(): ReactElement {
    const { theme, setTheme } = useContext(themeContext)
    const classes = useStyles(theme)
    const navigate = useNavigate()

    const { t } = useTranslation()

    function StyledLink({ name } : { name: string }): ReactElement {
        return (
            <MuiLink className={`${classes.navLinks}`} href={`#${name}`}>
                <Typography>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
            </MuiLink>
        )
    }

    const setAppTheme = (): void => {
        if (theme.palette.mode === 'light')
            setTheme(darkTheme)
        else
            setTheme(lightTheme)
    }      

    return (
        <Box
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            position='sticky'
            p={2.5}
        >
            <Box onClick={() => { navigate('/') }} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                { theme?.palette.mode === 'light' ?
                    <img width={75} height={75} src={logo} alt="Logo" />
                    :                    
                    <img width={75} height={75} src={lightLogo} alt="Logo" />
                }
                <Typography variant='inherit' sx={{ letterSpacing: '2px', mt: 1 }}>UNetwork</Typography>
            </Box>
            <Box display='flex' width={300} gap={5} p={1}>
                <StyledLink name={t('nav.btn1')} />
                <StyledLink name={t('nav.btn2')} />
                <StyledLink name={t('nav.btn3')} />
                <StyledLink name={t('nav.btn4')} />
            </Box>
            <Box display='flex' height='100%'>
                <Box mr='25px'>
                    <Button onClick={() => { navigate('/auth/login') }}>{t('nav.btn5')}</Button>
                    <Button onClick={() => { navigate('/auth/register') }} sx={{ borderRadius: '20px', marginLeft: '25px' }} variant='contained'>{t('nav.btn6')}</Button>
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