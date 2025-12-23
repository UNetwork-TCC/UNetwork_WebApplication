'use client'

import { useState, useEffect, type ReactElement, type FormEvent } from 'react'
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  TextField,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material'
import { MoreVert, Share, Add, ArrowBack } from '@mui/icons-material'
import { type IForum, type IMessage, type User } from '@/types'
import { useGetUserMutation } from '@/features/user'
import { useCreateMessageMutation } from '@/features/message'
import { useAppSelector } from '@/store'
import { getOverlay } from '@/themes'

interface ForumTopicViewProps {
  forum: IForum
  onBack: () => void
}

interface CommentItemProps {
  comment: IMessage
}

function CommentItem({ comment }: CommentItemProps): ReactElement {
  const [getUser, { data: author }] = useGetUserMutation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  useEffect(() => {
    if (comment.sendedBy) {
      getUser(comment.sendedBy)
    }
  }, [comment.sendedBy, getUser])

  const getInitials = (name?: string): string => {
    if (!name) return '??'
    return name.slice(0, 2).toUpperCase()
  }

  const formatDate = (date?: string): string => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('pt-BR')
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" alignItems="flex-start" gap={1.5}>
        <Avatar
          src={author?.avatarUrl}
          sx={{
            width: 40,
            height: 40,
            background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.8), #9c27b0)',
            fontSize: '0.875rem',
            fontWeight: 600
          }}
        >
          {getInitials(author?.name || author?.username)}
        </Avatar>
        <Box flex={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
              @{author?.username || 'usuário'}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
              {formatDate(comment.sendedAt)}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ ml: 'auto', width: 24, height: 24 }}
            >
              <MoreVert sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mt: 0.5 }}>
            {comment.content}
          </Typography>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 120 }
        }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Denunciar</MenuItem>
      </Menu>
    </Box>
  )
}

