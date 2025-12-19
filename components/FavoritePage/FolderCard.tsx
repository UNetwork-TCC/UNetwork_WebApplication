'use client'

import { type ReactElement, useState, type MouseEvent } from 'react'
import {
  Box,
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  keyframes
} from '@mui/material'
import {
  Folder,
  MoreHoriz,
  FolderOpen,
  Edit,
  Delete,
  InsertDriveFile
} from '@mui/icons-material'
import type { FolderColor } from './AddFolderDialog'

interface FolderCardProps {
  name: string
  filesCount: number
  lastModified: string
  color?: FolderColor
  onOpen?: () => void
  onRename?: () => void
  onDelete?: () => void
}

const colorVariants: Record<FolderColor, string> = {
  purple: 'linear-gradient(135deg, #673ab7 0%, #e91e63 100%)',
  pink: 'linear-gradient(135deg, #e91e63 0%, #673ab7 100%)',
  blue: 'linear-gradient(135deg, #2196f3 0%, #673ab7 100%)',
  green: 'linear-gradient(135deg, #4caf50 0%, #009688 100%)'
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

export function FolderCard({
  name,
  filesCount,
  lastModified,
  color = 'purple',
  onOpen,
  onRename,
  onDelete
}: FolderCardProps): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpen = () => {
    handleMenuClose()
    onOpen?.()
  }

  const handleRename = () => {
    handleMenuClose()
    onRename?.()
  }

  const handleDelete = () => {
    handleMenuClose()
    onDelete?.()
  }

  return (
    <Card
      onClick={onOpen}
      sx={{
        position: 'relative',
        p: 2.5,
        borderRadius: 3,
        cursor: 'pointer',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease',
        animation: `${fadeIn} 0.4s ease-out`,
        '&:hover': {
          borderColor: 'primary.light',
          boxShadow: '0 8px 24px rgba(103, 58, 183, 0.12)',
          transform: 'translateY(-4px)',
          '& .menu-button': {
            opacity: 1
          },
          '& .folder-icon': {
            transform: 'scale(1.05)'
          },
          '&::before': {
            opacity: 1
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background:
            'linear-gradient(135deg, rgba(103, 58, 183, 0.05) 0%, transparent 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }
      }}
    >
      {/* Menu Button */}
      <IconButton
        className="menu-button"
        onClick={handleMenuOpen}
        size="small"
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          opacity: 0,
          transition: 'opacity 0.2s ease',
          bgcolor: 'action.hover',
          '&:hover': {
            bgcolor: 'action.selected'
          }
        }}
      >
        <MoreHoriz fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={e => e.stopPropagation()}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 160,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <MenuItem onClick={handleOpen}>
          <ListItemIcon>
            <FolderOpen fontSize="small" />
          </ListItemIcon>
          <ListItemText>Abrir</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleRename}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Renomear</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>

      {/* Folder Icon */}
      <Avatar
        className="folder-icon"
        sx={{
          width: 56,
          height: 56,
          borderRadius: 3,
          mb: 2,
          background: colorVariants[color],
          boxShadow: '0 4px 12px rgba(103, 58, 183, 0.25)',
          transition: 'transform 0.3s ease'
        }}
      >
        <Folder sx={{ fontSize: 28 }} />
      </Avatar>

      {/* Content */}
      <Box sx={{ pr: 4 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          noWrap
          sx={{
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary'
          }}
        >
          <InsertDriveFile sx={{ fontSize: 14 }} />
          <Typography variant="body2">
            {filesCount} {filesCount === 1 ? 'arquivo' : 'arquivos'}
          </Typography>
        </Box>

        <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
          Modificado {lastModified}
        </Typography>
      </Box>
    </Card>
  )
}

export default FolderCard
