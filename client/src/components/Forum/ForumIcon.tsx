import { type ReactElement } from 'react'
import { Avatar, Box, FormHelperText, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function ForumIcon({ 
    name,
    topic,
    people,
    id,
    image: src 
} : {
    name: string,
    topic: string,
    people: number,
    id: string,
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
                        <img src={src} alt={'Fórum ' + name} />
                        :
                        name.charAt(0).toUpperCase()
                    }
                </Avatar>
            </IconButton>
            <Box display='flex' justifyContent='center' flexDirection='column'>
                <Typography>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                <Box gap={1} display='flex'>
                    <FormHelperText>{topic.charAt(0).toUpperCase() + topic.slice(1)}</FormHelperText>
                    <FormHelperText>•</FormHelperText>
                    <FormHelperText>{people + ' Pessoas estão nesta discussão'}</FormHelperText>
                </Box>
            </Box>
        </Box>
    )
}
