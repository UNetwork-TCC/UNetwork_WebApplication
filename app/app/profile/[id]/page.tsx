'use client';

import { ProfileHeader, ProfilePosts } from '@/components'
import { useGetUserMutation } from '@/features/user'
import { ProfileHeaderSkeleton, ProfilePostsSkeleton } from '@/layout/skeletons'
import { Box, Container, Divider, Typography } from '@mui/material'
import { useEffect, type ReactElement, useState } from 'react'
import { type User } from '@/types'

export default function ProfilePage({ id }: { id: string }): ReactElement {
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
        <>
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
                            p: { xs: 2, sm: 3, md: 4 },
                            gap: { xs: 2, sm: 3, md: 4 }
                        }}
                    >
                        {isLoading ? (
                            <>
                                <ProfileHeaderSkeleton />
                                <Box
                                    width='100%'
                                    display='flex'
                                    gap={{ xs: 1, sm: 2 }}
                                    alignItems='center'
                                >
                                    <Divider sx={{ flex: 1 }} />
                                    <Typography
                                        position='relative'
                                        top='10px'
                                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                    >
                                        Posts
                                    </Typography>
                                    <Divider sx={{ flex: 1 }} />
                                </Box>
                                <ProfilePostsSkeleton />
                            </>
                        ) : (
                            <>
                                <ProfileHeader user={user ?? (obj as User)} />
                                {/* <Highlights /> */}
                                <Box
                                    width='100%'
                                    display='flex'
                                    gap={{ xs: 1, sm: 2 }}
                                    alignItems='center'
                                >
                                    <Divider sx={{ flex: 1 }} />
                                    <Typography
                                        position='relative'
                                        top='10px'
                                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                    >
                                        Posts
                                    </Typography>
                                    <Divider sx={{ flex: 1 }} />
                                </Box>
                                <ProfilePosts user={user ?? (obj as User)} />
                            </>
                        )}
                    </Container>
                </Box>
            </Box>
        </>
    )
}
