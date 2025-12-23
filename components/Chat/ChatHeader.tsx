'use client'

import {
  Box,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
  alpha,
  MenuItem
} from '@mui/material'
import {
  ArrowBack,
  MoreVert,
  AccountBox,
  Search,
  FmdGood,
  Delete,
  Report,
  Block
} from '@mui/icons-material'
import { type ReactElement, useState } from 'react'
import { UserAvatar } from '@/components'
import { CustomMenu } from '@/layout'
import { IUser } from '@/types'

interface ChatHeaderProps {
  user: Partial<IUser> | null
  isLoading?: boolean
  onBack?: () => void
  showBackButton?: boolean
}

export default function ChatHeader({
  user,
  isLoading = false,
  onBack,
  showBackButton = false
}: ChatHeaderProps): ReactElement {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const menuItems = [
    { label: 'Ver Contato', icon: <AccountBox /> },
    { label: 'Pesquisar', icon: <Search /> },
    { label: 'Fixar', icon: <FmdGood /> },
    { label: 'Limpar conversa', icon: <Delete /> },
    { label: 'Denunciar', icon: <Report /> },
    { label: 'Bloquear', icon: <Block /> }
  ]

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: { xs: 2, sm: 3 },
        py: 1.5,
        bgcolor: theme.palette.mode === 'dark'
          ? alpha(theme.palette.common.white, 0.02)
          : theme.palette.background.paper,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      {showBackButton && (
        <IconButton
          onClick={onBack}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          <ArrowBack />
        </IconButton>
      )}

      <UserAvatar
        user={user ?? {}}
        isLoading={isLoading}
        variant="rounded"
        sx={{
          width: { xs: 44, sm: 48 },
          height: { xs: 44, sm: 48 },
          borderRadius: 2
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        {isLoading ? (
          <>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={16} />
          </>
        ) : (
          <>
            <Typography
              noWrap
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.1rem' }
              }}
            >
              {user?.name || user?.username || 'Usuário'}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary' }}
            >
              {user?.username ? `@${user.username}` : ''}
            </Typography>
          </>
        )}
      </Box>

      <IconButton
        onClick={handleMenuOpen}
        sx={{
          color: 'text.secondary',
          '&:hover': { color: 'primary.main' }
        }}
      >
        <MoreVert />
      </IconButton>

      <CustomMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuItems.map((item, i) => (
          <MenuItem key={i} onClick={handleMenuClose} disableRipple>
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </CustomMenu>
    </Box>
  )
}
