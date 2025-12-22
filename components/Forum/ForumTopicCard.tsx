'use client'

import { useState, useEffect, type ReactElement } from 'react'
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { red } from '@mui/material/colors'
import { type User } from '@/types'
import { useGetUserMutation } from '@/features/user'
import { useAppSelector } from '@/store'

interface ForumTopicCardProps {
  id: string
  title: string
  topic: string
  participantsCount: number
  authorId: string
  onClick: () => void
  onDelete?: () => void
}

export default function ForumTopicCard({
  id,
  title,
  topic,
  participantsCount,
  authorId,
  onClick,
  onDelete
}: ForumTopicCardProps): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const currentUser = useAppSelector(state => state.auth.user)
  const [getUser, { data: author, isLoading }] = useGetUserMutation()

  const isOwner = currentUser?._id === authorId

  useEffect(() => {
    if (authorId) {
      getUser(authorId)
    }
  }, [authorId, getUser])

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const getInitials = (name?: string): string => {
    if (!name) return '??'
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 3,
        bgcolor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          '& .forum-title': {
            color: 'primary.main'
          },
          '& .menu-button': {
            opacity: 1
          }
        }
      }}
    >
      <Avatar
        src={author?.avatarUrl}
        sx={{
          width: 48,
          height: 48,
          ring: '2px solid',
          ringColor: 'primary.light',
          bgcolor: 'linear-gradient(135deg, rgba(103, 58, 183, 0.8), #9c27b0)',
          background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.8), #9c27b0)',
          fontWeight: 600,
          fontSize: '1rem'
        }}
      >
        {isLoading ? '...' : getInitials(author?.name || author?.username)}
      </Avatar>

      <Box flex={1} minWidth={0}>
        <Typography
          className="forum-title"
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s ease'
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: 'text.secondary'
          }}
        >
          {topic} • {participantsCount} {participantsCount === 1 ? 'Pessoa está' : 'Pessoas estão'} nesta discussão
        </Typography>
      </Box>

      <IconButton
        className="menu-button"
        onClick={handleMenuOpen}
        sx={{
          opacity: 0,
          transition: 'opacity 0.2s ease'
        }}
      >
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 150,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation()
            handleMenuClose()
            onClick()
          }}
        >
          Abrir
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Denunciar
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Criar atalho
        </MenuItem>
        {isOwner && onDelete && (
          <MenuItem
            onClick={(e) => {
              e.stopPropagation()
              handleMenuClose()
              onDelete()
            }}
            sx={{ color: red[600] }}
          >
            Excluir
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}
