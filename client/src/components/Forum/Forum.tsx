import { UserAvatar } from "$components";
import { useGetForumMutation } from "$features/forum";
import { CustomMenu } from "$layout";
import { useAppSelector } from "$store";
import { type Forum as ForumInterface, User } from "$types";
import { ArrowDropDown, ChatBubbleRounded, CloseSharp, Favorite, FavoriteBorder, MoreVert, Reply } from "@mui/icons-material";
import { IconButton, MenuItem, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { Box, Card, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    const onClickEvents = {
        like: () => {
            console.log('oi')
            handleClose()
        },

        follow: () => {
            console.log('tcchau')
            handleClose()
        },

        unfollow: () => {
            console.log('tcchau')
            handleClose()
        },

        report: () => {
            handleSnackbarOpen()
            handleClose()
        },

        goToPost: () => {
            console.log('tcchau')
            handleClose()
        }
    }

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<React.ReactNode[]>([])
    const [ snackbarOpen, setSnackbarOpen ] = useState<boolean>(false)
    const [ backdropOpen, setBackdropOpen ] = useState<boolean>(false)
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)

    const open = Boolean(anchorEl)

    const loggedUser = useAppSelector(state => state.auth.user)

    const handleBackdropClose = (): void => { setBackdropOpen(false) }
    const handleBackdropOpen = (): void => { setBackdropOpen(true) }

    const handleModalClose = (): void => { setModalOpen(false) }
    const handleModalOpen = (): void => { setModalOpen(true) }

    const ownedPost = user._id === loggedUser._id

    const handleClick = (e: any, elements: string[], onClickEventListeners = elements.map(() => handleClose), icons: ReactElement[] = []): void => {
        const mapedElements: React.ReactNode[] = elements.map((el, i) =>
            <MenuItem onClick={onClickEventListeners[i]} key={i} disableRipple>{icons?.[i]}{el}</MenuItem>
        )

        setMenuContent(mapedElements)
        
        if (ownedPost) {
            setMenuContent([
                ...mapedElements,
                <MenuItem sx={{ color: red[600] }} onClick={() => { handleModalOpen(); handleClose() }} key={-1} disableRipple>Deletar publicação</MenuItem>
            ])
        }

        setAnchorEl(e.currentTarget)
    }

    const handleClose = (): void => { setAnchorEl(null) }

    const handleSnackbarOpen = (): void => { setSnackbarOpen(true) }
    const handleSnackbarClose = (): void => { setSnackbarOpen(false) }

    return (
        <Box display='flex' justifyContent='center' p={5} height='100%' width='100%'>
            <Card variant="elevation" elevation={2} sx={{
                minHeight: '50%',
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                fontSize: '10px',
                bgcolor: 'background.secondary',
                [theme.breakpoints.down('xl')]: {
                    width: '60%'
                }
            }}>
                <Box 
                    sx={{
                        width: '100%',
                        height: '100%',
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
                                <Typography sx={{ fontSize: '1.25rem' }}>{forum?.title}</Typography>
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
                    <Box width='100%' height='100%'>
                        <Box
                            sx={{
                                minHeight: '70%',
                                [theme.breakpoints.down('xl')]: {
                                    minHeight: '60%'
                                }
                            }}
                            minHeight='70%' 
                            display='flex' 
                            gap='1rem' 
                            flexDirection='column' 
                            mt='1rem' 
                            mb='2rem'
                        >
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
                                <img src={GET_IMAGE(content?.picture?.filename)} alt={'imagem de ' + user.username} />
                            }
                        </Box>
                        <Box>
                            <Box
                                display='flex'
                                alignItems='end'
                                width='100%'
                                sx={{
                                    height: '10%',
                                    [theme.breakpoints.down('xl')]: {
                                        height: '5%'
                                    }
                                }}
                            >
                                <Box display='flex' width='100%' justifyContent='space-between' sx={{ height: '5em', mt: '1.5em' }}>
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
                                    <Box>
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
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}