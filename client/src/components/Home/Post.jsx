import { FavoriteBorder, Favorite, ChatBubbleRounded, Reply, MoreVert, Report, Bookmark } from '@mui/icons-material'
import { Avatar, Box, Card, IconButton, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import { CustomMenu } from '../../layout'

export default function Post({ date, content, degree, img, user }) {

    const [favoriteClicked, setFavoriteCLicked] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Card variant="elevation" elevation={2} sx={{
            minHeight: '15rem',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '10px',
            mb: '3em'
        }}>
            <Box sx={{ width: '100%', height: '100%' }} pt={6} pb={6} pl={4} pr={4}>
                <Box mb={2.5} sx={{ minHeight: '7em', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
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
                            <Typography sx={{ color: 'gray', fontSize: '1.7em' }}>{date}</Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={handleClick}>
                        <MoreVert sx={{ fontSize: '1.2em' }} />
                    </IconButton>
                    <CustomMenu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disableRipple>
                            <Bookmark />
                            Salvar
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Report />
                            Denunciar
                        </MenuItem>
                    </CustomMenu>
                </Box>
                <Box display='flex' gap={2.5} flexDirection='column' mt={2.5} mb={5}>
                    <Typography variant='body1' fontSize='1.2rem'>{content}</Typography>
                    {img &&
                        <img src={img} alt={'imagem de ' + user.name} />
                    }
                </Box>
                <Box display='flex' justifyContent='space-between' sx={{ height: '5em', mt: '1.5em' }}>
                    <Box display='flex' gap={2}>
                        <Avatar variant='iconWrapper'>
                            <IconButton>
                                {favoriteClicked ?
                                    <Favorite onClick={() => setFavoriteCLicked(false)} sx={{ color: 'red' }} /> :
                                    <FavoriteBorder onClick={() => setFavoriteCLicked(true)} />}
                            </IconButton>
                        </Avatar>
                        <Avatar variant='iconWrapper'>
                            <IconButton>
                                <ChatBubbleRounded />
                            </IconButton>
                        </Avatar>

                        <Avatar variant='iconWrapper'>
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
                            <Avatar sx={{ fontSize: '1rem', position: 'relative', top: '.5em', right: '1.5em', zIndex: 1 }} variant='iconWrapper'>
                                +11
                            </Avatar>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}
