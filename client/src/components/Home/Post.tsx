import { FavoriteBorder, Favorite, ChatBubbleRounded, Reply, MoreVert } from '@mui/icons-material'
import { Avatar, Box, Card, IconButton, MenuItem, Typography } from '@mui/material'
import React, { type ReactElement, useState } from 'react'
import { CustomMenu } from '$layout'
import { type Picture } from '$types'

export default function Post({ 
    title,
    date,
    content,
    degree,
    img,
    user
} : {
    title: string,
    date: Date | string,
    content: {
        text?: string,
        picture?: Picture
    },
    degree?: string,
    img?: string,
    user: { name: string, avatar?: string }
}) : ReactElement {

    const [ favoriteClicked, setFavoriteCLicked ] = useState(false)

    const variant: any = 'iconWrapper'

    const onClickEvents = {
        item1: () => {
            console.log('oi')
            handleClose()
        },

        item2: () => {
            console.log('tcchau')
            handleClose()
        }
    }

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<React.ReactNode[]>([])

    const open = Boolean(anchorEl)

    const handleClick = (e: any, elements: string[], onClickEventListeners = elements.map(() => handleClose), icons: ReactElement[] = []): void => {
        const mapedElements: React.ReactNode[] = elements.map((el, i) =>
            <MenuItem onClick={onClickEventListeners[i]} key={i} disableRipple>{icons?.[i]}{el}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    const handleClose = (): void => { setAnchorEl(null) }

    return (
        <Card variant="elevation" elevation={2} sx={{
            minHeight: '15rem',
            width: '100%',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '10px',
            mb: '3em'
        }}>
            <Box sx={{ width: '100%', height: '100%' }} pt={6} pb={6} pl={4} pr={4}>
                <Box mb={2.5} sx={{ minHeight: '7em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box height='5.6em'>
                            <Avatar variant='rounded' sx={{ borderRadius: 3, height: '3.5rem', width: '3.5rem' }}>
                                {user?.avatar ?
                                    <img src={user?.avatar} alt="avatar" />
                                    :
                                    <Avatar />
                                }
                            </Avatar>
                            <Avatar sx={{ position: 'relative', height: '1.75rem', width: '1.75rem', bottom: '1em', right: '0.5em', bgcolor: 'primary.dark' }}>
                                {degree}
                            </Avatar>
                        </Box>
                        <Box sx={{ ml: '1rem' }}>
                            <Typography sx={{ fontSize: '2em' }}>{user?.name}</Typography>
                            <Typography sx={{ color: 'gray', fontSize: '1.7em' }}>{date?.toString()}</Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={
                        e => { handleClick(e, 
                            [ 'Salvar', 'Favoritar', 'Seguir/Deseguir', 'Sobre esta conta', 'Ocultar', 'Denunciar' ],
                            [ onClickEvents.item1, onClickEvents.item2 ]
                    
                        ) }
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
                <Box display='flex' gap={2.5} flexDirection='column' mt={2.5} mb={5}>
                    <Typography variant='body1' fontSize='1.2rem'>{content?.text}</Typography>
                    {img &&
                        <img src={img} alt={'imagem de ' + user.name} />
                    }
                </Box>
                <Box display='flex' justifyContent='space-between' sx={{ height: '5em', mt: '1.5em' }}>
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
                            <Avatar sx={{ fontSize: '1rem', position: 'relative', top: '.5em', right: '1.5em', zIndex: 1, bgcolor: 'background.paper' }} variant={variant}>
                                +11
                            </Avatar>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}
