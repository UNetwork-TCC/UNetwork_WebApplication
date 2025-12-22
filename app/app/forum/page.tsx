'use client'

import { Search, Add, Forum as ForumIcon } from '@mui/icons-material'
import { LoadingBackdrop, WarningModal } from '@/layout'
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useEffect, type ReactElement, useState, type ChangeEvent } from 'react'
import {
  CreateForumDialog,
  ForumTopicCard,
  ForumTopicView
} from '@/components'
import { type Topic, type Forum, type IForum } from '@/types'
import { ForumIconSkeleton } from '@/layout/skeletons'
import {
  useCreateForumMutation,
  useFetchForumsMutation,
  useDeleteForumMutation,
  useGetForumMutation
} from '@/features/forum'
import { useAppSelector } from '@/store'
import { useUploadFileMutation } from '@/features/file'

export default function ForumHome(): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const user = useAppSelector(state => state.auth.user)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedForumId, setSelectedForumId] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [forumToDelete, setForumToDelete] = useState<string | null>(null)

  const [fetchForums, { isLoading, data: forums }] = useFetchForumsMutation()
  const [createForum] = useCreateForumMutation()
  const [deleteForum] = useDeleteForumMutation()
  const [getForum, { data: selectedForum, isLoading: isLoadingForum }] = useGetForumMutation()
  const [uploadPicture] = useUploadFileMutation()

  useEffect(() => {
    fetchForums(null)
  }, [fetchForums])

  useEffect(() => {
    if (!loadingOpen) {
      fetchForums(null)
    }
  }, [loadingOpen, fetchForums])

  useEffect(() => {
    if (selectedForumId) {
      getForum(selectedForumId)
    }
  }, [selectedForumId, getForum])

  const handleCreateForum = async (data: {
    title: string
    description: string
    topic: Topic
    image?: File
  }): Promise<void> => {
    setLoadingOpen(true)

    try {
      if (data.image) {
        const reader = new FileReader()
        reader.readAsDataURL(data.image)

        reader.addEventListener('load', async () => {
          const { data: uploadData }: any = await uploadPicture({
            file64Based: reader.result as string,
            userId: user?._id ?? '',
            at: { id: 'null', type: 'forum' }
          })

          await createForum({
            title: data.title,
            description: data.description,
            topic: data.topic,
            createdBy: user._id,
            image: uploadData.src
          })

          setLoadingOpen(false)
        })
      } else {
        await createForum({
          title: data.title,
          description: data.description,
          topic: data.topic,
          createdBy: user._id
        })
        setLoadingOpen(false)
      }
    } catch (error) {
      console.error('Error creating forum:', error)
      setLoadingOpen(false)
    }
  }

  const handleDeleteForum = async (): Promise<void> => {
    if (!forumToDelete) return

    setDeleteModalOpen(false)
    setLoadingOpen(true)

    try {
      await deleteForum(forumToDelete)
      fetchForums(null)
    } catch (error) {
      console.error('Error deleting forum:', error)
    } finally {
      setLoadingOpen(false)
      setForumToDelete(null)
    }
  }

  const filteredForums = Array.isArray(forums)
    ? forums.filter(
        (forum: Forum) =>
          forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          forum.topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  // Show topic view if a forum is selected
  if (selectedForumId && selectedForum) {
    return (
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
          minHeight: '100vh'
        }}
      >
        <Box maxWidth="800px" mx="auto">
          {isLoadingForum ? (
            <LoadingBackdrop open={true} handleClose={() => {}} />
          ) : (
            <ForumTopicView
              forum={selectedForum as IForum}
              onBack={() => setSelectedForumId(null)}
            />
          )}
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
          minHeight: '100vh',
          overflowX: 'hidden'
        }}
      >
        <Box maxWidth="800px" mx="auto" display="flex" flexDirection="column" gap={3}>
          {/* Search bar with integrated button */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar fóruns..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: 22 }} />
                  </InputAdornment>
                )
              }}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  height: 52,
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  '& fieldset': {
                    border: '1px solid rgba(103, 58, 183, 0.1)'
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    '& fieldset': {
                      borderColor: 'rgba(103, 58, 183, 0.2)'
                    }
                  },
                  '&.Mui-focused': {
                    bgcolor: 'white',
                    boxShadow: '0 4px 20px rgba(103, 58, 183, 0.1)',
                    '& fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2
                    }
                  }
                }
              }}
            />

            {/* Create button */}
            <Button
              variant="contained"
              onClick={() => setDialogOpen(true)}
              startIcon={<Add sx={{ fontSize: 20 }} />}
              sx={{
                height: 52,
                minWidth: { xs: '100%', sm: 180 },
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '0.3px',
                background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
                boxShadow: '0 4px 15px rgba(103, 58, 183, 0.3)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5e35b1 0%, #8e24aa 100%)',
                  boxShadow: '0 6px 20px rgba(103, 58, 183, 0.4)',
                  transform: 'translateY(-1px)'
                },
                '&:active': {
                  transform: 'translateY(0)'
                }
              }}
            >
              Criar Fórum
            </Button>
          </Box>

          {/* Topics list */}
          <Box display="flex" flexDirection="column" gap={1.5}>
            {isLoading ? (
              [...Array(5)].map((_, index) => <ForumIconSkeleton key={index} />)
            ) : filteredForums.length > 0 ? (
              filteredForums.map((forum: Forum) => (
                <ForumTopicCard
                  key={forum._id}
                  id={forum._id ?? ''}
                  title={forum.title}
                  topic={forum.topic}
                  participantsCount={forum.usersIn?.length || 0}
                  authorId={forum.createdBy ?? ''}
                  onClick={() => setSelectedForumId(forum._id ?? '')}
                  onDelete={() => {
                    setForumToDelete(forum._id ?? '')
                    setDeleteModalOpen(true)
                  }}
                />
              ))
            ) : (
              <Box
                textAlign="center"
                py={8}
                px={3}
                sx={{
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'rgba(103, 58, 183, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <ForumIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.6 }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}
                >
                  {searchQuery ? 'Nenhum fórum encontrado' : 'Nenhum fórum ainda'}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                  {searchQuery
                    ? 'Tente buscar com outros termos'
                    : 'Seja o primeiro a criar um fórum e iniciar uma discussão!'}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Create Forum Dialog */}
      <CreateForumDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateForum}
        isLoading={loadingOpen}
      />

      {/* Delete Confirmation Modal */}
      <WarningModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setForumToDelete(null)
        }}
        onConfirm={handleDeleteForum}
        text="Esta ação irá deletar este fórum permanentemente."
      />

      {/* Loading Backdrop */}
      <LoadingBackdrop open={loadingOpen} handleClose={() => setLoadingOpen(false)} />
    </>
  )
}
