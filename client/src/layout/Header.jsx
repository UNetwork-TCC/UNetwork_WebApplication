import logo from '../Logo.png'
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

}from '@mui/material'
import { useState } from 'react'



function Header() {
    // notificação
    const [open, setOpen] = useState(null)

    const handleOpen = (event) => {
        setOpen(event.currentTarget)
    }

    const handleClose = () => {
        setOpen(null)
    }

    const handleMarkAllAsRead = () => {
        
    }
    // fim da notificação

    



    return(
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
            }}/>

            <Box className='search'>
                <input type="text" placeholder='O que voçê esta procurando?'/>
            </Box>
            
            <Box>
                {/* noticicação */}
                <IconButton size='large'>
                    <Badge badgeContent={'x'} color="error">
                        <NotificationsIcon fontSize="inherit" onClick={handleOpen} sx={{color: 'white'}}/>
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
                            <Typography variant="subtitle1">Notifications</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            You have {'X'} unread messages
                            </Typography>
                        </Box>

                        {1 > 0 && (
                            <Tooltip title=" Mark all as read">
                                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                                    
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <Box sx={{ p: 1 }}>
                        <Button fullWidth disableRipple>
                            View All
                        </Button>
                    </Box>
                </Popover>
                {/* fim da notificação */}

                

            </Box>
        </Box>
        
    )
}

export default Header