import { Avatar, Box, IconButton, Paper, Typography, useMediaQuery } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Contact({ username, date, avatar, notification }) {
    const matches = useMediaQuery('(min-width: 600px)')


    return (
        <Box sx={{ p: '3% 3%', mb: '1%', ml: '5%', display: 'flex', alignItems: 'center', width: '90%', transition: 'ease .3s', fontSize: '10px', ':hover': { bgcolor: 'lightgray', borderRadius: '15px', cursor: 'pointer' } }}>
            <Avatar variant='rounded' sx={{ borderRadius: 3, height: '3rem', width: '3rem', borderRadius: '50px' }}>
                {avatar ?
                    <img src={avatar} alt="Avatar" />
                    :
                    username.charAt(0).toUpperCase()
                }
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '1.2em', width: '100%', maxWidth: '90%', }}>
                <Box display={'flex'}>
                    <Box sx={{ width: '85%', maxWidth: '85%' }}>
                        <Typography noWrap >{username}</Typography>

                    </Box>
                    <Box sx={{ width: '15%', textAlign: 'end' }}>
                        <Typography sx={{ color: 'gray', fontSize: '0.8rem' }}>{date}</Typography>
                    </Box>
                </Box>
                <Box display={'flex'} >
                    <Box sx={{ width: '90%', maxWidth: '90%' }}>
                        <Typography noWrap>last mensage</Typography>
                    </Box>
                    <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', }}>
                        {notification ?
                            <Avatar sx={{ height: '1.60rem', width: '1.60rem', bgcolor: 'primary.dark' }}>
                                < Typography sx={{ fontSize: '0.8rem' }}>+{notification}</Typography>
                            </Avatar>
                            :
                            null
                        }
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
