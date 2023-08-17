import { useTheme } from '@emotion/react'
import { Circle } from '@mui/icons-material'
import { Box, Tooltip, Typography } from '@mui/material'

export default function Shortcut({ title, category, color }) {
    const theme = useTheme()

    return (
        <Box p
            sx={{
                cursor: 'pointer',
                transition: 'ease .3s',
                borderRadius: 2,
                ':hover': { bgcolor: 'background.paper', boxShadow: theme.shadows[2] }
            }}
            display='flex'
            alignItems='center'>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height={35}
                width={35}
                borderRadius={3}
                border={`1px solid ${color}10`}
                sx={{ background: `${color}10` }}
            >
                <Circle sx={{ height: 12.5, color }} />
            </Box>
            <Box ml={2} >
                {
                    title.length > 10 ?
                        <Tooltip title={title}>
                            <Typography variant='body1'>{title.substring(10, 0) + '...'}
                            </Typography>
                        </Tooltip>
                        :
                        <Typography variant='body1'>{title}</Typography>
                }
                <Typography color='text.secondary' variant='subtitle2'>{category}</Typography>
            </Box>
        </Box>
    )
}
