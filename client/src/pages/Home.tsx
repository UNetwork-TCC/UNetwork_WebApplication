import { Avatar, Box, IconButton, Link as MuiLink, Stack, useTheme } from '@mui/material'
import { ClipsWrapper, Post } from '$components'
import { Add, AttachFile, ArrowDropUp } from '@mui/icons-material'
import { AppLayout, CustomInput } from '$layout'
import roubo from '$assets/img/paraPiada/roubo.jpg'
import james from '$assets/img/paraPiada/james.jpg'
import { type ReactElement } from 'react'

// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

export default function Home(): ReactElement {
    const theme = useTheme()

    // useEffect(() => {
    //     if (!localStorage.getItem('user'))
    //         navigate('/auth')
    // })

    function StyledButton({ name, icon }: { name: string, icon: React.ReactNode }): ReactElement {
        return (
            <MuiLink href={`#${name}`}>
                <IconButton disableRipple sx={{ bgcolor: 'primary.main', color: 'white' }}>
                    {icon}
                </IconButton>
            </MuiLink>
        )
    }

    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' alignItems='center' flexDirection='column' p={3} mt={5} width='70%' height='100%' id="topo" sx={{ m:'0 12.5%' }}>
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
                    <Post
                        title={'Post'}
                        date={'Agora há pouco'}
                        content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum aspernatur illo possimus dolorum dolore molestiae dignissimos cupiditate quas laudantium quis excepturi, praesentium culpa tenetur magnam inventore. Pariatur magni nobis voluptatibus.'
                        user={{ name: 'Usuário' }}
                    />

                    <Post
                        title={'Post'}
                        date={'3 horas atrás'}
                        content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum aspernatur illo possimus dolorum dolore molestiae dignissimos cupiditate quas laudantium quis excepturi, praesentium culpa tenetur magnam inventore. Pariatur magni nobis voluptatibus.'
                        user={{ name: 'Usuário' }}
                    />
                </Box>
            </Box>
            <Box sx={{ height: '100%', display: 'flex', position: 'sticky', top: 0, left: 200,flexDirection:'column-reverse' }}>
                <Stack sx={{ position:'relative', bottom: 40 }} gap={6}>
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
