import { UserAvatar } from '$components'
import { type User } from '$types'
import { Avatar, Box, Typography, useTheme } from '@mui/material'
import { type ReactElement } from 'react'
export default function Contact({ 
    user,
    date,
    notification 
} : {
    user: Partial<User>,
    date?: Date | string,
    notification?: number
}) : ReactElement {
    
    const theme = useTheme()

    return (
        <Box 
            sx={{
                ':hover': { 
                    bgcolor: `${theme.palette.action.focus}`,
                    cursor: 'pointer'
                },
                p: '3% 3%',
                mb: '1%',
                ml: '5%',
                display: 'flex',
                alignItems: 'center',
                width: '90%',
                transition: 'ease .3s',
                fontSize: '10px'
            }}>
            <Avatar variant='rounded' sx={{ borderRadius: 5, height: '3rem', width: '3rem' }}>
                {user?.otherInfo?.avatar?.src ?
                    <UserAvatar 
                        user={user}
                        onClick={() => {}}
                    />
                    :
                    user?.username?.charAt(0).toUpperCase()
                }
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '1.2em', width: '100%', maxWidth: '90%' }}>
                <Box display={'flex'}>
                    <Box sx={{ width: '85%' }}>
                        <Typography noWrap >{user.username}</Typography>

                    </Box>
                    <Box sx={{ width: '15%', textAlign: 'end' }}>
                        <Typography sx={{ color: 'gray', fontSize: '0.8rem' }}>{date?.toString()}</Typography>
                    </Box>
                </Box>
                <Box display={'flex'} >
                    <Box sx={{ width: '90%', maxWidth: '90%' }}>
                        <Typography noWrap>last mensage</Typography>
                    </Box>
                    <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
                        {notification &&
                            <Avatar sx={{ height: '1.60rem', width: '1.60rem', bgcolor: 'primary.dark' }}>
                                < Typography sx={{ fontSize: '0.8rem' }}>+{notification}</Typography>
                            </Avatar>
                        }
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
