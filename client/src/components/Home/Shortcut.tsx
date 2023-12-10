import { themeContext } from '$contexts'
import { Circle } from '@mui/icons-material'
import { Box, Tooltip, Typography } from '@mui/material'
import { useContext, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Shortcut({ 
    title,
    category,
    color,
    link
} : {
    title: string,
    category: string,
    color: string,
    link?: string
}) : ReactElement {
    const navigate = useNavigate()

    const { theme, setTheme } = useContext(themeContext)

    return (
        <Box  
            sx={{
                '&': {
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2.5,
                    gap: 2,
                    borderRadius: 2,
                    bgcolor: 'transparent',
                    transition: '.3s ease-in-out',
                    cursor: 'pointer',
                    [theme.breakpoints.down('lg')]: { height:40, mb:2 }

                },

                ':hover': {
                    transition: '.3s ease-in-out'
                }
            }}
            onClick={() => {
                if (link) {
                    navigate(link)
                }
            }}
        >
            
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height={35}
                width={35}
                borderRadius={3}
                border={`1px solid ${color}10`}
                sx={{ background: `${color}10`, [theme.breakpoints.down('lg')]: { height:30, width:30 } }}
            >
                <Circle sx={{ height: 12.5, color }} />
            </Box>
            <Box>
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
