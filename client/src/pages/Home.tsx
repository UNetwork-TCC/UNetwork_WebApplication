/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Avatar, Box, Snackbar, type SxProps, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ClipsWrapper, Post, SideComponent } from '$components'
import { Add, AttachFile } from '@mui/icons-material'
import { AppLayout, CustomInput, LoadingBackdrop } from '$layout'
import { useEffect, type ReactElement, type FormEvent, useState, type ChangeEvent } from 'react'
import { PostSkeleton } from '$skeletons'
import { useCreatePostMutation, useFetchPostsMutation } from '$features/post'
import { useAppSelector } from '$store'
import { useUploadFileMutation } from '$features/file'
import { type MulterFile, type Picture } from '$types'
import { useUpdateUserMutation } from '$features/user'

export default function Home(): ReactElement {
    const theme = useTheme()

    const [ fetchPosts, { isLoading, data: posts } ] = useFetchPostsMutation()
    const [ uploadPicture ] = useUploadFileMutation()
    const [ createPost ] = useCreatePostMutation()
    const [ updateUser ] = useUpdateUserMutation()

    const [ postContent, setPostContent ] = useState<{ text?: string, picture?: Partial<MulterFile> & Partial<Picture> & File }>()
    const [ snackbarOpen, setSnackbarOpen ] = useState<boolean>(false)

    const user = useAppSelector(state => state.auth.user)

    const handleSnackbarOpen = (): void => { setSnackbarOpen(true) }
    const handleSnackbarClose = (): void => { setSnackbarOpen(false) }

    const [ loading, setLoading ] = useState<boolean>(false)

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        setLoading(true)

        if (!postContent?.text && !postContent?.picture) {
            setLoading(false)
            alert('Você precisa de pelo menos um conteúdo para publicar!')
            return
        }

        let data: any

        if ((postContent?.picture?.size ?? 0) >= 32000000) {
            handleSnackbarOpen()
        } else {
            let picture: any
            const reader = new FileReader()

            if (postContent?.picture) {
                let picture64Based: string | ArrayBuffer | null = ''

                reader.addEventListener('load', () => {
                    picture64Based = reader.result
                })
    
                reader.readAsDataURL(postContent.picture)

                setTimeout(() => {
                    (async () => {
                        picture = await uploadPicture({
                            userId: user?._id ?? '',
                            at: { id: 'null', type: 'post' },
                            file64Based: picture64Based as string
                        })

                        data = await createPost({
                            postedBy: user._id ?? '',
                            postedIn: 'feed',
                            content: {
                                text: postContent?.text,
                                picture: picture?.data?.src ?? null
                            }
                        })

                        await updateUser({
                            _id: user._id ?? '',
                            posts: [
                                ...user.posts,
                                data.postUpdates
                            ]
                        })

                        setLoading(false)
                    })()
                }, 100)
            } else {
                data = await createPost({
                    postedBy: user._id ?? '',
                    postedIn: 'feed',
                    content: {
                        text: postContent?.text
                    }
                })
            }

            await updateUser({
                _id: user._id ?? '',
                posts: [
                    ...user.posts,
                    data.postUpdates
                ]
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!loading) {
            (async () => {
                await fetchPosts(null)
            })()
        }
    }, [ loading, fetchPosts ])

    const closeBackdrop = (): void => { setLoading(false) }

    const fileInputStyle: SxProps = {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        position: 'relative',
        width: '50px',
        bottom: 47
    }

    return (
        <AppLayout>
            <Box
                display='flex'
                justifyContent='center'
                width='100%'
            >
                <Box 
                    width={matches ? '100%' : '50%'} 
                    height='100%'
                    display='flex' 
                    justifyContent='start' 
                    alignItems='center' 
                    flexDirection='column' 
                    p={3} 
                    m={!matches ? 5 : 2} 
                    sx={{
                        [theme.breakpoints.only('md')]: {
                            width:'60%', ml:'15%' 
                        }
                    }}
                >
                    <Box display='flex' flexDirection='column' gap={5} width='100%' id="inicio">
                        {/* <ClipsWrapper /> */}
                        <Box>
                            <form onSubmit={(e) => { handleSubmit(e) }}>
                                <CustomInput
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => { setPostContent({ ...postContent, text: e.target.value }) }}
                                    sx={{ boxShadow: theme.shadows[4] }}
                                    width='80%'
                                    bgcolor={theme.palette.mode === 'light' ? 'white' : undefined}
                                    placeholder='No que estou pensando...'
                                    color={theme.palette.mode === 'light' ? 'primary.main' : undefined}
                                    iconColor='#dbdbdb'
                                    icon={<Add />}
                                    multiline
                                />
                                <Box
                                    sx={!matches ? {
                                        ...fileInputStyle,
                                        right: '4rem',
                                        [theme.breakpoints.down('xl')]: {
                                            bottom: 44,
                                            right: '5.25rem'
                                        },
                                        [theme.breakpoints.down('lg')]: {
                                            right:'4rem',
                                            bottom: 41
                                        }
                                    } : {
                                        ...fileInputStyle,
                                        left: '85%',
                                        bottom: 43.5
                                    }}>
                                    <input
                                        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                setPostContent({ ...postContent, picture: file })
                                            }
                                        }} 
                                        style={{ display: 'none' }} 
                                        type='file' 
                                        id='file' 
                                        accept='image/*' 
                                    />
                                    <Box position='relative' left='2.5rem' display='flex' flexDirection='column'>
                                        <Avatar
                                            component='label'
                                            htmlFor='file'
                                            sx={{
                                                cursor: 'pointer',
                                                transition: '.3s',
                                                bgcolor: 'primary.main',
                                                ':hover': {
                                                    bgcolor: 'primary.light'
                                                },
                                                [theme.breakpoints.down('lg')]: {
                                                    width:'35px',
                                                    height:'35px'
                                                },
                                                [theme.breakpoints.down('lg')]: {
                                                    width:'35px',
                                                    height:'35px'
                                                }
                                            }}
                                        >
                                            <AttachFile />
                                        </Avatar>
                                        <Box width='80px' position='relative'>
                                            {postContent?.picture && (
                                                <Typography 
                                                    variant='body2' 
                                                    position='relative'
                                                    right='1.5rem'
                                                    top='10px'
                                                    noWrap
                                                    width='100%'
                                                >{ postContent.picture.name }</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                    <Box 
                        display='flex' 
                        flexDirection='column' 
                        justifyContent='center' 
                        alignItems='center' 
                        width='100%' 
                        m={!matches ? 5 : 1}
                    >
                        { isLoading
                            ? (
                                <>
                                    <PostSkeleton />
                                    <PostSkeleton />
                                    <PostSkeleton />
                                </>   
                            )
                            : posts?.slice(0).reverse().map((post) => (
                                <Post
                                    key={post._id}
                                    id={post._id ?? ''}
                                    content={post.content}
                                    date={post.postedAt}
                                    postedBy={post.postedBy}
                                />
                            ))
                        }
                    </Box>
                </Box>
                {!matches && (
                    <Box
                        sx={{
                            width: '20%',
                            [theme.breakpoints.down('xl')]: {
                                width: '25%'
                            },
                            [theme.breakpoints.down('lg')]:{
                                ml:'-3%'
                            }
                        }}
                        display='flex'
                        justifyContent='center'
                        height='100%' 
                        p={3} 
                        m={5} 
                    >
                        <Box 
                            bgcolor='background.paper'
                            borderRadius={5}
                            height='15rem'
                            width='100%'
                            boxShadow={theme.shadows[15]}
                            p={3}
                            sx={{ [theme.breakpoints.down('lg')]: { height:'16rem' } }}
                        >
                            <SideComponent user={user} />
                        </Box>
                    </Box>
                )}
            </Box>
            <Snackbar 
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
            >
                <Alert onClose={handleSnackbarClose} severity='error'>
                    A imagem colocada excede os limites de tamanho (32mb)!
                </Alert>
            </Snackbar>
            <LoadingBackdrop 
                open={loading}
                handleClose={closeBackdrop}
            />
        </AppLayout>
    )
}
