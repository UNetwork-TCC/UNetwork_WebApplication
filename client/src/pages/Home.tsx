import { Avatar, Box, IconButton, Link as MuiLink, Stack, useTheme } from '@mui/material'
import { ClipsWrapper, Post } from '$components'
import { Add, AttachFile, ArrowDropUp } from '@mui/icons-material'
import { AppLayout, CustomInput } from '$layout'
import { useEffect, type ReactElement, useState } from 'react'
import { PostSkeleton } from '$skeletons'
import { useFetchDispatch } from '$hooks'
import { fetchPosts } from '$features/post'
import { HTTP_STATUS } from '$constants'
import { useAppSelector } from '$store'
import roubo from '$assets/img/paraPiada/roubo.jpg'
import james from '$assets/img/paraPiada/james.jpg'
export default function Home(): ReactElement {
    const theme = useTheme()
    const status = useFetchDispatch(fetchPosts())

    const posts = useAppSelector(state => state.post.posts)

    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    function StyledButton({ name, icon }: { name: string, icon: React.ReactNode }): ReactElement {
        return (
            <MuiLink href={`#${name}`}>
                <IconButton disableRipple sx={{ bgcolor: 'primary.main', color: 'white' }}>
                    {icon}
                </IconButton>
            </MuiLink>
        )
    }

    useEffect(() => {
        (async () => {
            if (await status === HTTP_STATUS.FULFILLED)
                setIsLoading(false)

        })()
    }, [ status ])

    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' alignItems='center' flexDirection='column' p={3} mt={5} width='70%' height='100%' id="topo" sx={{ m: '0 12.5%' }}>
                <Box width='100%' id="inicio">
                    <ClipsWrapper />
                    <CustomInput
                        sx={{ boxShadow: theme.shadows[4] }}
                        fullWidth
                        width='100%'
                        bgcolor={theme.palette.mode === 'light' ? 'white' : undefined}
                        placeholder='No que estou pensando...'
                        color={theme.palette.mode === 'light' ? 'primary.main' : undefined}
                        iconColor='#dbdbdb'
                        icon={<Add />}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            position: 'relative',
                            width: '50px',
                            bottom: 47,
                            right: '4rem',
                            [theme.breakpoints.down('xl')]: {
                                bottom: 44,
                                right: '5.25rem'
                            }
                        }}>
                        <input type='file' id='file' accept='image/*' style={{ display: 'none' }} />
                        <Avatar
                            component='label'
                            htmlFor='file'
                            sx={{
                                cursor: 'pointer',
                                transition: '.3s',
                                bgcolor: 'primary.main',
                                ':hover': {
                                    bgcolor: 'primary.light'
                                }
                            }}
                        >
                            <AttachFile />
                        </Avatar>
                    </Box>
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%' m={5}>
                    { isLoading
                        ? (
                            <>
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                            </>   
                        )
                        : posts.map(post => (
                            <Post
                                key={post._id}
                                title={post.name}
                                content={post.content}
                                date={post.postedAt}
                                user={{ name: post.postedBy?.name }}
                            />
                        ))
                    }
                </Box>
            </Box>
            <Box sx={{ height: '100%', display: 'flex', position: 'sticky', top: 0, left: 200, flexDirection: 'column-reverse' }}>
                <Stack sx={{ position: 'relative', bottom: 40 }} gap={6}>
                    <StyledButton
                        name='topo'
                        icon={<ArrowDropUp />}

                    />
                    <StyledButton
                        name='add'
                        icon={<Add />}
                    />
                </Stack>
            </Box>

        </AppLayout>
    )
}
