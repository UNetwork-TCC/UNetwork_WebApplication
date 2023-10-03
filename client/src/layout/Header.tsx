import { Avatar, Badge, Box, Divider, IconButton, MenuItem, Typography } from '@mui/material'
import logo from '../assets/img/Logo.png'
import { Search, FilterNone, Close, Minimize, Notifications, Settings, Help, Feedback, ExitToApp } from '@mui/icons-material'
import CustomLink from './CustomLink'
import CustomInput from './CustomInput'
import { useNavigate } from 'react-router-dom'
import { CustomMenu } from '$layout'
import { useState } from 'react'

export default function Header({ 
    minimize,
    maximize,
    close 
} : {
    minimize: () => void,
    maximize: () => void,
    close: () => void,
}) {
    const navigate = useNavigate()

    const [ anchorEl, setAnchorEl ]  = useState(null)
    const [ menuContent, setMenuContent ]  = useState<React.ReactNode[]>([])
    const open = Boolean(anchorEl)
    const handleClick = (
        e: any,
        elements: string[],
        icons: React.ReactNode[] = [],
        onClickEvents: Array<() => void> = elements.map(() => handleClose),
        userMenu: boolean = false
    ) => {
        const mapedElements = elements.map((e, i) =>
            <MenuItem onClick={onClickEvents[i]} key={i} disableRipple>{icons && icons[i]}{e}</MenuItem>
        )
                
        if (userMenu) setMenuContent([
            <MenuItem disableRipple key={-2}>
                <Avatar sx={{ background: 'transparent' }} /> Perfil
            </MenuItem>,
            <Divider key={-1} />,
            ...mapedElements
        ]) 
        else setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)

    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const notification = true

    const Menu: any = CustomMenu

    return (
        <Box>
            <Box bgcolor='white' >
                <Box width='100%' gap={2} p={1} position='relative' mb={-4} top={2} zIndex={1} display='flex' justifyContent='end' alignItems='center'>
                    <Minimize onClick={minimize} sx={{ height: '15px', width: '15px', cursor: 'pointer', ':hover': { color: 'text.secondary' } }} />
                    <FilterNone onClick={maximize} sx={{ height: '15px', width: '15px', cursor: 'pointer', ':hover': { color: 'text.secondary' } }} />
                    <Close onClick={close} sx={{ height: '15px', width: '15px', cursor: 'pointer', ':hover': { color: 'text.secondary' } }} />
                </Box>
                <Box p='1.5rem' bgcolor='white' display='flex' justifyContent='space-around' alignItems='center' >
                    <Box onClick={() => navigate('/app')} sx={{ cursor: 'pointer' }} display='flex' justifyContent='center' alignItems='center'>
                        <img height={50} width={50} src={logo}></img>
                        <Typography ml={1}>UNetwork</Typography>
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
                        <CustomLink to='/app/forum' name='Foruns' />
                        <CustomLink to='/app/classes' name='Classes' />
                        <CustomLink to='/app/materials' name='Materiais' />
                        <CustomLink to='/app/news' name='Notícias' />
                    </Box>
                    <Box gap={3} display='flex'>
                        <Box> {
                            notification ?
                                <Badge badgeContent='+99' color='primary'>
                                    <IconButton onClick={e => handleClick(e, [ 'Message1', 'Message2' ])}>
                                        <Avatar>
                                            <Notifications />
                                        </Avatar>
                                    </IconButton>
                                </Badge>    
                                :
                                <IconButton onClick={e => handleClick(e, [ 'Message1', 'Message2' ])}>
                                    <Avatar>
                                        <Notifications />
                                    </Avatar>
                                </IconButton>
                        }
                            
                        </Box>
                        <IconButton onClick={e => handleClick(e, 
                            [ 'Configurações', 'Ajuda e suporte', 'Dar feedback', 'Sair' ],
                            [ <Settings key={0} />, <Help key={1} />, <Feedback key={2} />, <ExitToApp key={3} /> ],
                            [ () => {}, () => {}, () => {}, () => { handleClose(); close() } ],
                            true
                        )}>
                            <Avatar sx={{ background: 'white', color: 'grey.400' }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {menuContent}
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
