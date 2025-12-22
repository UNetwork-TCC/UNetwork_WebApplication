'use client'

import { useState, type ReactElement, type ChangeEvent } from 'react'
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Box,
  IconButton,
  Typography,
  Alert,
  Chip
} from '@mui/material'
import {
  AddPhotoAlternate,
  Close,
  Forum as ForumIcon,
  ImageOutlined
} from '@mui/icons-material'
import { type Topic } from '@/types'

interface CreateForumDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { title: string; description: string; topic: Topic; image?: File }) => void
  isLoading?: boolean
}

export default function CreateForumDialog({
  open,
  onClose,
  onSubmit,
  isLoading = false
}: CreateForumDialogProps): ReactElement {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState<Topic>('Outro')
  const [image, setImage] = useState<File | undefined>()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    topic: false
  })

  const handleClose = (): void => {
    setTitle('')
    setDescription('')
    setTopic('Outro')
    setImage(undefined)
    setImagePreview(null)
    setErrors({ title: false, description: false, topic: false })
    onClose()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (): void => {
    setImage(undefined)
    setImagePreview(null)
  }

  const handleSubmit = (): void => {
    const newErrors = {
      title: !title.trim(),
      description: !description.trim(),
      topic: !topic
    }
    setErrors(newErrors)

    if (!newErrors.title && !newErrors.description && !newErrors.topic) {
      onSubmit({ title, description, topic, image })
      handleClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(245,247,250,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden'
        }
      }}
    >
      {/* Header with gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
          px: 3,
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
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
            <ForumIcon sx={{ color: 'white', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '0.5px'
              }}
            >
              Criar Novo Fórum
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.75rem'
              }}
            >
              Compartilhe suas dúvidas e ideias
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Title field */}
          <TextField
            label="Título do fórum"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setErrors(prev => ({ ...prev, title: false }))
            }}
            placeholder="Ex: Alguém pode me ajudar com React?"
            fullWidth
            required
            error={errors.title}
            inputProps={{ maxLength: 50 }}
            helperText={
              <Box component="span" display="flex" justifyContent="space-between">
                <span>{errors.title ? 'Campo obrigatório' : ''}</span>
                <span style={{ color: title.length > 40 ? '#f44336' : '#9e9e9e' }}>
                  {title.length}/50
                </span>
              </Box>
            }
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                bgcolor: 'rgba(103, 58, 183, 0.02)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(103, 58, 183, 0.04)'
                },
                '&.Mui-focused': {
                  bgcolor: 'white',
                  boxShadow: '0 0 0 3px rgba(103, 58, 183, 0.1)'
                }
              }
            }}
          />

          {/* Category field */}
          <FormControl fullWidth error={errors.topic}>
            <InputLabel>Categoria *</InputLabel>
            <Select
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value as Topic)
                setErrors(prev => ({ ...prev, topic: false }))
              }}
              label="Categoria *"
              sx={{
                borderRadius: 2.5,
                bgcolor: 'rgba(103, 58, 183, 0.02)',
                '&:hover': {
                  bgcolor: 'rgba(103, 58, 183, 0.04)'
                },
                '&.Mui-focused': {
                  bgcolor: 'white'
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 2,
                    mt: 1,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }
                }
              }}
            >
              <ListSubheader sx={{ bgcolor: 'rgba(103, 58, 183, 0.05)', fontWeight: 600 }}>
                Escola
              </ListSubheader>
              <MenuItem value="Escola">Escola</MenuItem>
              <MenuItem value="Trabalho/Atividade">Trabalho/Atividade</MenuItem>
              <MenuItem value="Tutoria">Tutoria</MenuItem>
              <MenuItem value="Professores">Professores</MenuItem>
              <MenuItem value="Funcionários">Funcionários</MenuItem>
              <MenuItem value="Eventos">Eventos</MenuItem>
              <MenuItem value="TCC">TCC</MenuItem>
              <ListSubheader sx={{ bgcolor: 'rgba(103, 58, 183, 0.05)', fontWeight: 600 }}>
                Cursos
              </ListSubheader>
              <MenuItem value="Desenvolvimento de Sistemas">Desenvolvimento de Sistemas</MenuItem>
              <MenuItem value="Administração">Administração</MenuItem>
              <MenuItem value="Nutrição">Nutrição</MenuItem>
              <MenuItem value="Enfermagem">Enfermagem</MenuItem>
              <ListSubheader sx={{ bgcolor: 'rgba(103, 58, 183, 0.05)', fontWeight: 600 }}>
                Vida
              </ListSubheader>
              <MenuItem value="Vida Pessoal">Vida Pessoal</MenuItem>
              <MenuItem value="Carreira">Carreira</MenuItem>
              <ListSubheader sx={{ bgcolor: 'rgba(103, 58, 183, 0.05)', fontWeight: 600 }}>
                Outro
              </ListSubheader>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
          </FormControl>

          {/* Description field */}
          <TextField
            label="Descrição"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              setErrors(prev => ({ ...prev, description: false }))
            }}
            placeholder="Descreva sua dúvida ou assunto em detalhes..."
            fullWidth
            required
            multiline
            rows={4}
            error={errors.description}
            helperText={errors.description ? 'Campo obrigatório' : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                bgcolor: 'rgba(103, 58, 183, 0.02)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(103, 58, 183, 0.04)'
                },
                '&.Mui-focused': {
                  bgcolor: 'white',
                  boxShadow: '0 0 0 3px rgba(103, 58, 183, 0.1)'
                }
              }
            }}
          />

          {/* Image upload section */}
          <input
            style={{ display: 'none' }}
            type="file"
            id="forum-image"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview ? (
            <Box
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                border: '2px solid rgba(103, 58, 183, 0.2)'
              }}
            >
              <Box
                component="img"
                src={imagePreview}
                alt="Preview"
                sx={{
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'cover'
                }}
              />
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.8)'
                  }
                }}
                size="small"
              >
                <Close fontSize="small" />
              </IconButton>
              <Chip
                icon={<ImageOutlined sx={{ fontSize: 16 }} />}
                label={image?.name}
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  maxWidth: 200
                }}
              />
            </Box>
          ) : (
            <Box
              component="label"
              htmlFor="forum-image"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                py: 3,
                px: 2,
                borderRadius: 3,
                border: '2px dashed rgba(103, 58, 183, 0.3)',
                bgcolor: 'rgba(103, 58, 183, 0.02)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(103, 58, 183, 0.05)'
                }
              }}
            >
              <AddPhotoAlternate sx={{ fontSize: 32, color: 'primary.main', opacity: 0.7 }} />
              <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                Clique para adicionar uma imagem (opcional)
              </Typography>
            </Box>
          )}

          {(errors.title || errors.description || errors.topic) && (
            <Alert
              severity="error"
              sx={{
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  alignItems: 'center'
                }
              }}
            >
              Preencha todos os campos obrigatórios!
            </Alert>
          )}
        </Box>
      </DialogContent>

      {/* Actions */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'rgba(0,0,0,0.01)'
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: 2.5,
            textTransform: 'none',
            px: 3,
            fontWeight: 500,
            borderColor: 'rgba(0,0,0,0.2)',
            color: 'text.secondary',
            '&:hover': {
              borderColor: 'rgba(0,0,0,0.3)',
              bgcolor: 'rgba(0,0,0,0.02)'
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading || !title.trim() || !description.trim() || !topic}
          sx={{
            borderRadius: 2.5,
            textTransform: 'none',
            px: 4,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
            boxShadow: '0 4px 15px rgba(103, 58, 183, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5e35b1 0%, #8e24aa 100%)',
              boxShadow: '0 6px 20px rgba(103, 58, 183, 0.4)'
            },
            '&.Mui-disabled': {
              background: 'rgba(0,0,0,0.12)'
            }
          }}
        >
          Criar Fórum
        </Button>
      </Box>
    </Dialog>
  )
}
