'use client'

import { type User } from '@/types'
import { type ReactElement } from 'react'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/material'
import { useNavigate } from '@/hooks'
import { UserAvatar } from '@/components'

export default function SideComponent({
  user
}: {
  user: User | Record<string, unknown>
}): ReactElement {
  const navigate = useNavigate()

  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <Box display="flex" gap={1.5} alignItems="center">
        <UserAvatar
          user={user as User}
          sx={{ borderRadius: '50%', height: 40, width: 40 }}
        />
        <Box display="flex" flexDirection="column" sx={{ minWidth: 0 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            noWrap
            sx={{ fontSize: { md: '0.85rem', lg: '0.9rem' } }}
          >
            @{String(user?.username)}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            noWrap
            sx={{ fontSize: { md: '0.75rem', lg: '0.8rem' } }}
          >
            {String(user?.name)}
          </Typography>
        </Box>
      </Box>
      <Button
        onClick={() => {
          navigate('/app/profile/' + String(user?._id))
        }}
        variant="contained"
        size="small"
        fullWidth
        sx={{
          mt: 1,
          fontSize: { md: '0.75rem', lg: '0.8rem' },
          py: { md: 0.75, lg: 1 }
        }}
      >
        Ver perfil
      </Button>
    </Box>
  )
}
