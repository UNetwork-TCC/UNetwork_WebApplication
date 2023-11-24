import { useAppSelector } from '$store'
import { type User } from '$types'
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { type ReactElement } from 'react'
import { useParams } from 'react-router-dom'

export default function ProfileHeader({ user }: { user: User }): ReactElement {
    const { id } = useParams()

    const ownId = useAppSelector(state => state.auth.user._id)

    const onwedAccount = id === ownId

    return (
        <Box p={3} width='100%' display='flex' gap={8}>
            <Avatar
                sx={{
                    height: '10rem',
                    width: '10rem'
                }}
            ></Avatar>
            <Box width='100%' display='flex' flexDirection='column' gap={2.5}>
                <Box display='flex' gap={4}>
                    <Typography position='relative' top='7.5px'>@{user?.username}</Typography>
                    { onwedAccount ?
                        <Button variant='contained'>Editar Perfil</Button>
                        : (
                            <>
                                <Button variant='contained'>Seguir</Button>
                                <Button variant='contained'>Enviar Mensagem</Button>
                                <IconButton>

                                </IconButton>
                            </>
                        )
                    }
                </Box>
                <Box display='flex' gap={4}>
                    <Box gap={1.5} display='flex'>
                        <Typography>Publicações</Typography>
                        <b>{user?.posts?.length}</b>
                    </Box>
                    <Box gap={1.5} display='flex'>
                        <Typography>Seguidores</Typography>
                        <b>{user?.followers?.length}</b>
                    </Box>
                    <Box gap={1.5} display='flex'>
                        <Typography>Seguindo</Typography>
                        <b>0</b>
                    </Box>
                </Box>
                <Box width='50%'>
                    <Typography fontWeight={900}>{user?.name}</Typography>
                    <Typography>{user?.otherInfo?.bio}</Typography>
                </Box>
            </Box>
        </Box>
    )
}