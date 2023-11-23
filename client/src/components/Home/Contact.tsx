import { useTheme } from '@mui/material'
import { Avatar, Box, Tooltip, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function ContactAppLayout({ name, avatar } : { name: string, avatar?: string }): ReactElement {
    const theme = useTheme()

    return (
        <Box p={1}
            sx={{
                cursor: 'pointer',
                transition: 'ease .3s',
                borderRadius: 2,
                ':hover': { bgcolor: 'background.paper', boxShadow: theme.shadows[2] }
            }}
            display='flex'
            alignItems='center'
        >
            <Avatar
                variant='rounded'
                sx={{ borderRadius: 3 }}
            >
                {avatar ?
                    <img src={avatar} alt="Avatar" />
                    :
                    name.charAt(0).toUpperCase()
                }
            </Avatar>
            <Box ml={2} >
                {
                    name.length > 13 ?
                        <Tooltip title={name}>
                            <Typography variant='body1'>{name.substring(13, 0) + '...'}
                            </Typography>
                        </Tooltip>
                        :
                        <Typography variant='body1'>{name}</Typography>
                }
            </Box>
        </Box>
    )
}
