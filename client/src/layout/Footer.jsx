import { useNavigate } from 'react-router-dom'
import { Avatar, Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import FooterBackground from '../assets/svg/Home/FooterBackground.svg'
import { FacebookRounded, Instagram, Language, LinkedIn, Twitter } from '@mui/icons-material'

import FlagBR from '../assets/svg/Flags/BR.svg'
import FlagUS from '../assets/svg/Flags/US.svg'
import FlagDE from '../assets/svg/Flags/DE.svg'
import FlagFR from '../assets/svg/Flags/FR.svg'
import FlagES from '../assets/svg/Flags/ES.svg'
// import BR from 'https://gitlab.com/catamphetamine/country-flag-icons/-/blob/master/3x2/BR.svg'

export default function Footer() {
    const navigate = useNavigate()

    return (
        <Box sx={{ background: `url(${FooterBackground})`, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '180vh', height: '70vh', width: '100%' }}>
            <Box display='flex' width='100%' height='100%' justifyContent='space-around' alignItems='center'>
                <Box width='20%'>
                    <Typography mb={2.5}>2023 UNetwork - O melhor conteúdo. Todos os direitos reservados. Segurança e privacidade</Typography>
                    <Typography>©️ Grupo UN 2023</Typography>
                </Box>
                <Box display='flex' flexDirection='column' gap={2}>
                    <Typography mb={2} fontWeight={900} color='primary.main' variant='h6'>Contato</Typography>
                    <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>Fale conosco</Typography>
                    <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>Suporte ao usuário</Typography>
                    <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>Atendimento online</Typography>
                </Box>
                <Box display='flex' flexDirection='column' gap={2}>
                    <Typography mb={2} fontWeight={900} color='primary.main' variant='h6'>Recursos</Typography>
                    <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>Notícias</Typography>
                    <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>Fóruns e comunidades</Typography>
                    <Typography sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>Estudo e crescimento</Typography>
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
                                navigate(`/home/${e.target.value}`)
                            }} fullWidth sx={{ mt: 5, pl: 4, height: 50}} defaultValue='br'>
                                <MenuItem value='br' >
                                    <Box display='flex' position='relative' bottom={3}>
                                        <img width='30px' style={{ marginRight: 10, position: 'relative', top: 5 }} height='30px' src={FlagBR}/>
                                        <Typography position='relative' top={8}>
                                            BR
                                        </Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem value='us' >
                                    <Box display='flex' position='relative' bottom={3}>
                                        <img width='30px' style={{ marginRight: 10, position: 'relative', top: 5 }} height='30px' src={FlagUS}/>
                                        <Typography position='relative' top={8}>
                                            US
                                        </Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem value='fr' >
                                    <Box display='flex' position='relative' bottom={3}>
                                        <img width='30px' style={{ marginRight: 10, position: 'relative', top: 5 }} height='30px' src={FlagFR}/>
                                        <Typography position='relative' top={8}>
                                            FR
                                        </Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem value='es' >
                                    <Box display='flex' position='relative' bottom={3}>
                                        <img width='30px' style={{ marginRight: 10, position: 'relative', top: 5 }} height='30px' src={FlagES}/>
                                        <Typography position='relative' top={8}>
                                            ES
                                        </Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem value='de' >
                                    <Box display='flex' position='relative' bottom={3}>
                                        <img width='30px' style={{ marginRight: 10, position: 'relative', top: 5 }} height='30px' src={FlagDE}/>
                                        <Typography position='relative' top={8}>
                                            DE
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            </Select>
                            <Language sx={{ position: 'relative', bottom: 35, left: 13 }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}