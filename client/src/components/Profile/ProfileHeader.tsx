import { useUpdateUserMutation } from '$features/user'
import { useAppDispatch, useAppSelector } from '$store'
import { type User } from '$types'
import { Avatar, Box, Button, Card, Modal, Switch, TextField, Typography } from '@mui/material'
import { useState, type ReactElement, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import UserAvatar from './UserAvatar'
import { AddPhotoAlternate } from '@mui/icons-material'
import { LoadingBackdrop } from '$layout'
import { setCredentials } from '$features/auth'
import { useUploadFileMutation } from '$features/file'

export default function ProfileHeader({ user }: { user: User }): ReactElement {
    const { id } = useParams()

    const [ updateUser ] = useUpdateUserMutation()
    const [ uploadPicture ] = useUploadFileMutation()

    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.auth.user)
    const ownId = userState._id
    const onwedAccount = id === ownId

    const [ followingUser, setFollowingUser ] = useState(user.followers?.some(followerId => followerId === ownId))
    const [ open, setOpen ] = useState(false)
    const [ openLoading, setOpenLoading ] = useState(false)
    const [ userAvatar, setUserAvatar ] = useState<string | undefined>('')
    const [ userUpdateInfo, setUserUpdateInfo ] = useState<{
        username: string,
        bio: string,
        account: 'public' | 'private',
    }>({
        username: userState.username ?? '',
        bio: userState.otherInfo?.bio ?? '',
        account: 'public'
    })

    const follow = (): void => {
        (async () => {
            await updateUser({
                _id: id,
                followers: [
                    ...user.followers,
                    ownId as string
                ]
            })

            setFollowingUser(true)
        })()
    }

    const unfollow = (): void => {
        (async () => {
            const followers = [
                ...user.followers
            ].filter(item => item !== ownId)

            await updateUser({
                _id: id,
                followers
            })

            setFollowingUser(false)
        })()
    }

    const updateProfile = (e: FormEvent): void => {
        (async () => {
            e.preventDefault()

            setOpenLoading(true)
            setOpen(false)

            const { data: picture }: any = await uploadPicture({
                userId: user._id as string,
                file64Based: String(userAvatar ?? userState.otherInfo.avatar),
                filename: user.otherInfo.avatar?.name
            })

            const { data }: any = await updateUser({
                _id: id,
                username: userUpdateInfo.username ?? userState.username,
                otherInfo: {
                    ...userState.otherInfo,
                    bio: userUpdateInfo.bio,
                    avatar: {
                        src: picture.src,
                        name: picture.newPicture.filename
                    }
                }
            })

            console.log(data)

            dispatch(setCredentials({
                user: {
                    // TODO: ATUALIZAR REQUISIÇÃO NO BACKEND
                    // TODO: COLCAR BLOBS NO AZURE STORAGE
                    // TODO: FILTRAGEM PARA PREENCIMENTO DOS CAMPOS
                    ...data
                }
            }))

            location.reload()
        })()
    }

    const imgStyle: CSSProperties = {
        height: '100%',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'conver',
        resize: 'both'
    }

    return (
        <>
            <Box p={3} width='100%' display='flex' gap={8}>
                <UserAvatar
                    user={user}
                    sx={{
                        height: '10rem',
                        width: '10rem',
                        borderRadius: '50%',
                        fontSize: '3rem'
                    }}
                />
                <Box width='100%' display='flex' flexDirection='column' gap={2.5}>
                    <Box display='flex' gap={4}>
                        <Typography position='relative' top='7.5px'>@{user?.username}</Typography>
                        { onwedAccount ?
                            <Button onClick={() => { setOpen(true) }} variant='contained'>Editar Perfil</Button>
                            : (
                                <>
                                    {followingUser ? (
                                        <Button onClick={unfollow} variant='contained'>Desseguir</Button>
                                    ) : (
                                        <Button onClick={follow} variant='contained'>Seguir</Button>
                                    )}
                                    <Button variant='contained'>Enviar Mensagem</Button>
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
                        <Typography whiteSpace='pre-wrap'>{user?.otherInfo?.bio}</Typography>
                    </Box>
                </Box>
            </Box>
            <Modal
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
                open={open}
                onClose={(): void => { setOpen(false) }}
            >
                <Card 
                    component='form'
                    onSubmit={updateProfile}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '50%',
                        width: '50%',
                        p: 4
                    }}
                >
                    <Box width='100%' display='flex' gap={3}>
                        <Box
                            component='label' 
                            htmlFor='user_avatar'
                            sx={{ cursor: 'pointer' }}
                        >   
                            <Avatar
                                sx={{
                                    height: '10rem',
                                    width: '10rem',
                                    borderRadius: '50%',
                                    fontSize: '3rem',
                                    bgcolor: 'primary.main'
                                }}
                            >
                                {userAvatar ? (
                                    <img 
                                        src={userAvatar} 
                                        alt={'Imagem de ' + user?.username}
                                        style={imgStyle}
                                    />
                                ) : user?.otherInfo?.avatar?.src ? (
                                    <img 
                                        src={user?.otherInfo?.avatar?.src} 
                                        alt={'Imagem de ' + user?.username}
                                        style={imgStyle}
                                    />
                                ) : user?.username?.[0]}
                            </Avatar>
                            <Avatar 
                                sx={{ 
                                    height: '3rem',
                                    width: '3rem',
                                    position: 'relative',
                                    bottom: '3rem', left: '7.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <input 
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                        const file = e.target.files?.[0]

                                        const reader = new FileReader()

                                        setTimeout(() => {
                                            reader.addEventListener('load', () => {
                                                setUserAvatar(reader.result as string)
                                            })
    
                                            reader.readAsDataURL(file as File)
                                        }, 1000)

                                    }}
                                    style={{ display: 'none' }} 
                                    id='user_avatar' 
                                    type='file'
                                    accept='image/*' 
                                />
                                <AddPhotoAlternate />
                            </Avatar>
                            <Box>
                                <Typography variant='body2'>Conta privada</Typography>
                                <Switch sx={{ position: 'relative', right: 12 }} />
                            </Box>
                        </Box>
                        <Box display='flex' gap={2} flexDirection='column' width='100%'>
                            <Box>
                                <TextField
                                    onChange={e => {
                                        setUserUpdateInfo({ ...userUpdateInfo, username: e.currentTarget.value }) 
                                    }}
                                    helperText={userUpdateInfo?.username?.length + '/30'}
                                    value={userUpdateInfo?.username}
                                    fullWidth
                                    label='Nome de usuário (@)'
                                    inputProps={{ maxLength: 30 }}
                                />
                            </Box>
                            <TextField
                                onChange={e => {
                                    if (userUpdateInfo.bio.length < 150) {
                                        setUserUpdateInfo({ ...userUpdateInfo, bio: e.currentTarget.value }) 
                                    }
                                }}
                                multiline
                                helperText={userUpdateInfo?.bio?.length + '/150'}
                                value={userUpdateInfo?.bio}
                                fullWidth
                                label='Biografia'
                                inputProps={{ maxLength: 150 }}
                            />
                        </Box>
                    </Box>
                    <Box height='100%' display='flex' justifyContent='flex-end' mt={3}>
                        <Box display='flex' alignItems='end' gap={3}>
                            <Button type='submit' onClick={updateProfile} variant='contained'>Confirmar</Button>
                            <Button type='submit' onClick={() => { setOpen(false) }} variant='outlined'>Cancelar</Button>
                        </Box>
                    </Box>
                </Card>
            </Modal>
            <LoadingBackdrop 
                open={openLoading}
            />
        </>
    )
}