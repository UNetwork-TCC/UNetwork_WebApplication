/* eslint-disable react/prop-types */
import { Box, Button, Divider, Link, Typography } from '@mui/material'
import { DarkMode, LightMode} from '@mui/icons-material'
import { useContext } from 'react'
import { darkTheme, lightTheme } from '../themes'
import { themeContext } from '../contexts'
import useStyles from '../styles'

import logo from '../assets/img/Logo.png'
import lightLogo from '../assets/img/LightLogo.png'

export default function Header() {
    const { theme, setTheme } = useContext(themeContext)
    const classes = useStyles(theme.palette)

    function StyledLink({ name }) {
        return (
            <Link className={`${classes.navLinks}`} href={`#${name}`}>
                <Typography>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
            </Link>
        )
    }

    const setAppTheme = () => {
        if (theme.palette.mode === 'light')
            setTheme(darkTheme)
        else
            setTheme(lightTheme)
    }      

    return (
        <Box
            display='flex'
            justifyContent={'space-evenly'}
            alignItems='center'
            p={2.5}
        >
            <Box>
                { theme?.palette.mode === 'light' ?
                    <img width={75} height={75} src={logo} alt="Logo" />
                    :                    
                    <img width={75} height={75} src={lightLogo} alt="Logo" />
                }
                <Typography>UNetwork</Typography>
            </Box>
            <Box display='flex' width={500} gap={5} p>
                <StyledLink name='início' />
                <StyledLink name='descubra' />
                <StyledLink name='comunidade' />
                <StyledLink name='fórum' />
            </Box>
            <Box display='flex' height='100%'>
                <Box mr='25px'>
                    <Button>Entre</Button>
                    <Button sx={{ borderRadius: '20px', marginLeft: '25px' }} variant='contained'>Cadastrar</Button>
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
