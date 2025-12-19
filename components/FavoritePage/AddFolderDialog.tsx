'use client'

import { useState, type ReactElement } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Avatar
} from '@mui/material'
import { Folder } from '@mui/icons-material'

interface AddFolderDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (name: string, color: FolderColor) => void
}

export type FolderColor = 'purple' | 'pink' | 'blue' | 'green'

const colorOptions: { value: FolderColor; gradient: string }[] = [
  { value: 'purple', gradient: 'linear-gradient(135deg, #673ab7 0%, #e91e63 100%)' },
  { value: 'pink', gradient: 'linear-gradient(135deg, #e91e63 0%, #673ab7 100%)' },
  { value: 'blue', gradient: 'linear-gradient(135deg, #2196f3 0%, #673ab7 100%)' },
  { value: 'green', gradient: 'linear-gradient(135deg, #4caf50 0%, #009688 100%)' }
]

export function AddFolderDialog({
  open,
  onClose,
  onAdd
}: AddFolderDialogProps): ReactElement {
  const [name, setName] = useState('')
  const [selectedColor, setSelectedColor] = useState<FolderColor>('purple')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAdd(name.trim(), selectedColor)
      setName('')
      setSelectedColor('purple')
      onClose()
    }
  }

  const handleClose = () => {
    setName('')
    setSelectedColor('purple')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #673ab7 0%, #e91e63 100%)'
            }}
          >
            <Folder sx={{ fontSize: 20 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Nova Pasta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crie uma nova pasta para organizar seus arquivos.
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nome da pasta"
              placeholder="Minha pasta"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              autoFocus
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'action.hover'
                }
              }}
            />

            <Box>
              <Typography variant="body2" fontWeight={500} mb={1.5}>
                Cor
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {colorOptions.map(color => (
                  <Box
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: color.gradient,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      transform:
                        selectedColor === color.value ? 'scale(1.15)' : 'scale(1)',
                      boxShadow:
                        selectedColor === color.value
                          ? '0 0 0 3px rgba(103, 58, 183, 0.3)'
                          : 'none',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2 }}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!name.trim()}
            sx={{ borderRadius: 2 }}
          >
            Criar Pasta
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddFolderDialog
