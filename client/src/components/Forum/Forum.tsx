import { ForumDiscussion, UserAvatar } from '$components'
import { useGetUserMutation } from '$features/user'
import { CustomMenu } from '$layout'
import { ForumSkeleton } from '$skeletons'
import { useAppSelector } from '$store'
import { type Forum as ForumInterface, type User } from '$types'
import { ArrowDropDown, MoreVert, Reply, School } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { Avatar } from '@mui/material'
import { Box, Card, useTheme } from '@mui/material'
import { type ReactElement, useState, useEffect } from 'react'

export default function Forum({ 
    forum
}: {
    forum: ForumInterface,
}): ReactElement {
    const theme = useTheme()

    const [ favoriteClicked, setFavoriteCLicked ] = useState(false)
    const [ contentTextLength, setContentTextLength ] = useState<number | null>(forum?.description.length)

    const [ getUser, { data: user, isLoading } ] = useGetUserMutation()

    const variant: any = 'iconWrapper'

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<React.ReactNode[]>([])

    const open = Boolean(anchorEl)

    const loggedUser = useAppSelector(state => state.auth.user)
    const ownedPost = user?._id === loggedUser._id

    const handleClose = (): void => { setAnchorEl(null) }

    // TODO: ARRUMAR TAMANHO DE FORUNS
    // TODO ARRUMAR TAMANHO E AUJSTAGEM DE POSTS (completo)

    useEffect(() => {
        (async () => {
            await getUser(forum?.createdBy)
        })()
    }, [ getUser, forum?.createdBy ])

    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={5} p={5} width='100%'>
            {isLoading ? (
                <ForumSkeleton />
            ) : (
                <>
                    <Card variant="elevation" elevation={2} sx={{
                        minHeight: '18rem',
                        width: '50%',
                        display: 'flex',
                        fontSize: '10px',
                        borderRadius: 2,
                        bgcolor: 'background.secondary',
                        [theme.breakpoints.down('xl')]: {
                            width: '60%'
                        }
                    }}>
                        <Box 
                            sx={{
                                width: '100%',
                                [theme.breakpoints.down('xl')]: {
                                    p: 3
                                } 
                            }} 
                            p={4}
                        >
                            <Box mb='1rem' sx={{ minHeight: '7em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                        sx={{
                                            height: '5.6em',
                                            [theme.breakpoints.down('xl')]: {
                                                height: '4em'
                                            }
                                        }}
                                    >
                                        <UserAvatar 
                                            user={user as User}
                                        />
                                        <Avatar sx={{ position: 'relative', height: '1.75rem', width: '1.75rem', bottom: '1em', right: '0.5em', bgcolor: 'primary.dark', color: '' }}>
                                            <School />
                                        </Avatar>
                                    </Box>
                                    <Box sx={{ ml: '1rem' }}>
                                        <Typography sx={{ fontSize: '1rem' }}>@{user?.username}</Typography>
                                        <Typography sx={{ color: 'gray', fontSize: '1em' }}>{forum?.createdAt?.toString()}</Typography>
                                    </Box>
                                </Box>
                                <IconButton onClick={() => {}}>
                                    <MoreVert sx={{ fontSize: '1.2em' }} />
                                </IconButton>
                                <CustomMenu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    {menuContent}
                                </CustomMenu>
                            </Box>
                            <Box width='100%'>
                                <Box
                                    sx={{
                                        minHeight: '70%',
                                        [theme.breakpoints.down('xl')]: {
                                            minHeight: '60%'
                                        }
                                    }}
                                    display='flex' 
                                    gap='0.75rem' 
                                    flexDirection='column' 
                                    mt='1rem' 
                                    mb='2rem'
                                >
                                    <Typography variant='h5'>{forum?.title}</Typography>
                                    <Typography variant='body1' fontSize='1rem'>
                                        {contentTextLength !== null && contentTextLength >= 999 ? (
                                            <>
                                                {forum?.description.substring(0, 999) + '...'}
                                                <ArrowDropDown sx={{ cursor: 'pointer' }} onClick={() => { setContentTextLength(null) }} />
                                            </>
                                        ) : forum?.description
                                        }
                                    </Typography>
                                    {forum?.image &&
                                        <img src={forum?.image} alt={'imagem de ' + user?.username} />
                                    }
                                </Box>
                                <Box
                                    display='flex'
                                    width='100%'
                                    // sx={{
                                    //     height: '10%',
                                    //     [theme.breakpoints.down('xl')]: {
                                    //         height: '5%'
                                    //     }
                                    // }}
                                >
                                    <Box display='flex' width='100%' alignItems='flex-end' justifyContent='space-between'>
                                        <Box display='flex' gap={2}>
                                            <Avatar sx={{ bgcolor: 'background.paper' }} variant={variant}>
                                                <IconButton>
                                                    <Reply sx={{ transform: 'scaleX(-1)' }} />
                                                </IconButton>
                                            </Avatar>
                                        </Box>
                                        <Box display='flex'>
                                            <Avatar sx={{ borderRadius: 3.5, position: 'relative', left: '.75em', zIndex: 1 }} variant='rounded'>

                                            </Avatar>
                                            <Avatar sx={{ borderRadius: 3.5, position: 'relative', top: '.5em', zIndex: 1 }} variant='rounded'>

                                            </Avatar>
                                            <Avatar sx={{ borderRadius: 3.5, position: 'relative', right: '.75em', zIndex: 2 }} variant='rounded'>

                                            </Avatar>
                                            <Avatar 
                                                sx={{ fontSize: '1rem', position: 'relative', top: '.5em', right: '1.5em', zIndex: 1, bgcolor: 'background.paper' }} 
                                                variant={variant}
                                            >
                                                +11
                                            </Avatar>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                    <ForumDiscussion 
                        forum={forum }
                    />
                </>
            )}
        </Box>
    )
}