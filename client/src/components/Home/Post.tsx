import { FavoriteBorder, Favorite, ChatBubbleRounded, Reply, MoreVert, ArrowDropDown, CloseSharp, School } from '@mui/icons-material'
import { Avatar, Box, Card, IconButton, MenuItem, Skeleton, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { type ReactElement, useState, useEffect, type FormEvent } from 'react'
import { CreateShortcutsModal, CustomMenu, LoadingBackdrop, WarningModal } from '$layout'
import { useAppSelector } from '$store'
import { useDeletePostMutation, useUpdatePostMutation } from '$features/post'
import { red } from '@mui/material/colors'
import { UserAvatar } from '$components'
import { useGetUserMutation } from '$features/user'
import { type User } from '$types'
import { useNavigate } from 'react-router-dom'

export default function Post({
    date,
    content,
    degree,
    postedBy,
    id
}: {
    date: Date | string | undefined,
    content: {
        text?: string,
        picture?: string
    },
    degree?: string,
    postedBy: string,
    id: string,
}): ReactElement {
    const theme = useTheme()
    const [ favoriteClicked, setFavoriteCLicked ] = useState(false)
    const [ contentTextLength, setContentTextLength ] = useState(content?.text?.length)

    const navigate = useNavigate()

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
            navigate('/app/post/' + id)
        },

        favorite: () => {
            handleClose()
        },

        saveAsShortcut: () => {
            handleClose()
            handleShortcutModalOpen()
        }
    }

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<React.ReactNode[]>([])
    const [ snackbarOpen, setSnackbarOpen ] = useState<boolean>(false)
    const [ backdropOpen, setBackdropOpen ] = useState<boolean>(false)
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const [ shortcutModalOpen, setShortcutModalOpen ] = useState<boolean>(false)
    const [ displayMessageChat, setDisplayMessageChat ] = useState<boolean>(false)
    const [ comment, setComment ] = useState<string>('')

    const open = Boolean(anchorEl)

    const loggedUser = useAppSelector(state => state.auth.user)

    const [ getUser, { isLoading } ] = useGetUserMutation()
    const [ deletePost ] = useDeletePostMutation()
    const [ updatePost ] = useUpdatePostMutation()

    const handleBackdropClose = (): void => { setBackdropOpen(false) }
    const handleBackdropOpen = (): void => { setBackdropOpen(true) }

    const handleModalClose = (): void => { setModalOpen(false) }
    const handleModalOpen = (): void => { setModalOpen(true) }

    const handleShortcutModalClose = (): void => { setShortcutModalOpen(false) }
    const handleShortcutModalOpen = (): void => { setShortcutModalOpen(true) }

    const postOwner = postedBy === loggedUser._id

    const [ user, setUser ] = useState<User | null>(null)

    const handleClick = (e: any, elements: string[], onClickEventListeners = elements.map(() => handleClose), icons: ReactElement[] = []): void => {
        const mapedElements: React.ReactNode[] = elements.map((el, i) =>
            <MenuItem onClick={onClickEventListeners[i]} key={i} disableRipple>{icons?.[i]}{el}</MenuItem>
        )

        setMenuContent(mapedElements)

        if (postOwner) {
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        (async () => {
            e.preventDefault()
            handleModalClose()
            handleBackdropOpen()
            await updatePost({
                _id: id,
                comments: [
                    {
                        sendedBy: loggedUser._id ?? '',
                        content: comment,
                        sendedIn: 'post',
                        sendedAt: new Date().toString(),
                        type: 'text'
                    }
                ]
            })
            handleBackdropClose()
            location.reload()
        })()
    }

    const onConfirm = (): void => {
        (async () => {
            handleModalClose()
            handleBackdropOpen()

            await deletePost(id)
            
            handleBackdropClose()
            location.reload()
        })()
    }

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
        >
            <CloseSharp fontSize="small" />
        </IconButton>
    )

    useEffect(() => {
        (async () => {
            const response: any = await getUser(postedBy)

            setUser(response.data)
        })()
    }, [ getUser, postOwner, postedBy ])

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <>
            <Card variant="elevation" elevation={2} sx={{
                minHeight: '32.5rem',
                width: '75%',
                [theme.breakpoints.down('xl')]: {
                    width: '85%'
                },
                borderRadius: '15px',
                display: 'flex',
                fontSize: '10px',
                bgcolor: 'background.secondary',
                mb: '3em'
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
                    <Box sx={{ minHeight: !matches ? '7em' : '4rem', display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex' }}>
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
                                    isLoading={isLoading}
                                />
                                <Avatar sx={{ position: 'relative', height: '1.75rem', width: '1.75rem', bottom: '1em', right: '0.5em', bgcolor: 'primary.dark', color: '' }}>
                                    <School />
                                </Avatar>
                            </Box>
                            <Box sx={{ ml: '1rem' }}>
                                {isLoading ? (
                                    <Box width='10rem'>
                                        <Skeleton variant='text' />
                                        <Skeleton variant='text' />
                                    </Box>
                                ) : (
                                    <>
                                        <Typography sx={{ fontSize: '1rem' }}>@{user?.username}</Typography>
                                        <Typography sx={{ color: 'gray', fontSize: '0.75rem' }}>{date?.toString()}</Typography>
                                    </>
                                )}
                            </Box>
                        </Box>
                        <IconButton 
                            onClick={
                                e => {
                                    handleClick(e,
                                        [ 'Salvar como Atalho', 'Favoritar', 'Seguir/Desseguir', 'Denunciar', 'Ir para publicação' ],
                                        [ onClickEvents.saveAsShortcut, onClickEvents.favorite, onClickEvents.follow, onClickEvents.report, onClickEvents.goToPost ]
                                    )
                                }
                            }
                            sx={{ 
                                position: 'relative', 
                                [theme.breakpoints.down('md')]: {
                                    bottom: 8
                                } 
                            }} 
                        >
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
                            mt={1.5}
                            minHeight='70%'
                            display='flex'
                            gap='1rem'
                            flexDirection='column'
                        >
                            <Typography
                                whiteSpace='pre-wrap'
                                fontSize='1rem'
                                variant='body1'
                            >
                                {contentTextLength !== undefined && contentTextLength >= 999 ? (
                                    <>
                                        {content?.text?.substring(0, 999) + '...'}
                                        <ArrowDropDown sx={{ cursor: 'pointer' }} onClick={() => { setContentTextLength(undefined) }} />
                                    </>
                                ) : content?.text
                                }
                            </Typography>
                            {content?.picture &&
                                <img src={content.picture} alt={'imagem de ' + user?.username} />
                            }
                        </Box>
                        {/* <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                                mt: 5,
                                mb: 5
                            }}
                        >
                            <Box component='form' sx={{
                                display: displayMessageChat ? 'flex' : 'none',
                                flexDirection: 'column',
                                gap: 3,
                                mb: 2
                            }}>
                                <CustomInput
                                    multiline
                                    icon={<Send onClick={handleSubmit} />}
                                    placeholder='Comente algo...'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setComment(e.currentTarget.value) }}
                                />
                            </Box>
                            <Box sx={{}}>
                                <MiscMessage />
                            </Box>
                        </Box> */}
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
                                <Box display='flex' width='100%' justifyContent='space-between' sx={{ mt: '1.5em' }}>
                                    <Box display='flex' gap={2}>
                                        {!postOwner && (
                                            <Avatar 
                                                sx={{ 
                                                    bgcolor: 'background.paper',
                                                    [theme.breakpoints.down('md')]: {
                                                        height: 30,
                                                        width: 30,
                                                        borderRadius: 2.5
                                                    }
                                                }} 
                                                variant={variant}
                                            >
                                                <IconButton onClick={() => { setFavoriteCLicked(val => !val) }}>
                                                    {favoriteClicked ?
                                                        <Favorite sx={{ color: 'red' }} /> :
                                                        <FavoriteBorder />
                                                    }
                                                </IconButton>
                                            </Avatar>
                                        )}
                                        <Avatar 
                                            onClick={() => { setDisplayMessageChat(prevState => !prevState) }} 
                                            sx={{ 
                                                bgcolor: 'background.paper',
                                                [theme.breakpoints.down('md')]: {
                                                    height: 30,
                                                    width: 30,
                                                    borderRadius: 2.5
                                                } 
                                            }} 
                                            variant={variant}
                                        >
                                            <IconButton>
                                                <ChatBubbleRounded />
                                            </IconButton>
                                        </Avatar>

                                        <Avatar 
                                            sx={{ 
                                                bgcolor: 'background.paper',
                                                [theme.breakpoints.down('md')]: {
                                                    height: 30,
                                                    width: 30,
                                                    borderRadius: 2.5
                                                }
                                            }} 
                                            variant={variant}
                                        >
                                            <IconButton>
                                                <Reply sx={{ transform: 'scaleX(-1)' }} />
                                            </IconButton>
                                        </Avatar>
                                    </Box>
                                    <Box>
                                        <Box position='relative' left={matches ? '1.75rem' : ''} display='flex'>
                                            <Avatar 
                                                sx={{ 
                                                    borderRadius: 3.5, 
                                                    position: 'relative', 
                                                    left: '.75em', 
                                                    zIndex: 1,
                                                    [theme.breakpoints.down('xl')]: {
                                                        height: 30,
                                                        width: 30,
                                                        borderRadius: 2.5
                                                    }
                                                }} 
                                                variant='rounded' 
                                            />
                                            <Avatar 
                                                sx={{ 
                                                    borderRadius: 3.5, 
                                                    position: 'relative', 
                                                    top: '.5em', 
                                                    zIndex: 1,
                                                    [theme.breakpoints.down('xl')]: {
                                                        height: 30,
                                                        width: 30,
                                                        borderRadius: 2.5
                                                    }
                                                }} 
                                                variant='rounded' 
                                            />
                                            <Avatar 
                                                sx={{ 
                                                    borderRadius: 3.5, 
                                                    position: 'relative', 
                                                    right: '.75em', 
                                                    zIndex: 1,
                                                    [theme.breakpoints.down('xl')]: {
                                                        height: 30,
                                                        width: 30,
                                                        borderRadius: 2.5
                                                    } 
                                                }} 
                                                variant='rounded' 
                                            />
                                            <Avatar
                                                sx={{ 
                                                    fontSize: '1rem', 
                                                    position: 'relative', 
                                                    top: '.5em', 
                                                    right: '1.5em', 
                                                    zIndex: 1, 
                                                    bgcolor: 'background.paper',
                                                    [theme.breakpoints.down('xl')]: {
                                                        height: 30,
                                                        width: 30,
                                                        borderRadius: 2.5
                                                    }
                                                }}
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
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message='Feedback enviado!'
                autoHideDuration={3000}
                action={action}
            />
            <LoadingBackdrop
                open={backdropOpen}
                handleClose={handleBackdropClose}
            />
            <WarningModal
                open={modalOpen}
                onClose={handleModalClose}
                onConfirm={onConfirm}
                text='Essa ação irá deletar esta publicação.'
            />
            <CreateShortcutsModal
                open={shortcutModalOpen}
                onClose={handleShortcutModalClose}
                link={'/app/post/' + id}
                category='Post'
            />
        </>
    )
}
