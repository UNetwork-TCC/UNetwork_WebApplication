'use client'

import {
  Alert,
  Box,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  TextField,
  Chip
} from '@mui/material'
import { PostCard, SuggestionsPanel, TrendingPanel } from '@/components'
import { Add, AttachFile, Mic } from '@mui/icons-material'
import { LoadingBackdrop } from '@/layout'
import {
  useEffect,
  type ReactElement,
  type FormEvent,
  useState,
  type ChangeEvent
} from 'react'
import { PostSkeleton } from '@/layout/skeletons'
import { useCreatePostMutation, useFetchPostsMutation } from '@/features/post'
import { useAppSelector } from '@/store'
import { useUploadFileMutation } from '@/features/file'
import { useUpdateUserMutation } from '@/features/user'
import type { MulterFile, IPicture } from '@/types'

export default function Home(): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  const [fetchPosts, { isLoading, data: posts }] = useFetchPostsMutation()
  const [uploadPicture] = useUploadFileMutation()
  const [createPost] = useCreatePostMutation()
  const [updateUser] = useUpdateUserMutation()

  const [postContent, setPostContent] = useState<{
    text?: string
    picture?: Partial<MulterFile> & Partial<IPicture> & File
  }>()
  const [inputValue, setInputValue] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error')
  const [loading, setLoading] = useState<boolean>(false)

  const user = useAppSelector(state => state.auth.user)

  const handleSnackbarClose = (): void => {
    setSnackbarOpen(false)
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    if (!postContent?.text && !postContent?.picture) {
      setLoading(false)
      setSnackbarMessage('Você precisa de pelo menos um conteúdo para publicar!')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
      return
    }

    let data: any

    if ((postContent?.picture?.size ?? 0) >= 5000000) {
      setSnackbarMessage('A imagem colocada excede os limites de tamanho (5MB)!')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
      setLoading(false)
    } else {
      let picture: any
      const reader = new FileReader()

      if (postContent?.picture) {
        let picture64Based: string | ArrayBuffer | null = ''

        reader.addEventListener('load', () => {
          picture64Based = reader.result
        })

        reader.readAsDataURL(postContent.picture)

        setTimeout(() => {
          ;(async () => {
            picture = await uploadPicture({
              userId: user?._id ?? '',
              at: { id: 'null', type: 'post' },
              file64Based: picture64Based as string
            })

            data = await createPost({
              postedBy: user._id ?? '',
              postedIn: 'feed',
              content: {
                text: postContent?.text,
                picture: picture?.data?.src ?? null
              }
            })

            await updateUser({
              _id: user._id ?? '',
              posts: [...user.posts, data.postUpdates]
            })

            setPostContent(undefined)
            setInputValue('')
            setSnackbarMessage('Post publicado!')
            setSnackbarSeverity('success')
            setSnackbarOpen(true)
            setLoading(false)
          })()
        }, 100)
      } else {
        data = await createPost({
          postedBy: user._id ?? '',
          postedIn: 'feed',
          content: {
            text: postContent?.text
          }
        })

        await updateUser({
          _id: user._id ?? '',
          posts: [...user.posts, data.postUpdates]
        })

        setPostContent(undefined)
        setInputValue('')
        setSnackbarMessage('Post publicado!')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!loading) {
      fetchPosts(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
    setPostContent({ ...postContent, text: e.target.value })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      setPostContent({ ...postContent, picture: file })
    }
  }

  const handleRemoveFile = (): void => {
    setPostContent({ ...postContent, picture: undefined })
    const fileInput = document.getElementById('post-file-input') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, rgba(103, 58, 183, 0.03) 0%, rgba(233, 30, 99, 0.02) 50%, rgba(33, 150, 243, 0.01) 100%)',
        py: { xs: 2, md: 3 },
        px: { xs: 2, md: 3 }
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          alignItems: 'flex-start',
          gap: { md: 3, lg: 4 }
        }}
      >
        {/* Main Feed */}
        <Box sx={{ flex: 1, maxWidth: { md: 700, lg: 750 } }}>
          {/* Create Post */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mb: 3 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5
              }}
            >
              {/* Mic Button */}
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  boxShadow: '0 4px 16px rgba(103, 58, 183, 0.25)',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(103, 58, 183, 0.35)'
                  }
                }}
              >
                <Mic />
              </IconButton>

              {/* Input Field */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 6,
                  border: '1px solid',
                  borderColor: 'divider',
                  px: 2,
                  py: 0.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.light'
                  },
                  '&:focus-within': {
                    borderColor: 'primary.main',
                    boxShadow: '0 0 0 3px rgba(103, 58, 183, 0.1)'
                  }
                }}
              >
                <TextField
                  fullWidth
                  placeholder="No que estou pensando..."
                  value={inputValue}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  multiline
                  maxRows={4}
                  variant="standard"
                  sx={{
                    '& .MuiInput-root': {
                      '&:before, &:after': {
                        display: 'none'
                      }
                    },
                    '& .MuiInputBase-input': {
                      py: 1
                    }
                  }}
                />

                {/* File Input */}
                <input
                  type="file"
                  id="post-file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <IconButton
                  component="label"
                  htmlFor="post-file-input"
                  size="small"
                  sx={{
                    color: postContent?.picture ? 'primary.main' : 'text.secondary',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'rgba(103, 58, 183, 0.08)'
                    }
                  }}
                >
                  <AttachFile fontSize="small" />
                </IconButton>

                {/* Submit Button */}
                <IconButton
                  type="submit"
                  disabled={loading}
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    boxShadow: '0 2px 8px rgba(103, 58, 183, 0.25)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    ml: 0.5,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'scale(1.05)'
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'action.disabledBackground',
                      color: 'action.disabled'
                    }
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Selected File Indicator */}
            {postContent?.picture && (
              <Box sx={{ mt: 1.5, ml: 8 }}>
                <Chip
                  label={postContent.picture.name}
                  size="small"
                  onDelete={handleRemoveFile}
                  sx={{
                    maxWidth: 250,
                    '& .MuiChip-label': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Posts List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isLoading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : Array.isArray(posts) && posts.length > 0 ? (
              posts
                .slice(0)
                .reverse()
                .map((post, index) => (
                  <PostCard
                    key={post._id}
                    id={post._id ?? ''}
                    content={post.content}
                    date={post.postedAt}
                    postedBy={post.postedBy}
                    index={index}
                  />
                ))
            ) : (
              <Box
                sx={{
                  py: 8,
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Typography color="text.secondary">
                  Nenhum post encontrado. Seja o primeiro a publicar!
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Sidebar */}
        {!isMobile && (
          <Box
            sx={{
              width: { md: 280, lg: 300 },
              flexShrink: 0,
              alignSelf: 'flex-start',
              position: 'sticky',
              top: 16,
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              overflowX: 'hidden',
              pr: 0.5,
              pb: 2,
              '&::-webkit-scrollbar': {
                width: 4
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(103, 58, 183, 0.2)',
                borderRadius: 2
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(103, 58, 183, 0.4)'
              }
            }}
          >
            <SuggestionsPanel />
            <TrendingPanel />
          </Box>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ borderRadius: 2 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <LoadingBackdrop open={loading} handleClose={() => setLoading(false)} />
    </Box>
  )
}
