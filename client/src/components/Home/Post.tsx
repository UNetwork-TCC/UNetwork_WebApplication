import { FavoriteBorder, Favorite, ChatBubbleRounded, Reply, MoreVert, ArrowDropDown, CloseSharp } from '@mui/icons-material'
import { Avatar, Box, Card, IconButton, MenuItem, Snackbar, Typography, useTheme } from '@mui/material'
import React, { type ReactElement, useState } from 'react'
import { CustomMenu } from '$layout'
import { type Picture } from '$types'

export default function Post({ 
    date,
    content,
    degree,
    img,
    user
} : {
    date: Date | string,
    content: {
        text?: string,
        picture?: Picture
    },
    degree?: string,
    img?: string,
    user: { name: string, avatar?: string }
}) : ReactElement {
    const theme = useTheme()
    const [ favoriteClicked, setFavoriteCLicked ] = useState(false)
    const [ contentTextLength, setContentTextLength ] = useState(content?.text?.length)

    const variant: any = 'iconWrapper'

    const onClickEvents = {
        item1: () => {
            console.log('oi')
            handleClose()
        },

        item2: () => {
            console.log('tcchau')
            handleClose()
        },

        item3: () => {
            handleSnackbarOpen()
            handleClose()
        }
    }

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<React.ReactNode[]>([])
    const [ snackbarOpen, setSnackbarOpen ] = useState<boolean>(false)

    const open = Boolean(anchorEl)

    const handleClick = (e: any, elements: string[], onClickEventListeners = elements.map(() => handleClose), icons: ReactElement[] = []): void => {
        const mapedElements: React.ReactNode[] = elements.map((el, i) =>
            <MenuItem onClick={onClickEventListeners[i]} key={i} disableRipple>{icons?.[i]}{el}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    const handleClose = (): void => { setAnchorEl(null) }

    const handleSnackbarOpen = (): void => { setSnackbarOpen(true) }
    const handleSnackbarClose = (): void => { setSnackbarOpen(false) }

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

    return (
        <>
            <Card variant="elevation" elevation={2} sx={{
                minHeight: '40rem',
                width: '75%',
                [theme.breakpoints.down('xl')]: {
                    width: '85%'
                },
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '10px',
                bgcolor: 'background.secondary',
                mb: '3em'
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
                                <Avatar variant='rounded' sx={{ borderRadius: 3, height: '3.5rem', width: '3.5rem' }}>
                                    {user?.avatar ?
                                        <img style={{ backgroundRepeat: 'no-repeat' }} src={user?.avatar} alt="avatar" />
                                        :
                                        <Avatar />
                                    }
                                </Avatar>
                                <Avatar sx={{ position: 'relative', height: '1.75rem', width: '1.75rem', bottom: '1em', right: '0.5em', bgcolor: 'primary.dark', color: '' }}>
                                    {degree}
                                </Avatar>
                            </Box>
                            <Box sx={{ ml: '1rem' }}>
                                <Typography sx={{ fontSize: '1.25rem' }}>{user?.name}</Typography>
                                <Typography sx={{ color: 'gray', fontSize: '1em' }}>{date?.toString()}</Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={
                            e => {
                                handleClick(e, 
                                    [ 'Salvar', 'Favoritar', 'Seguir/Deseguir', 'Denunciar' ],
                                    [ onClickEvents.item1, onClickEvents.item2 ]
                                ) 
                            }
                        }>
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
                                {contentTextLength !== undefined && contentTextLength >= 999 ? (
                                    <>
                                        {content?.text?.substring(0, 999) + '...'}
                                        <ArrowDropDown sx={{ cursor: 'pointer' }} onClick={() => { setContentTextLength(undefined) }} />
                                    </>
                                ) : content?.text
                                }
                            </Typography>
                            {img &&
                                <img src={img} alt={'imagem de ' + user.name} />
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
                                        <Avatar sx={{ bgcolor: 'background.paper' }} variant={variant}>
                                            <IconButton onClick={() => { setFavoriteCLicked(val => !val) }}>
                                                {favoriteClicked ?
                                                    <Favorite sx={{ color: 'red' }} /> :
                                                    <FavoriteBorder/>
                                                }
                                            </IconButton>
                                        </Avatar>
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
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message='Feedback enviado!'
                autoHideDuration={3000}
                action={action}
            >
            </Snackbar>
        </>
    )
}
