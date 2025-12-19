'use client'

import { type ReactElement, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material'
import { Add, Upload, Search, GridView, ViewList } from '@mui/icons-material'
import {
  AddFolderDialog,
  EmptyState,
  FolderCard,
  FileCard
} from '@/components'
import type { FolderColor } from '@/components/FavoritePage/AddFolderDialog'
import type { FileType } from '@/components/FavoritePage/FileCard'

interface Folder {
  id: string
  name: string
  filesCount: number
  lastModified: string
  color: FolderColor
}

interface File {
  id: string
  name: string
  type: FileType
  size: string
  lastModified: string
}

const initialFolders: Folder[] = [
  {
    id: '1',
    name: 'Documentos Importantes',
    filesCount: 12,
    lastModified: 'há 2 horas',
    color: 'purple'
  },
  {
    id: '2',
    name: 'Fotos de Viagem',
    filesCount: 48,
    lastModified: 'há 1 dia',
    color: 'pink'
  },
  {
    id: '3',
    name: 'Projetos',
    filesCount: 7,
    lastModified: 'há 3 dias',
    color: 'blue'
  },
  {
    id: '4',
    name: 'Músicas',
    filesCount: 156,
    lastModified: 'há 1 semana',
    color: 'green'
  }
]

const initialFiles: File[] = [
  {
    id: '1',
    name: 'Relatório Anual 2024.pdf',
    type: 'document',
    size: '2.4 MB',
    lastModified: 'Hoje'
  },
  {
    id: '2',
    name: 'Apresentação.pptx',
    type: 'document',
    size: '8.1 MB',
    lastModified: 'Ontem'
  },
  {
    id: '3',
    name: 'foto_perfil.jpg',
    type: 'image',
    size: '1.2 MB',
    lastModified: 'há 3 dias'
  }
]

export default function FavoritesPage(): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [files] = useState<File[]>(initialFiles)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'info' | 'error'
  }>({ open: false, message: '', severity: 'success' })

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddFolder = (name: string, color: FolderColor) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      filesCount: 0,
      lastModified: 'agora',
      color
    }
    setFolders([newFolder, ...folders])
    setSnackbar({
      open: true,
      message: 'Pasta criada com sucesso!',
      severity: 'success'
    })
  }

  const handleDeleteFolder = (id: string) => {
    setFolders(folders.filter(f => f.id !== id))
    setSnackbar({
      open: true,
      message: 'Pasta excluída',
      severity: 'success'
    })
  }

  const handleViewModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: 'grid' | 'list' | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const hasContent = folders.length > 0 || files.length > 0

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, rgba(103, 58, 183, 0.05) 0%, rgba(233, 30, 99, 0.03) 50%, rgba(33, 150, 243, 0.02) 100%)',
        p: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: { xs: 'stretch', sm: 'center' },
              justifyContent: 'space-between'
            }}
          >
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setIsAddDialogOpen(true)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 2.5,
                  boxShadow: '0 4px 16px rgba(103, 58, 183, 0.25)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(103, 58, 183, 0.35)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Adicionar Pasta
              </Button>
              <Button
                variant="outlined"
                startIcon={<Upload />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 2.5,
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                Upload
              </Button>
            </Box>

            {/* Search and View Toggle */}
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <TextField
                placeholder="Buscar arquivos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                size="small"
                sx={{
                  minWidth: { xs: '100%', sm: 240 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    },
                    '&.Mui-focused': {
                      bgcolor: 'background.paper'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
              />

              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                size="small"
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  '& .MuiToggleButton-root': {
                    border: 'none',
                    borderRadius: 2,
                    px: 1.5,
                    '&.Mui-selected': {
                      bgcolor: 'action.selected'
                    }
                  }
                }}
              >
                <ToggleButton value="grid">
                  <GridView fontSize="small" />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewList fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Box>

        {/* Content */}
        {!hasContent ? (
          <EmptyState onAddFolder={() => setIsAddDialogOpen(true)} />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {/* Folders Section */}
            {filteredFolders.length > 0 && (
              <Box component="section">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  mb={2.5}
                  color="text.primary"
                >
                  Pastas
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2.5,
                    gridTemplateColumns:
                      viewMode === 'grid'
                        ? {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(4, 1fr)'
                          }
                        : '1fr'
                  }}
                >
                  {filteredFolders.map((folder, index) => (
                    <Box
                      key={folder.id}
                      sx={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <FolderCard
                        name={folder.name}
                        filesCount={folder.filesCount}
                        lastModified={folder.lastModified}
                        color={folder.color}
                        onOpen={() =>
                          setSnackbar({
                            open: true,
                            message: `Abrindo pasta: ${folder.name}`,
                            severity: 'info'
                          })
                        }
                        onRename={() =>
                          setSnackbar({
                            open: true,
                            message: 'Funcionalidade de renomear',
                            severity: 'info'
                          })
                        }
                        onDelete={() => handleDeleteFolder(folder.id)}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Files Section */}
            {filteredFiles.length > 0 && (
              <Box component="section">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  mb={2.5}
                  color="text.primary"
                >
                  Arquivos Recentes
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns:
                      viewMode === 'grid'
                        ? {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)'
                          }
                        : '1fr'
                  }}
                >
                  {filteredFiles.map((file, index) => (
                    <Box
                      key={file.id}
                      sx={{
                        animationDelay: `${(filteredFolders.length + index) * 50}ms`
                      }}
                    >
                      <FileCard
                        name={file.name}
                        type={file.type}
                        size={file.size}
                        lastModified={file.lastModified}
                        onOpen={() =>
                          setSnackbar({
                            open: true,
                            message: `Abrindo: ${file.name}`,
                            severity: 'info'
                          })
                        }
                        onDownload={() =>
                          setSnackbar({
                            open: true,
                            message: `Baixando: ${file.name}`,
                            severity: 'success'
                          })
                        }
                        onDelete={() =>
                          setSnackbar({
                            open: true,
                            message: `Excluído: ${file.name}`,
                            severity: 'success'
                          })
                        }
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Empty search results */}
            {searchQuery &&
              filteredFolders.length === 0 &&
              filteredFiles.length === 0 && (
                <Box sx={{ py: 8, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    Nenhum resultado encontrado para "{searchQuery}"
                  </Typography>
                </Box>
              )}
          </Box>
        )}

        {/* Add Folder Dialog */}
        <AddFolderDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddFolder}
        />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ borderRadius: 2 }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}
