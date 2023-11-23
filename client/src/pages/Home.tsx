import { Alert, Avatar, Box, Snackbar, Typography, useTheme } from '@mui/material'
import { ClipsWrapper, Post, SideComponent } from '$components'
import { Add, AttachFile } from '@mui/icons-material'
import { AppLayout, CustomInput } from '$layout'
import { useEffect, type ReactElement, type FormEvent, useState, type ChangeEvent } from 'react'
import { PostSkeleton } from '$skeletons'
import johnDoe from '$assets/img/paraPiada/john_doe.png'
import { useCreatePostMutation, useFetchPostsMutation } from '$features/post'
import { useAppSelector } from '$store'
import { useUploadPictureMutation } from '$features/pictures'
import { MulterFile } from '$types'
export default function Home(): ReactElement {
    const theme = useTheme()

    const [ fetchPosts, { isLoading, data: posts } ] = useFetchPostsMutation()
    const [ uploadPicture, { data } ] = useUploadPictureMutation()
    const [ createPost ] = useCreatePostMutation()

    const [ postContent, setPostContent ] = useState<{ text?: string, picture?: File }>()
    const [ snackbarOpen, setSnackbarOpen ] = useState<boolean>(false)

    const user = useAppSelector(state => state.auth.user)

    const handleSnackbarOpen = (): void => { setSnackbarOpen(true) }
    const handleSnackbarClose = (): void => { setSnackbarOpen(false) }

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault()

        const formData = new FormData()

        if ((postContent?.picture?.size ?? 0) >= 6000000) {
            handleSnackbarOpen()
        } else {
            if (postContent?.picture) {
                formData.append('name', JSON.stringify(user?.name ?? ''))
                formData.append('userId', JSON.stringify(user?._id ?? ''))
                formData.append('at', JSON.stringify({ id: '123456789', type: 'post' }))
                formData.append('file', postContent?.picture ?? '')
                await uploadPicture(formData)
            }

            await createPost({
                name: 'a',
                postedBy: user,
                description: 'a',
                content: {
                    text: postContent?.text,
                    picture: postContent?.picture ? data?.file : undefined
                },
                postedAt: new Date().toLocaleDateString()
            })
        }

    }

    useEffect(() => {
        (async () => {
            await fetchPosts(null)
        })()
    }, [ fetchPosts ])

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
                            : posts?.map((post: any) => (
                                <Post
                                    key={post._id}
                                    content={post.content}
                                    date={post.postedAt}
                                    user={post.postedBy}
                                />
                            ))
                        }
                        <Post
                            content={{
                                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor saepe labore adipisci obcaecati cupiditate magnam neque doloremque dignissimos, rem deleniti modi ad sapiente itaque explicabo qui quidem, assumenda ab facilis esse sunt dolores sequi! Voluptatum facere quas nemo rem voluptatibus placeat ullam deleniti eveniet assumenda et, similique inventore! Vero exercitationem neque, esse officiis deleniti est incidunt atque a. Incidunt aperiam aut necessitatibus fuga ea, neque vero voluptatem ipsam? Ipsam consectetur blanditiis ipsa aliquid? Perferendis illo fugiat molestiae saepe a dicta odio rem quod laudantium. Iusto, exercitationem. Dolore expedita provident totam voluptas nam enim suscipit? Deleniti dicta harum tempore quod rem a fugiat. Aliquam at doloribus modi enim nesciunt optio alias repudiandae vero iure voluptatum nisi saepe asperiores ad amet laudantium veniam reiciendis, sapiente atque! Deleniti praesentium doloremque id incidunt, quis eos et adipisci consequuntur a dicta suscipit. Quibusdam odit optio, iure veniam rerum ipsa harum consequuntur sit suscipit perspiciatis ex quaerat dicta vitae officiis nesciunt. Itaque quas, sed possimus sequi mollitia ullam ipsam, aspernatur facilis accusantium esse, fugit inventore cumque architecto consectetur error corrupti ipsum quam. Pariatur omnis velit iusto corrupti, quibusdam distinctio natus ab placeat aut saepe impedit explicabo fuga perspiciatis nobis facere, porro eos, repellendus hic nemo quod.'
                            }}
                            date={'04/11/2023'}
                            user={{ name: 'John Doe', otherInfo: { avatar: johnDoe } }}
                        />
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
        </AppLayout>
    )
}
