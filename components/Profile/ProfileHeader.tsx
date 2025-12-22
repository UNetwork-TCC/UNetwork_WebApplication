'use client'

import { useUpdateUserMutation } from '@/features/user'
import { useAppDispatch, useAppSelector } from '@/store'
import { type User } from '@/types'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import {
  useState,
  type ReactElement,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent
} from 'react'
import { useNavigate, useParams } from '@/hooks'
import UserAvatar from './UserAvatar'
import {
  AddPhotoAlternate,
  Edit,
  Close,
  Message,
  PersonAdd,
  PersonRemove
} from '@mui/icons-material'
import { LoadingBackdrop } from '@/layout'
import { setCredentials } from '@/features/auth'
import { useUploadFileMutation } from '@/features/file'
import { setChatId, useCreateChatMutation } from '@/features/chat'

export default function ProfileHeader({ user }: { user: User }): ReactElement {
  const { id } = useParams()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [updateUser] = useUpdateUserMutation()
  const [uploadPicture] = useUploadFileMutation()
  const [createChat] = useCreateChatMutation()

  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.auth.user)
  const navigate = useNavigate()

  const ownId = userState._id
  const onwedAccount = id === ownId

  const [followingUser, setFollowingUser] = useState(
    user.followers?.some(followerId => followerId === ownId)
  )
  const [open, setOpen] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)
  const [userAvatar, setUserAvatar] = useState<string | undefined>('')
  const [userUpdateInfo, setUserUpdateInfo] = useState<{
    username: string
    bio: string
    account: 'public' | 'private'
  }>({
    username: userState.username ?? '',
    bio: userState.otherInfo?.bio ?? '',
    account: 'public'
  })

  const follow = (): void => {
    ;(async () => {
      await updateUser({
        _id: id,
        followers: [...user.followers, ownId as string]
      })

      setFollowingUser(true)
    })()
  }

  const unfollow = (): void => {
    ;(async () => {
      const followers = [...user.followers].filter(item => item !== ownId)

      await updateUser({
        _id: id,
        followers
      })

      setFollowingUser(false)
    })()
  }

  const sendMessage = (): void => {
    ;(async () => {
      setOpenLoading(true)

      const { data }: any = await createChat({
        users: [id, ownId] as string[]
      })

      setTimeout(() => {
        dispatch(setChatId(data?.newChat?._id))

        navigate('/app/chat/' + data?.newChat?._id)
      }, 200)
    })()
  }

  const updateProfile = (e: FormEvent): void => {
    ;(async () => {
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

      dispatch(
        setCredentials({
          user: {
            // TODO: ATUALIZAR REQUISIÇÃO NO BACKEND
            // TODO: COLCAR BLOBS NO AZURE STORAGE
            // TODO: FILTRAGEM PARA PREENCIMENTO DOS CAMPOS
            ...data
          }
        })
      )

      location.reload()
    })()
  }

  const imgStyle: CSSProperties = {
    height: '100%',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    objectFit: 'cover'
  }

  // Usa userState se for o próprio perfil, senão usa user da API
  const displayUser = onwedAccount ? { ...user, ...userState } : user

  const stats = [
    { value: displayUser?.posts?.length ?? 0, label: 'Publicações' },
    { value: displayUser?.followers?.length ?? 0, label: 'Seguidores' },
    { value: 0, label: 'Seguindo' }
  ]

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        {/* Header com Avatar e Info */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: { xs: 3, md: 4 },
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(103, 58, 183, 0.08)'
          }}
        >
          {/* Avatar com borda */}
          <Box
            sx={{
              position: 'relative',
              p: 0.5,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
              boxShadow: '0 8px 32px rgba(103, 58, 183, 0.25)'
            }}
          >
            <Avatar
              sx={{
                width: { xs: 120, md: 150 },
                height: { xs: 120, md: 150 },
                border: '4px solid white',
                bgcolor: 'primary.main',
                fontSize: { xs: '2.5rem', md: '3rem' }
              }}
            >
              {displayUser?.otherInfo?.avatar?.src ? (
                <img
                  src={displayUser?.otherInfo?.avatar?.src}
                  alt={displayUser?.username}
                  style={imgStyle}
                />
              ) : (
                displayUser?.username?.[0]?.toUpperCase()
              )}
            </Avatar>
          </Box>

          {/* Info Section */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 2,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            {/* Nome e Username */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 0.5
                }}
              >
                {displayUser?.name || (displayUser?.username ? displayUser.username.charAt(0).toUpperCase() + displayUser.username.slice(1) : 'Carregando...')}
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.95rem'
                }}
              >
                @{displayUser?.username || '...'}
              </Typography>
            </Box>

            {/* Stats */}
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 3, md: 5 },
                py: 1
              }}
            >
              {stats.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      color: 'text.primary',
                      lineHeight: 1.2
                    }}
                  >
                    {stat.value.toLocaleString('pt-BR')}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      color: 'text.secondary'
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Botões de ação */}
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}
            >
              {onwedAccount ? (
                <Button
                  onClick={() => setOpen(true)}
                  variant="outlined"
                  startIcon={<Edit sx={{ fontSize: 18 }} />}
                  sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      bgcolor: 'rgba(103, 58, 183, 0.04)',
                      borderColor: 'primary.dark'
                    }
                  }}
                >
                  Editar Perfil
                </Button>
              ) : (
                <>
                  {followingUser ? (
                    <Button
                      onClick={unfollow}
                      variant="outlined"
                      startIcon={<PersonRemove sx={{ fontSize: 18 }} />}
                      sx={{
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderColor: 'grey.400',
                        color: 'text.secondary',
                        '&:hover': {
                          borderColor: 'error.main',
                          color: 'error.main',
                          bgcolor: 'rgba(211, 47, 47, 0.04)'
                        }
                      }}
                    >
                      Seguindo
                    </Button>
                  ) : (
                    <Button
                      onClick={follow}
                      variant="contained"
                      startIcon={<PersonAdd sx={{ fontSize: 18 }} />}
                      sx={{
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
                        boxShadow: '0 4px 15px rgba(103, 58, 183, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5e35b1 0%, #8e24aa 100%)',
                          boxShadow: '0 6px 20px rgba(103, 58, 183, 0.4)'
                        }
                      }}
                    >
                      Seguir
                    </Button>
                  )}
                  <Button
                    onClick={sendMessage}
                    variant="outlined"
                    startIcon={<Message sx={{ fontSize: 18 }} />}
                    sx={{
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        bgcolor: 'rgba(103, 58, 183, 0.04)'
                      }
                    }}
                  >
                    Mensagem
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* Bio Section */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(103, 58, 183, 0.08)'
          }}
        >
          <Typography
            sx={{
              color: displayUser?.otherInfo?.bio ? 'text.primary' : 'text.secondary',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap'
            }}
          >
            {displayUser?.otherInfo?.bio || 'Nenhuma bio adicionada ainda. Clique em editar perfil para adicionar uma descrição.'}
          </Typography>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden'
          }
        }}
      >
        {/* Header do Dialog */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Edit sx={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}
              >
                Editar Perfil
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>
                Atualize suas informações
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          <Box
            component="form"
            onSubmit={updateProfile}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {/* Avatar Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box
                component="label"
                htmlFor="user_avatar"
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  '&:hover .avatar-overlay': {
                    opacity: 1
                  }
                }}
              >
                <Box
                  sx={{
                    p: 0.5,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)'
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid white',
                      bgcolor: 'primary.main',
                      fontSize: '2.5rem'
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
                    ) : (
                      user?.username?.[0]?.toUpperCase()
                    )}
                  </Avatar>
                </Box>
                <Box
                  className="avatar-overlay"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <AddPhotoAlternate sx={{ fontSize: 18, color: 'white' }} />
                </Box>
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
                  id="user_avatar"
                  type="file"
                  accept="image/*"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Clique para alterar a foto
              </Typography>
            </Box>

            {/* Form Fields */}
            <TextField
              onChange={e => {
                setUserUpdateInfo({
                  ...userUpdateInfo,
                  username: e.currentTarget.value
                })
              }}
              helperText={`${userUpdateInfo?.username?.length || 0}/30`}
              value={userUpdateInfo?.username}
              fullWidth
              label="Nome de usuário (@)"
              inputProps={{ maxLength: 30 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              onChange={e => {
                if (userUpdateInfo.bio.length < 150) {
                  setUserUpdateInfo({
                    ...userUpdateInfo,
                    bio: e.currentTarget.value
                  })
                }
              }}
              multiline
              rows={3}
              helperText={`${userUpdateInfo?.bio?.length || 0}/150`}
              value={userUpdateInfo?.bio}
              fullWidth
              label="Biografia"
              inputProps={{ maxLength: 150 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            {/* Buttons */}
            <Box display="flex" gap={2} justifyContent="flex-end" mt={1}>
              <Button
                onClick={() => setOpen(false)}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={updateProfile}
                variant="contained"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5e35b1 0%, #8e24aa 100%)'
                  }
                }}
              >
                Salvar alterações
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <LoadingBackdrop open={openLoading} />
    </>
  )
}
