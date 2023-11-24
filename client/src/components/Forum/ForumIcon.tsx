import { useState, type ReactElement } from 'react'
import { Avatar, Box, FormHelperText, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { type User } from '$types'
import { useAppSelector } from '$store'
import { MoreVert } from '@mui/icons-material'
import { CustomMenu, LoadingBackdrop, WarningModal } from '$layout'
import { MenuItem } from '@mui/material'
import { red } from '@mui/material/colors'
import { useDeleteForumMutation } from '$features/forum'

export default function ForumIcon({ 
    title,
    topic,
    usersIn,
    id,
    userId,
    image: src 
} : {
    title: string,
    topic: string,
    usersIn: User[],
    userId: string,
    id: string | undefined,
    image?: string 
}): ReactElement {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.auth.user)

    const [ deleteForum ] = useDeleteForumMutation()
    
    const ownForum = user._id === userId

    const [ anchorEl, setAnchorEl ] = useState<EventTarget & HTMLButtonElement | null>(null)
    const menuOpen = Boolean(anchorEl)

    const handleMenuClose = (): void => { setAnchorEl(null) }

    const [ openModal, setOpenModal ] = useState(false)
    const [ openBackdrop, setOpenBackdrop ] = useState(false)

    const onConfirm = (): void => {
        (async () => {
            setOpenModal(false)
            setOpenBackdrop(true)
            await deleteForum(id ?? '')

            location.reload()
        })()
    }

    return (
        <Box display='flex' width='calc(100vw - 100%)'>
            <Box 
                display='flex'
                width='100%' 
                justifyContent='space-between' 
            >
                <Box 
                    display='flex'
                    sx={{ cursor: 'pointer' }} 
                    onClick={(): void => { navigate('/app/forum/' + id) }}
                >
                    <IconButton>
                        <Avatar 
                            sx={{
                                height: 50,
                                width: 50
                            }} 
                            variant='rounded'
                        >
                            {(src ?? false) ? 
                                <img src={src} alt={'Fórum ' + title} />
                                :
                                title.charAt(0).toUpperCase()
                            }
                        </Avatar>
                    </IconButton>
                    <Box display='flex' justifyContent='center' flexDirection='column'>
                        <Typography>{title.charAt(0).toUpperCase() + title.slice(1)}</Typography>
                        <Box gap={1} display='flex'>
                            <FormHelperText>{topic.charAt(0).toUpperCase() + topic.slice(1)}</FormHelperText>
                            <FormHelperText>•</FormHelperText>
                            <FormHelperText>{usersIn.length + ' Pessoas estão nesta discussão'}</FormHelperText>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <IconButton onClick={e => { setAnchorEl(e.currentTarget) }}>
                    <MoreVert />
                </IconButton>
            </Box>
            <CustomMenu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem>Denunciar</MenuItem>
                <MenuItem>Criar atalho</MenuItem>
                {ownForum && (
                    <MenuItem sx={{ color: red[600] }} onClick={() => {
                        setOpenModal(true)
                        handleMenuClose()
                    }}>Deletar fórum</MenuItem>
                )}

            </CustomMenu>
            <WarningModal 
                onConfirm={onConfirm}
                onClose={() => { setOpenModal(false) }}
                open={openModal}
                text='Esta ação irá deletar este fórum.'
            />
            <LoadingBackdrop 
                open={openBackdrop}
                handleClose={() => {}}
            />
        </Box>
    )
}
