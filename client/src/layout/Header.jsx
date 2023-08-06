import { Avatar, Box, Typography } from '@mui/material'
import logo from '../assets/img/Logo.png'
import { Email, Search, FilterNone, Close, Minimize } from '@mui/icons-material'
import CustomLink from './CustomLink'
import CustomInput from './CustomInput'

export default function Header({ minimize, maximize, close }) {
    return (
        <Box>
            <Box position='sticky' bgcolor='white' >
                <Box width='100%' gap={2} p position='absolute' top={0} zIndex={1} display='flex' justifyContent='end' alignItems='center'>
                    <Minimize onClick={minimize} sx={{ height: '15px', width: '15px', cursor: 'pointer', ':hover': { color: 'text.secondary' } }} />
                    <FilterNone onClick={maximize} sx={{ height: '15px', width: '15px', cursor: 'pointer', ':hover': { color: 'text.secondary' } }} />
                    <Close onClick={close} sx={{ height: '15px', width: '15px', cursor: 'pointer', ':hover': { color: 'text.secondary' } }} />
                </Box>  
                <Box position='sticky' p='1.5rem' bgcolor='white' display='flex' justifyContent='space-around' alignItems='center' >
                    <Box sx={{ cursor: 'pointer' }} display='flex' justifyContent='center' alignItems='center'>
                        <img height={50} width={50} src={logo}></img>
                        <Typography ml>UNetwork</Typography>
                    </Box>
                    <Box display='flex' width='33%'>
                        <CustomInput 
                            width='100%'
                            bgcolor='grey.100'
                            color='white'
                            placeholder='Pesquise...'
                            icon={<Search />}
                        />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center' height='100%' gap={5}>
                        <CustomLink name='Comunidade'/>
                        <CustomLink name='Classes'/>
                        <CustomLink name='Materiais'/>
                        <CustomLink name='Notícias'/>
                    </Box>
                    <Box gap={5} display='flex'>
                        <Avatar>
                            <Email />
                        </Avatar>
                        <Avatar sx={{ background: 'white', color: 'grey.400' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
