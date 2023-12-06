import { Highlights, ProfileHeader, ProfilePosts } from '$components'
import { useGetUserMutation } from '$features/user'
import { AppLayout, ProfileHeaderSkeleton, ProfilePostsSkeleton } from '$layout'
import { Box, Container, Divider, Typography } from '@mui/material'
import { useEffect, type ReactElement, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type User } from '$types'

export default function ProfilePage(): ReactElement {
    const { id } = useParams()
    const [ getUser, { isLoading } ] = useGetUserMutation()

    const [ user, setUser ] = useState<User | null>(null)

    useEffect(() => {
        (async () => {
            const response: any = await getUser(id ?? '')
            setUser(response.data)
        })()
    }, [ getUser, id ])

    const obj = {}

    return (
        <AppLayout>
            <Box
                width='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
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
                        {isLoading ? (
                            <>
                                <ProfileHeaderSkeleton />
                                <Box width='100%' display='flex' gap={2}>
                                    <Divider sx={{ width: '46.1%' }} />
                                    <Typography position='relative' top='10px'>Posts</Typography>
                                    <Divider sx={{ width: '46.1%' }} />
                                </Box>
                                <ProfilePostsSkeleton />
                            </>
                        ) : (
                            <>
                                <ProfileHeader user={user ?? (obj as User)} />
                                <Highlights />
                                <Box width='100%' display='flex' gap={2}>
                                    <Divider sx={{ width: '46.1%' }} />
                                    <Typography position='relative' top='10px'>Posts</Typography>
                                    <Divider sx={{ width: '46.1%' }} />
                                </Box>
                                <ProfilePosts user={user ?? (obj as User)} />
                            </>
                        )}
                    </Container>
                </Box>
            </Box>
        </AppLayout>
    )
}