export default function ForumTopicView({
  forum,
  onBack
}: ForumTopicViewProps): ReactElement {
  const theme = useTheme()
  const mode = theme.palette.mode
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<IMessage[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const maxChars = 999

  const currentUser = useAppSelector(state => state.auth.user)
  const [getAuthor, { data: author }] = useGetUserMutation()
  const [createMessage, { isLoading: isSending }] = useCreateMessageMutation()

  useEffect(() => {
    if (forum?.createdBy) {
      getAuthor(forum.createdBy)
    }
  }, [forum?.createdBy, getAuthor])

  useEffect(() => {
    if (forum?.comments) {
      setComments(forum.comments)
    }
  }, [forum?.comments])

  const getInitials = (name?: string): string => {
    if (!name) return '??'
    return name.slice(0, 2).toUpperCase()
  }

  const formatDate = (date?: string | Date): string => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('pt-BR')
  }

  const handleSubmitComment = async (e?: FormEvent): Promise<void> => {
    e?.preventDefault()
    if (!newComment.trim() || !forum?._id) return

    const newMsg: IMessage = {
      content: newComment,
      sendedBy: currentUser._id ?? '',
      sendedIn: forum._id,
      sendedAt: new Date().toISOString(),
      type: 'text'
    }

    const result = await createMessage(newMsg)

    if ('data' in result) {
      setComments(prev => [...prev, result.data as IMessage])
      setSnackbar({ open: true, message: 'Comentário adicionado!', severity: 'success' })
    } else {
      setSnackbar({ open: true, message: 'Erro ao adicionar comentário', severity: 'error' })
    }
    setNewComment('')
  }

  const handleShare = async (): Promise<void> => {
    const shareData = {
      title: forum?.title || 'Fórum UNetwork',
      text: `${forum?.title}\n\n${forum?.description?.substring(0, 200)}${(forum?.description?.length || 0) > 200 ? '...' : ''}\n\nPor @${author?.username || 'usuário'} - ${forum?.topic}`,
      url: window.location.href
    }

    // Try native share first (mobile devices)
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
        setSnackbar({ open: true, message: 'Compartilhado com sucesso!', severity: 'success' })
      } catch (err) {
        // User cancelled or error - fallback to clipboard
        if ((err as Error).name !== 'AbortError') {
          await navigator.clipboard.writeText(shareData.text + '\n\n' + shareData.url)
          setSnackbar({ open: true, message: 'Conteúdo copiado!', severity: 'success' })
        }
      }
    } else {
      // Fallback: copy formatted content to clipboard
      const textToCopy = `📢 ${forum?.title}\n\n${forum?.description}\n\n👤 Por @${author?.username || 'usuário'}\n📁 ${forum?.topic}\n\n🔗 ${window.location.href}`
      await navigator.clipboard.writeText(textToCopy)
      setSnackbar({ open: true, message: 'Conteúdo copiado para compartilhar!', severity: 'success' })
    }
  }

  const participantsCount = forum?.usersIn?.length || 0

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        animation: 'fadeIn 0.3s ease',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      {/* Back button */}
      <Button
        onClick={onBack}
        startIcon={<ArrowBack />}
        sx={{
          alignSelf: 'flex-start',
          color: 'text.secondary',
          textTransform: 'none',
          '&:hover': {
            color: 'text.primary',
            bgcolor: 'transparent'
          }
        }}
      >
        Voltar aos fóruns
      </Button>

      {/* Main post card */}
      <Box
        sx={{
          borderRadius: 4,
          bgcolor: getOverlay(mode, 'cardBg'),
          backdropFilter: 'blur(8px)',
          border: `1px solid ${getOverlay(mode, 'cardBorder')}`,
          p: 3
        }}
      >
        {/* Author header */}
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar
              src={author?.avatarUrl}
              sx={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.8), #9c27b0)',
                fontWeight: 600
              }}
            >
              {getInitials(author?.name || author?.username)}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                @{author?.username || 'usuário'}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                {formatDate(forum?.createdAt)}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: { borderRadius: 2, minWidth: 120 }
            }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>Denunciar</MenuItem>
          </Menu>
        </Box>

        {/* Content */}
        <Box mb={3}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
            {forum?.title}
          </Typography>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            {forum?.description}
          </Typography>
          {forum?.image && (
            <Box
              component="img"
              src={forum.image}
              alt="Imagem do fórum"
              sx={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'cover',
                borderRadius: 2,
                mt: 2
              }}
            />
          )}
        </Box>

        {/* Actions */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pt={2}
          borderTop="1px solid"
          borderColor="divider"
        >
          <IconButton onClick={handleShare} size="small">
            <Share sx={{ fontSize: 20 }} />
          </IconButton>
          <Box display="flex" alignItems="center">
            {[...Array(Math.min(3, participantsCount))].map((_, i) => (
              <Avatar
                key={i}
                sx={{
                  width: 32,
                  height: 32,
                  marginLeft: i > 0 ? -1 : 0,
                  border: '2px solid',
                  borderColor: 'background.paper',
                  bgcolor: 'grey.300',
                  fontSize: '0.75rem'
                }}
              >
                {String.fromCharCode(65 + i)}
              </Avatar>
            ))}
            {participantsCount > 3 && (
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  marginLeft: -1,
                  borderRadius: '50%',
                  bgcolor: mode === 'light' ? 'grey.200' : 'grey.700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  border: '2px solid',
                  borderColor: 'background.paper'
                }}
              >
                +{participantsCount - 3}
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Comment input */}
      <Box
        component="form"
        onSubmit={handleSubmitComment}
        sx={{
          borderRadius: 4,
          bgcolor: getOverlay(mode, 'cardBg'),
          backdropFilter: 'blur(8px)',
          border: `1px solid ${getOverlay(mode, 'cardBorder')}`,
          p: 2
        }}
      >
        <Box display="flex" gap={1.5} alignItems="flex-start">
          <TextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value.slice(0, maxChars))}
            placeholder="Escreva um comentário..."
            multiline
            minRows={2}
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '0.875rem'
              }
            }}
          />
          <IconButton
            type="submit"
            disabled={!newComment.trim() || isSending}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark'
              },
              '&.Mui-disabled': {
                bgcolor: 'grey.300',
                color: 'grey.500'
              }
            }}
          >
            <Add />
          </IconButton>
        </Box>
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 1 }}>
          {newComment.length}/{maxChars}
        </Typography>
      </Box>

      {/* Comments list */}
      <Box
        sx={{
          borderRadius: 4,
          bgcolor: getOverlay(mode, 'cardBg'),
          backdropFilter: 'blur(8px)',
          border: `1px solid ${getOverlay(mode, 'cardBorder')}`,
          overflow: 'hidden',
          '& > *:not(:last-child)': {
            borderBottom: '1px solid',
            borderColor: 'divider'
          }
        }}
      >
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentItem key={comment._id || index} comment={comment} />
          ))
        ) : (
          <Box p={4} textAlign="center">
            <Typography color="text.secondary">
              Nenhum comentário ainda. Seja o primeiro!
            </Typography>
          </Box>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
