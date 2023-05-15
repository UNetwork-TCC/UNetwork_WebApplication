import logo from '../assets/img/Logo.png'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
    Box,
    Badge,
    Button,
    Tooltip,
    Divider,
    Popover,
    Typography,
    TextField
} from '@mui/material'
import { useState } from 'react'



function Header() {
    // notificação
    const [open, setOpen] = useState(false)

    const handleOpen = (event) => {
        setOpen(event.currentTarget)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleMarkAllAsRead = () => {

    }

    // fim da notificação    

    return (
        <Box sx={{
            height: '15vh',
            width: '100vw',
            bgcolor: '#0367A0',
            display: 'flex',
            justifyContent: 'space-between'
        }}>

            <img src={logo} alt="Logo" style={{
                width: '7vw',
                marginLeft: '50px'
            }} />

            <Box className='search'>
                <TextField type="text" placeholder='O que você está procurando?' />
            </Box>

            <Box>

                {/* notificação */}

                <IconButton size='large'>
                    <Badge badgeContent={'x'} color="error">
                        <NotificationsIcon fontSize="inherit" onClick={handleOpen} sx={{ color: 'white' }} />
                    </Badge>
                </IconButton>

                <Popover
                    open={Boolean(open)}
                    anchorEl={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            ml: 0.75,
                            width: 360,
                        },
                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">Notificações</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Você tem {'X'} mensagens não lidas
                            </Typography>
                        </Box>

                        {1 > 0 && (
                            <Tooltip title="Marcar tudo como lida">
                                <IconButton color="primary" onClick={handleMarkAllAsRead}>

                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <Divider sx={{ borderStyle: 'dashed' }} />
                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <Box p={1}>
                        <Button fullWidth disableRipple>
                            Ver tudo
                        </Button>
                    </Box>
                </Popover>

                {/* fim da notificação */}

            </Box>
        </Box>

    )
}

export default Header