import { type User } from '$types'
import { type ReactElement } from 'react'
import { Button, Typography } from '@mui/material'
import { Avatar, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function SideComponent({ user }: { user: User | Record<string, unknown> }): ReactElement {
    const navigate = useNavigate()

    return (
        <Box height='100%' display='flex' flexDirection='column' gap={2}>
            <Box display='flex' gap={2}>
                <Avatar></Avatar>
                <Box display='flex' flexDirection='column'>
                    <Typography variant='body1'>@{String(user?.username)}</Typography>
                    <Typography variant='caption'>{String(user?.name)}</Typography>
                </Box>
            </Box>
            <Box display='flex' flexDirection='column'>
                <Typography>Brasil, São Paulo</Typography>
                <Typography>+11 992253966</Typography>
            </Box>
            <Box height='100%' display='flex' justifyContent='end' flexDirection='column'>
                <Button onClick={() => { navigate('/app/profile/' + String(user?._id)) }} variant='contained'>Ver perfil</Button>
            </Box>
        </Box>
    )    
}