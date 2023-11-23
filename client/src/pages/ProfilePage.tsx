import { Highlights, ProfileHeader, ProfilePosts } from '$components'
import { AppLayout } from '$layout'
import { Box, Container, Divider, Typography } from '@mui/material'
import { type ReactElement } from 'react'
import { useParams } from 'react-router-dom'

export default function ProfilePage(): ReactElement {
    const { id } = useParams()

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
                        <ProfileHeader />
                        <Highlights />
                        <Box width='100%' display='flex' gap={2}>
                            <Divider sx={{ width: '46.1%' }} />
                            <Typography position='relative' top='10px'>Posts</Typography>
                            <Divider sx={{ width: '46.1%' }} />
                        </Box>
                        <ProfilePosts />
                    </Container>
                </Box>
            </Box>
        </AppLayout>
    )
}
