import { UserAvatar } from '$components'
import { useGetForumMutation } from '$features/forum'
import { CustomMenu } from '$layout'
import { useAppSelector } from '$store'
import { type Forum as ForumInterface, type User } from '$types'
import { ArrowDropDown, ChatBubbleRounded, CloseSharp, Favorite, FavoriteBorder, MoreVert, Reply } from '@mui/icons-material'
import { IconButton, MenuItem, Typography } from '@mui/material'
import { Avatar } from '@mui/material'
import { Box, Card, useTheme } from '@mui/material'
import { red } from '@mui/material/colors'
import { type ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Forum({ 
    forum,
    user
}: {
    forum: ForumInterface,
    user: User 
}): ReactElement {
    const theme = useTheme()

    const [ favoriteClicked, setFavoriteCLicked ] = useState(false)
    const [ contentTextLength, setContentTextLength ] = useState<number | null>(forum?.description.length)

    const variant: any = 'iconWrapper'

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<React.ReactNode[]>([])

    const open = Boolean(anchorEl)

    const loggedUser = useAppSelector(state => state.auth.user)

    const handleModalClose = (): void => { setModalOpen(false) }
    const handleModalOpen = (): void => { setModalOpen(true) }

    const ownedPost = user._id === loggedUser._id

    const handleClose = (): void => { setAnchorEl(null) }

    // TODO: ARRUMAR TAMANHO DE FORUNS
    // TODO ARRUMAR TAMANHO E AUJSTAGEM DE POSTS 

    return (
        <Box display='flex' justifyContent='center' p={5} width='100%'>
            <Card variant="elevation" elevation={2} sx={{
                minHeight: '27.5rem',
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
                                    user={user}
                                />
                                <Avatar sx={{ position: 'relative', height: '1.75rem', width: '1.75rem', bottom: '1em', right: '0.5em', bgcolor: 'primary.dark', color: '' }}>
                                    {user?.otherInfo?.grade}
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
                            gap='1rem' 
                            flexDirection='column' 
                            mt='1rem' 
                            mb='2rem'
                        >
                            <Typography variant='h4'>{forum?.title}</Typography>
                            <Typography variant='body1' fontSize='1rem'>
                                {contentTextLength !== null && contentTextLength >= 999 ? (
                                        <>
                                            {forum?.description.substring(0, 999) + '...'}
                                            <ArrowDropDown sx={{ cursor: 'pointer' }} onClick={() => { setContentTextLength(null) }} />
                                        </>
                                    ) : forum?.description
                                }
                            </Typography>
                            {forum?.picture &&
                                <img src={forum?.picture?.src} alt={'imagem de ' + user.username} />
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
                                    {!ownedPost && (
                                        <Avatar sx={{ bgcolor: 'background.paper' }} variant={variant}>
                                            <IconButton onClick={() => { setFavoriteCLicked(val => !val) }}>
                                                {favoriteClicked ?
                                                    <Favorite sx={{ color: 'red' }} /> :
                                                    <FavoriteBorder/>
                                                }
                                            </IconButton>
                                        </Avatar>
                                    )}
                                    <Avatar sx={{ bgcolor: 'background.paper' }} variant={variant}>
                                        <IconButton>
                                            <ChatBubbleRounded />
                                        </IconButton>
                                    </Avatar>

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
        </Box>
    )
}