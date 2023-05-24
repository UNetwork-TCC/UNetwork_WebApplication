import { Box, Button, Link, Typography } from '@mui/material'
import logo from '../assets/img/Logo.png'
import Image from 'mui-image'
import { Settings } from '@mui/icons-material';

export default function Header() {
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
                <Link href='#inicio'><Typography>Início</Typography></Link>
                <Link href='#descubra'><Typography>Descubra</Typography></Link>
                <Link href='#comunidade'><Typography>Comunidade</Typography></Link>
                <Link href='#forum'><Typography>Fórum</Typography></Link>
            </Box>
            <Box display='flex' height='100%'>
                <Box mr='25px'>
                    <Button>Entre</Button>
                    <Button sx={{ borderRadius: '20px', marginLeft: '25px' }} variant='contained'>Cadastrar</Button>
                </Box>
                <Box height={40} border='1px solid rgba(0, 0, 0, 0.38)'></Box>
                <Box display='flex' justifyContent='center' alignItems='center' m>
                    <Settings sx={{ height: '30px', width: '50px' }} />
                </Box>
            </Box>
        </Box>
    )
}
