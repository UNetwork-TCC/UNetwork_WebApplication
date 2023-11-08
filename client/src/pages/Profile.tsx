import { AppLayout } from '$layout'
import { Avatar, Box, Container, Typography } from '@mui/material'
import React, { type ReactElement } from 'react'

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
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2.5,
                            gap: 4
                        }}
                    >
                        <Box display='flex' gap={4}>
                            <Avatar
                                sx={{
                                    height: '10rem',
                                    width: '10rem'
                                }}
                            ></Avatar>
                            <Box display='flex' flexDirection='column' gap={2.5}>
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
                                <Box>
                                    <Typography>Vitronks</Typography>
                                    <Typography>Vitor Hugo Rodrigues dos Santos</Typography>
                                    <Typography>3° DS</Typography>
                                    <Typography>Brasil, São Paulo</Typography>
                                    <Typography>11 992253966</Typography>
                                    <Typography>ETEC Uirapuru</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box display='flex' width='60%'>
                            <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur ipsum fugiat rerum molestiae consectetur accusamus harum provident nisi voluptatem sapiente odio soluta animi non expedita vel eligendi deserunt, iure sunt.</Typography>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </AppLayout>
    )
}
