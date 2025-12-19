'use client'

import {
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  Share,
  MoreVert,
  BookmarkBorder,
  Bookmark,
  Verified,
  School
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  IconButton,
  MenuItem,
  Typography,
  Skeleton,
  Snackbar,
  keyframes
} from '@mui/material'
import {
  type ReactElement,
  useState,
  useEffect,
  type MouseEvent
} from 'react'
import {
  CreateShortcutsModal,
  CustomMenu,
  LoadingBackdrop,
  WarningModal
} from '@/layout'
import { useAppSelector } from '@/store'
import { useDeletePostMutation, useUpdatePostMutation } from '@/features/post'
import { red } from '@mui/material/colors'
import { UserAvatar } from '@/components'
import { useGetUserMutation } from '@/features/user'
import { type User } from '@/types'
import { useNavigate } from '@/hooks'

interface PostCardProps {
  date: Date | string | undefined
  content: {
    text?: string
    picture?: string
  }
  postedBy: string
  id: string
  index?: number
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export default function PostCard({
  date,
  content,
  postedBy,
  id,
  index = 0
}: PostCardProps): ReactElement {
  const navigate = useNavigate()

  const [favoriteClicked, setFavoriteClicked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [contentTextLength, setContentTextLength] = useState(content?.text?.length)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [shortcutModalOpen, setShortcutModalOpen] = useState(false)

  const open = Boolean(anchorEl)

  const loggedUser = useAppSelector(state => state.auth.user)
  const [getUser, { isLoading }] = useGetUserMutation()
  const [deletePost] = useDeletePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const [user, setUser] = useState<User | null>(null)
  const postOwner = postedBy === loggedUser._id

  useEffect(() => {
    ;(async () => {
      const response: any = await getUser(postedBy)
      setUser(response.data)
    })()
  }, [getUser, postedBy])

  const formatDate = (dateString: Date | string | undefined) => {
    if (!dateString) return ''
    const dateObj = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - dateObj.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'agora mesmo'
    if (diffHours < 24) return `há ${diffHours}h`
    if (diffDays < 7) return `há ${diffDays}d`
    return dateObj.toLocaleDateString('pt-BR')
  }

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLike = () => {
    setFavoriteClicked(prev => !prev)
  }

  const handleBookmark = () => {
    setBookmarked(prev => !prev)
    setSnackbarMessage(bookmarked ? 'Removido dos favoritos' : 'Post salvo nos favoritos!')
    setSnackbarOpen(true)
  }

  const handleGoToPost = () => {
    navigate('/app/post/' + id)
    handleMenuClose()
  }

  const handleReport = () => {
    setSnackbarMessage('Feedback enviado!')
    setSnackbarOpen(true)
    handleMenuClose()
  }

  const handleSaveAsShortcut = () => {
    setShortcutModalOpen(true)
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setModalOpen(true)
    handleMenuClose()
  }

  const onConfirmDelete = async () => {
    setModalOpen(false)
    setBackdropOpen(true)
    await deletePost(id)
    setBackdropOpen(false)
    location.reload()
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          p: { xs: 2.5, md: 3 },
          transition: 'all 0.3s ease',
          animation: `${fadeIn} 0.4s ease-out`,
          animationDelay: `${index * 80}ms`,
          animationFillMode: 'both',
          '&:hover': {
            borderColor: 'primary.light',
            boxShadow: '0 8px 24px rgba(103, 58, 183, 0.08)'
          }
        }}
      >
        {/* Post Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ position: 'relative' }}>
              {isLoading ? (
                <Skeleton variant="circular" width={48} height={48} />
              ) : (
                <>
                  <UserAvatar
                    user={user as User}
                    sx={{
                      width: 48,
                      height: 48,
                      border: '2px solid',
                      borderColor: 'primary.light'
                    }}
                  />
                  <Avatar
                    sx={{
                      position: 'absolute',
                      bottom: -4,
                      right: -4,
                      width: 20,
                      height: 20,
                      bgcolor: 'primary.main',
                      border: '2px solid',
                      borderColor: 'background.paper'
                    }}
                  >
                    <School sx={{ fontSize: 12 }} />
                  </Avatar>
                </>
              )}
            </Box>

            <Box>
              {isLoading ? (
                <Box width={120}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              ) : (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {user?.name || user?.username}
                    </Typography>
                    {user?.verified && (
                      <Verified sx={{ fontSize: 16, color: 'primary.main' }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      @{user?.username}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {formatDate(date)}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          <IconButton
            onClick={handleMenuClick}
            size="small"
            sx={{
              opacity: 0.6,
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 1 }
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>

          <CustomMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleGoToPost}>Ir para publicação</MenuItem>
            <MenuItem onClick={handleSaveAsShortcut}>Salvar como Atalho</MenuItem>
            <MenuItem onClick={handleBookmark}>
              {bookmarked ? 'Remover dos Favoritos' : 'Favoritar'}
            </MenuItem>
            <MenuItem onClick={handleReport}>Denunciar</MenuItem>
            {postOwner && (
              <MenuItem onClick={handleDeleteClick} sx={{ color: red[600] }}>
                Deletar publicação
              </MenuItem>
            )}
          </CustomMenu>
        </Box>

        {/* Post Content */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {contentTextLength !== undefined && contentTextLength >= 500
              ? content?.text?.substring(0, 500) + '...'
              : content?.text}
          </Typography>
          {contentTextLength !== undefined && contentTextLength >= 500 && (
            <Typography
              component="span"
              onClick={() => setContentTextLength(undefined)}
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Ver mais
            </Typography>
          )}
        </Box>

        {/* Post Image */}
        {content?.picture && (
          <Box
            sx={{
              mb: 2,
              borderRadius: 3,
              overflow: 'hidden',
              '& img': {
                width: '100%',
                height: 'auto',
                display: 'block'
              }
            }}
          >
            <img src={content.picture} alt={`Imagem de ${user?.username}`} />
          </Box>
        )}

        {/* Post Actions */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {!postOwner && (
              <IconButton
                onClick={handleLike}
                size="small"
                sx={{
                  color: favoriteClicked ? 'error.main' : 'text.secondary',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: 'error.main',
                    bgcolor: 'error.main',
                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {favoriteClicked ? (
                  <Favorite fontSize="small" />
                ) : (
                  <FavoriteBorder fontSize="small" />
                )}
              </IconButton>
            )}

            <IconButton
              onClick={handleGoToPost}
              size="small"
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'primary.main',
                  backgroundColor: 'rgba(103, 58, 183, 0.08)',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <ChatBubbleOutline fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': {
                  color: 'success.main',
                  bgcolor: 'success.main',
                  backgroundColor: 'rgba(76, 175, 80, 0.08)',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <Share fontSize="small" />
            </IconButton>
          </Box>

          <IconButton
            onClick={handleBookmark}
            size="small"
            sx={{
              color: bookmarked ? 'primary.main' : 'text.secondary',
              transition: 'all 0.2s',
              '&:hover': {
                color: 'primary.main',
                transform: 'scale(1.1)'
              }
            }}
          >
            {bookmarked ? (
              <Bookmark fontSize="small" />
            ) : (
              <BookmarkBorder fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Card>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      <LoadingBackdrop open={backdropOpen} handleClose={() => setBackdropOpen(false)} />

      <WarningModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={onConfirmDelete}
        text="Essa ação irá deletar esta publicação."
      />

      <CreateShortcutsModal
        open={shortcutModalOpen}
        onClose={() => setShortcutModalOpen(false)}
        link={'/app/post/' + id}
        category="Post"
      />
    </>
  )
}
