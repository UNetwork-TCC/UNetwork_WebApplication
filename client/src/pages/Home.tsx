import { Avatar, Box, Typography, useTheme } from '@mui/material'
import { ClipsWrapper, Post } from '$components'
import { Add, AttachFile } from '@mui/icons-material'
import { AppLayout, CustomInput } from '$layout'
import { useEffect, type ReactElement } from 'react'
import { PostSkeleton } from '$skeletons'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import johnDoe from '$assets/img/paraPiada/john_doe.png'
import { useFetchPostsMutation } from '$features/post'
import { useAppSelector } from '$store'
export default function Home(): ReactElement {
    const theme = useTheme()

    const navigate = useNavigate()

    const [ fetchPosts, { isLoading, data: posts } ] = useFetchPostsMutation()

    const user = useAppSelector(state => state.auth)

    console.log(user)
    
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
                            : posts?.map(post => (
                                <Post
                                    key={post._id}
                                    content={post.content}
                                    date={post.postedAt}
                                    user={{ name: post.postedBy?.name }}
                                />
                            ))
                        }
                        <Post
                            content={{
                                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor saepe labore adipisci obcaecati cupiditate magnam neque doloremque dignissimos, rem deleniti modi ad sapiente itaque explicabo qui quidem, assumenda ab facilis esse sunt dolores sequi! Voluptatum facere quas nemo rem voluptatibus placeat ullam deleniti eveniet assumenda et, similique inventore! Vero exercitationem neque, esse officiis deleniti est incidunt atque a. Incidunt aperiam aut necessitatibus fuga ea, neque vero voluptatem ipsam? Ipsam consectetur blanditiis ipsa aliquid? Perferendis illo fugiat molestiae saepe a dicta odio rem quod laudantium. Iusto, exercitationem. Dolore expedita provident totam voluptas nam enim suscipit? Deleniti dicta harum tempore quod rem a fugiat. Aliquam at doloribus modi enim nesciunt optio alias repudiandae vero iure voluptatum nisi saepe asperiores ad amet laudantium veniam reiciendis, sapiente atque! Deleniti praesentium doloremque id incidunt, quis eos et adipisci consequuntur a dicta suscipit. Quibusdam odit optio, iure veniam rerum ipsa harum consequuntur sit suscipit perspiciatis ex quaerat dicta vitae officiis nesciunt. Itaque quas, sed possimus sequi mollitia ullam ipsam, aspernatur facilis accusantium esse, fugit inventore cumque architecto consectetur error corrupti ipsum quam. Pariatur omnis velit iusto corrupti, quibusdam distinctio natus ab placeat aut saepe impedit explicabo fuga perspiciatis nobis facere, porro eos, repellendus hic nemo quod.'
                            }}
                            date={'04/11/2023'}
                            user={{ name: 'John Doe', avatar: johnDoe }}
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
                        <Box height='100%' display='flex' flexDirection='column' gap={2}>
                            <Box display='flex' gap={2}>
                                <Avatar></Avatar>
                                <Box display='flex' flexDirection='column'>
                                    <Typography variant='body1'>@vitronks</Typography>
                                    <Typography variant='caption'>Vitor Hugo Rodrigues dos Santos</Typography>
                                </Box>
                            </Box>
                            <Box display='flex' flexDirection='column'>
                                <Typography>Brasil, São Paulo</Typography>
                                <Typography>+11 992253966</Typography>
                            </Box>
                            <Box height='100%' display='flex' justifyContent='end' flexDirection='column'>
                                <Button onClick={() => { navigate('/app/profile') }} variant='contained'>Ver perfil</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    )
}
