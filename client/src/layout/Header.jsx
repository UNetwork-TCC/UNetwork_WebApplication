import { Box, Button, Link, Typography } from '@mui/material'
import logo from '../assets/img/Logo.png'
import Image from 'mui-image'
import { Settings } from '@mui/icons-material';
import { useContext, useEffect, useRef } from 'react';
import { darkTheme } from '../themes';
import { themeContext } from '../contexts';
import useStyles from '../styles';

export default function Header() {
    const { theme, setTheme } = useContext(themeContext)
    const classes = useStyles()

    function StyledLink({ name }) {
        return (
            <Link className={classes.hovered} href={`#${name}`}>
                <Typography>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
            </Link>
        )
    }

    useEffect(() => {

    }, [])

    return (
        <Box
            display='flex'
            justifyContent={'space-evenly'}
            alignItems='center'
            p={2.5}
        >
            <Box>
                <Image width={75} height={75} src={logo} alt="Logo" />
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
                <Box height={40} border='1px solid'></Box>
                <Box display='flex' justifyContent='center' alignItems='center' m>
                    <Settings onClick={() => setTheme(darkTheme)} sx={{ height: '30px', width: '50px', position: 'relative', top: -5 }} />
                </Box>
            </Box>
        </Box>
    )
}
