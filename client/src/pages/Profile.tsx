import { AppLayout } from '$layout'
import { Avatar, Box, Container, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function Profile(): ReactElement {
    return (
        <AppLayout>
            <Box height='100%' width='100%'>
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    height='100%'
                    width='100%'
                >
                    <Container 
                        sx={{
                            minHeight: '100%',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 4,
                            gap: 4
                        }}
                    >
                        <Box p={3} width='100%' display='flex' gap={8}>
                            <Avatar
                                sx={{
                                    height: '10rem',
                                    width: '10rem'
                                }}
                            ></Avatar>
                            <Box width='100%' display='flex' flexDirection='column' gap={2.5}>
                                <Box display='flex' gap={4}>
                                    <Box>
                                        <Typography>Publicações 0</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>Seguidores 0</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>Seguindo 0</Typography>
                                    </Box>
                                </Box>
                                <Box width='50%'>
                                    <Typography>@vitronks</Typography>
                                    <Typography>Vitor Hugo Rodrigues dos Santos</Typography>
                                    <Typography>{'Olá! Esta é a bio de um maluco aí.'}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='column' m={2} gap={2}>
                            <Typography variant='h6'>Classes</Typography>
                            <Box display='flex' alignItems='center' gap={2}>
                                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                                    <Typography>Minha classe</Typography>
                                </Box>
                                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                                    <Typography>Minha classe</Typography>
                                </Box>
                                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                                    <Typography>Minha classe</Typography>
                                </Box>
                                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                                    <Typography>Minha classe</Typography>
                                </Box>
                                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                                    <Typography>Minha classe</Typography>
                                </Box>
                                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                                    <Typography>Minha classe</Typography>
                                </Box>
                                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                                    <Typography>Minha classe</Typography>
                                </Box>
                                <Box display='flex' justifyContent='center' alignContent='center' flexDirection='column' gap={2}>
                                    <Avatar sx={{ height: '5rem', width: '5rem' }}>M</Avatar>
                                    <Typography>Minha classe</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </AppLayout>
    )
}
