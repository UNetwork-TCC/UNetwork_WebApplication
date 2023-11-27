import { Avatar, Box, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function Highlights(): ReactElement {
    return (
        <Box display='flex' flexDirection='column' m={2} gap={2}>
            <Typography variant='h6'>Destaques</Typography>
            <Box display='flex' alignItems='center' gap={2}>
                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                    <Typography>Meu Destaque</Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                    <Typography>Meu Destaque</Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                    <Typography>Meu Destaque</Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                    <Typography>Meu Destaque</Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                    <Typography>Meu Destaque</Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                    <Typography>Meu Destaque</Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                    <Typography>Meu Destaque</Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                    <Typography>Meu Destaque</Typography>
                </Box>
            </Box>
        </Box>
    )
}