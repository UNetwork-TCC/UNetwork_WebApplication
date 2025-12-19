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
  Description,
  Image,
  VideoLibrary,
  MusicNote,
  InsertDriveFile,
  MoreHoriz,
  Visibility,
  Download,
  Delete
} from '@mui/icons-material'

export type FileType = 'document' | 'image' | 'video' | 'audio' | 'other'

interface FileCardProps {
  name: string
  type: FileType
  size: string
  lastModified: string
  onOpen?: () => void
  onDownload?: () => void
  onDelete?: () => void
}

const fileIcons: Record<FileType, typeof Description> = {
  document: Description,
  image: Image,
  video: VideoLibrary,
  audio: MusicNote,
  other: InsertDriveFile
}

const fileColors: Record<FileType, string> = {
  document: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
  image: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
  video: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
  audio: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
  other: 'linear-gradient(135deg, #607d8b 0%, #455a64 100%)'
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

export function FileCard({
  name,
  type,
  size,
  lastModified,
  onOpen,
  onDownload,
  onDelete
}: FileCardProps): ReactElement {
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

  const handleDownload = () => {
    handleMenuClose()
    onDownload?.()
  }

  const handleDelete = () => {
    handleMenuClose()
    onDelete?.()
  }

  const Icon = fileIcons[type]

  return (
    <Card
      onClick={onOpen}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 3,
        cursor: 'pointer',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease',
        animation: `${fadeIn} 0.4s ease-out`,
        '&:hover': {
          borderColor: 'primary.light',
          boxShadow: '0 4px 16px rgba(103, 58, 183, 0.08)',
          '& .menu-button': {
            opacity: 1
          },
          '& .file-icon': {
            transform: 'scale(1.05)'
          }
        }
      }}
    >
      {/* File Icon */}
      <Avatar
        className="file-icon"
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          background: fileColors[type],
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease',
          flexShrink: 0
        }}
      >
        <Icon sx={{ fontSize: 24 }} />
      </Avatar>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          fontWeight={500}
          noWrap
          sx={{
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
            gap: 1,
            color: 'text.secondary'
          }}
        >
          <Typography variant="caption">{size}</Typography>
          <Typography variant="caption">•</Typography>
          <Typography variant="caption">{lastModified}</Typography>
        </Box>
      </Box>

      {/* Menu Button */}
      <IconButton
        className="menu-button"
        onClick={handleMenuOpen}
        size="small"
        sx={{
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
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>Visualizar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Baixar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default FileCard
