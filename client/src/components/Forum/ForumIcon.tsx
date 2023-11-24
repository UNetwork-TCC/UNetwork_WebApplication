import { type ReactElement } from 'react'
import { Avatar, Box, FormHelperText, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { type User } from '$types'

export default function ForumIcon({ 
    title,
    topic,
    usersIn,
    id,
    image: src 
} : {
    title: string,
    topic: string,
    usersIn: User[],
    id: string | undefined,
    image?: string 
}): ReactElement {
    const navigate = useNavigate()

    return (
        <Box display='flex' sx={{ cursor: 'pointer' }} onClick={(): void => { navigate('/app/forum/' + id) }}>
            <IconButton>
                <Avatar 
                    sx={{
                        height: 50,
                        width: 50
                    }} 
                    variant='rounded'
                >
                    {(src ?? false) ? 
                        <img src={src} alt={'Fórum ' + title} />
                        :
                        title.charAt(0).toUpperCase()
                    }   
                </Avatar>
            </IconButton>
            <Box display='flex' justifyContent='center' flexDirection='column'>
                <Typography>{title.charAt(0).toUpperCase() + title.slice(1)}</Typography>
                <Box gap={1} display='flex'>
                    <FormHelperText>{topic.charAt(0).toUpperCase() + topic.slice(1)}</FormHelperText>
                    <FormHelperText>•</FormHelperText>
                    <FormHelperText>{usersIn.length + ' Pessoas estão nesta discussão'}</FormHelperText>
                </Box>
            </Box>
        </Box>
    )
}
