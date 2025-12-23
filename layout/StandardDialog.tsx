'use client'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  useTheme
} from '@mui/material'
import {
  Close,
  CheckCircle,
  Warning,
  Error,
  Info,
  Help
} from '@mui/icons-material'
import { type ReactElement, type ReactNode } from 'react'

export type DialogVariant = 'confirm' | 'alert' | 'info' | 'success' | 'warning' | 'error'

export interface StandardDialogProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children?: ReactNode
  variant?: DialogVariant
  icon?: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmLoading?: boolean
  hideCancel?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg'
}

const variantConfig: Record<DialogVariant, { icon: ReactNode; color: string; gradient: string }> = {
  confirm: {
    icon: <Help />,
    color: 'primary.main',
    gradient: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)'
  },
  alert: {
    icon: <Warning />,
    color: 'warning.main',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)'
  },
  info: {
    icon: <Info />,
    color: 'info.main',
    gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)'
  },
  success: {
    icon: <CheckCircle />,
    color: 'success.main',
    gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)'
  },
  warning: {
    icon: <Warning />,
    color: 'warning.main',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)'
  },
  error: {
    icon: <Error />,
    color: 'error.main',
    gradient: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)'
  }
}

export default function StandardDialog({
  open,
  onClose,
  title,
  description,
  children,
  variant = 'confirm',
  icon,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  confirmLoading = false,
  hideCancel = false,
  maxWidth = 'sm'
}: StandardDialogProps): ReactElement {
  const theme = useTheme()
  const config = variantConfig[variant]

  const handleCancel = (): void => {
    onCancel?.()
    onClose()
  }

  const handleConfirm = (): void => {
    onConfirm?.()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden'
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: config.gradient,
          px: 3,
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              bgcolor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& svg': {
                color: 'white',
                fontSize: 24
              }
            }}
          >
            {icon || config.icon}
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: '1.15rem'
            }}
          >
            {title}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 3 }}>
        {description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: children ? 3 : 0, lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        )}
        {children}
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          px: 3,
          py: 2.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          gap: 1.5
        }}
      >
        {!hideCancel && (
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{
              borderRadius: 2.5,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              minWidth: 100
            }}
          >
            {cancelText}
          </Button>
        )}
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={confirmLoading}
          sx={{
            borderRadius: 2.5,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            minWidth: 100,
            background: config.gradient,
            '&:hover': {
              background: config.gradient,
              filter: 'brightness(0.9)'
            }
          }}
        >
          {confirmLoading ? 'Carregando...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// Componente auxiliar para dialogo de confirmacao de acao destrutiva
export function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar exclusao',
  description = 'Esta acao nao pode ser desfeita. Deseja continuar?',
  itemName
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  itemName?: string
}): ReactElement {
  return (
    <StandardDialog
      open={open}
      onClose={onClose}
      title={title}
      description={itemName ? `Tem certeza que deseja excluir "${itemName}"? ${description}` : description}
      variant="error"
      confirmText="Excluir"
      cancelText="Cancelar"
      onConfirm={onConfirm}
    />
  )
}

// Componente auxiliar para dialogo de sucesso
export function SuccessDialog({
  open,
  onClose,
  title = 'Sucesso!',
  description
}: {
  open: boolean
  onClose: () => void
  title?: string
  description: string
}): ReactElement {
  return (
    <StandardDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      variant="success"
      confirmText="Ok"
      hideCancel
      onConfirm={onClose}
    />
  )
}

// Componente auxiliar para dialogo de alerta/aviso
export function AlertDialog({
  open,
  onClose,
  title = 'Atencao',
  description
}: {
  open: boolean
  onClose: () => void
  title?: string
  description: string
}): ReactElement {
  return (
    <StandardDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      variant="warning"
      confirmText="Entendi"
      hideCancel
      onConfirm={onClose}
    />
  )
}
