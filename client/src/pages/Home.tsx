/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Avatar, Box, Snackbar, Typography, useTheme } from '@mui/material'
import { ClipsWrapper, Post, SideComponent } from '$components'
import { Add, AttachFile } from '@mui/icons-material'
import { AppLayout, CustomInput, LoadingBackdrop } from '$layout'
import { useEffect, type ReactElement, type FormEvent, useState, type ChangeEvent } from 'react'
import { PostSkeleton } from '$skeletons'
import { useCreatePostMutation, useFetchPostsMutation } from '$features/post'
import { useAppSelector } from '$store'
import { useUploadPictureMutation } from '$features/pictures'
import { type MulterFile, type Picture } from '$types'
import johnDoe from '$assets/img/paraPiada/john_doe.png'
export default function Home(): ReactElement {
    const theme = useTheme()

    const [ fetchPosts, { isLoading, data: posts } ] = useFetchPostsMutation()
    const [ uploadPicture ] = useUploadPictureMutation()
    const [ createPost ] = useCreatePostMutation()

    const [ postContent, setPostContent ] = useState<{ text?: string, picture?: Partial<MulterFile> & Partial<Picture> & File }>()
    const [ snackbarOpen, setSnackbarOpen ] = useState<boolean>(false)

    const user = useAppSelector(state => state.auth.user)

    const handleSnackbarOpen = (): void => { setSnackbarOpen(true) }
    const handleSnackbarClose = (): void => { setSnackbarOpen(false) }

    const [ loading, setLoading ] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        let picture: any

        if ((postContent?.picture?.size ?? 0) >= 8000000) {
            handleSnackbarOpen()
        } else {
            console.log(postContent?.picture)

            if (postContent?.picture) {
                formData.append('name', JSON.stringify(user?.username ?? ''))
                formData.append('userId', JSON.stringify(user?._id ?? ''))
                formData.append('at', JSON.stringify({ id: '123456789', type: 'post' }))
                formData.append('file', postContent?.picture ?? '')
                picture = await uploadPicture(formData)
            }

            console.log(picture)

            await createPost({
                postedBy: user._id ?? '',
                postedIn: 'feed',
                content: {
                    text: postContent?.text,
                    picture: picture?.data?.file ?? null
                }
            })
            
            setLoading(false)
        }
    }

    useEffect(() => {
        (async () => {
            await fetchPosts(null)
        })()
    }, [ fetchPosts ])

    useEffect(() => {
        if (!loading) {
            (async () => {
                await fetchPosts(null)
            })()
        }
    }, [ loading ])

    const closeBackdrop = (): void => { setLoading(false) }

    return (
        <AppLayout>
            <Box
                display='flex'
                justifyContent='center'
                width='100%'
            >
                <Box 
                    width='50%' 
                    height='100%'
                    display='flex' 
                    justifyContent='start' 
                    alignItems='center' 
                    flexDirection='column' 
                    p={3} 
                    m={5} 
                >
                    <Box display='flex' flexDirection='column' gap={5} width='100%' id="inicio">
                        <ClipsWrapper />
                        <Box>
                            <form onSubmit={(e) => { handleSubmit(e) }}>
                                <CustomInput
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => { setPostContent({ ...postContent, text: e.target.value }) }}
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
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%' m={5}>
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
                <Box
                    sx={{
                        width: '20%',
                        [theme.breakpoints.down('xl')]: {
                            width: '25%'
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
                    >
                        <SideComponent user={user} />
                    </Box>
                </Box>
            </Box>
            <Snackbar 
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
            >
                <Alert onClose={handleSnackbarClose} severity='error'>
                    A imagem colocada excede os limites de tamanho (6mb)!
                </Alert>
            </Snackbar>
            <LoadingBackdrop 
                open={loading}
                handleClose={closeBackdrop}
            />
        </AppLayout>
    )
}
