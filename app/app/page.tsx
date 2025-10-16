'use client'

import {
  Alert,
  Avatar,
  Box,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Post, SideComponent } from '@/components'
import { Add, AttachFile } from '@mui/icons-material'
import { CustomInput, LoadingBackdrop } from '@/layout'
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

  const [fetchPosts, { isLoading, data: posts }] = useFetchPostsMutation()
  const [uploadPicture] = useUploadFileMutation()
  const [createPost] = useCreatePostMutation()
  const [updateUser] = useUpdateUserMutation()

  const [postContent, setPostContent] = useState<{
    text?: string
    picture?: Partial<MulterFile> & Partial<IPicture> & File
  }>()
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const user = useAppSelector(state => state.auth.user)

  const handleSnackbarOpen = (): void => {
    setSnackbarOpen(true)
  }
  const handleSnackbarClose = (): void => {
    setSnackbarOpen(false)
  }

  const [loading, setLoading] = useState<boolean>(false)

  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    if (!postContent?.text && !postContent?.picture) {
      setLoading(false)
      alert('Você precisa de pelo menos um conteúdo para publicar!')
      return
    }

    let data: any

    if ((postContent?.picture?.size ?? 0) >= 5000000) {
      handleSnackbarOpen()
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
      }

      await updateUser({
        _id: user._id ?? '',
        posts: [...user.posts, data.postUpdates]
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!loading) {
      ;(async () => {
        await fetchPosts(null)
      })()
    }
  }, [loading, fetchPosts])

  const closeBackdrop = (): void => {
    setLoading(false)
  }

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%" gap={{ md: 2, lg: 3, xl: 4 }}>
        <Box
          width={matches ? '100%' : undefined}
          height="100%"
          display="flex"
          justifyContent="start"
          alignItems="center"
          flexDirection="column"
          sx={{
            flex: { md: '1 1 60%', lg: '1 1 50%', xl: '1 1 50%' },
            maxWidth: { md: '700px', lg: '700px', xl: '900px' },
            px: { xs: 2, md: 3, lg: 3.5, xl: 4 },
            py: { xs: 2, md: 3, lg: 3.5, xl: 4 },
            mx: { xs: 0, md: 2, lg: 3, xl: 4 }
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={5}
            width="100%"
            id="inicio"
          >
            {/* <ClipsWrapper /> */}
            <Box width="100%" >
              <form
                onSubmit={e => {
                  handleSubmit(e)
                }}
              >
                <CustomInput
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                    setPostContent({ ...postContent, text: e.target.value })
                  }}
                  sx={{ boxShadow: theme.shadows[4] }}
                  bgcolor={theme.palette.mode === 'light' ? 'white' : undefined}
                  placeholder="No que estou pensando..."
                  color={
                    theme.palette.mode === 'light' ? 'primary.main' : undefined
                  }
                  iconColor="#dbdbdb"
                  icon={<Add />}
                  multiline
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    position: 'relative',
                    width: '50px',
                    bottom: { xs: 44, sm: 46, md: 47 },
                    right: {
                      xs: '0.5rem',
                      sm: '3rem',
                      md: '3.5rem',
                      lg: '4rem'
                    }
                  }}
                >
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setPostContent({ ...postContent, picture: file })
                      }
                    }}
                    style={{ display: 'none' }}
                    type="file"
                    id="file"
                    accept="image/*"
                  />
                  <Box
                    position="relative"
                    left="2.5rem"
                    display="flex"
                    flexDirection="column"
                  >
                    <Avatar
                      component="label"
                      htmlFor="file"
                      sx={{
                        cursor: 'pointer',
                        transition: '.3s',
                        bgcolor: 'primary.main',
                        ':hover': {
                          bgcolor: 'primary.light'
                        },
                        [theme.breakpoints.only('md')]: {
                          width: '35px',
                          height: '35px'
                        }
                      }}
                    >
                      <AttachFile />
                    </Avatar>
                    <Box width="80px" position="relative">
                      {postContent?.picture && (
                        <Typography
                          variant="body2"
                          position="relative"
                          right="1.5rem"
                          top="10px"
                          noWrap
                          width="100%"
                        >
                          {postContent.picture.name}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            mt={{ xs: 2, md: 3, lg: 4, xl: 5 }}
          >
            {isLoading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : Array.isArray(posts) ? (
              posts
                .slice(0)
                .reverse()
                .map(post => (
                  <Post
                    key={post._id}
                    id={post._id ?? ''}
                    content={post.content}
                    date={post.postedAt}
                    postedBy={post.postedBy}
                  />
                ))
            ) : null}
          </Box>
        </Box>
        {!matches && (
          <Box
            sx={{
              flex: { md: '0 0 280px', lg: '0 0 320px', xl: '0 0 360px' },
              maxWidth: { md: '280px', lg: '320px', xl: '360px' },
              mr: { md: 2, lg: 3, xl: 4 }
            }}
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            pt={{ md: 3, lg: 3.5, xl: 4 }}
          >
            <Box
              bgcolor="background.paper"
              borderRadius={5}
              width="100%"
              boxShadow={theme.shadows[15]}
              p={{ md: 2.5, lg: 3, xl: 3.5 }}
              sx={{
                position: 'sticky',
                top: { md: '1rem', lg: '1.5rem', xl: '2rem' },
                minHeight: { md: '14rem', lg: '15rem', xl: '16rem' }
              }}
            >
              <SideComponent user={user} />
            </Box>
          </Box>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          A imagem colocada excede os limites de tamanho (32mb)!
        </Alert>
      </Snackbar>
      <LoadingBackdrop open={loading} handleClose={closeBackdrop} />
    </>
  )
}
