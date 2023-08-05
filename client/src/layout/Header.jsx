import { Avatar, Box, TextField, Typography } from '@mui/material'
import logo from '../assets/img/Logo.png'
import { Email, Search } from '@mui/icons-material'
import CustomLink from './CustomLink'
import CustomInput from './CustomInput'

export default function Header() {
    return (
        <Box position='sticky' p='1rem' bgcolor='white' display='flex' justifyContent='space-around' alignItems='center' >
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
                <CustomLink name='Chats'/>
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
    )
}
