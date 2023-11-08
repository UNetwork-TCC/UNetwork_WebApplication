import { ChatBubbleRounded, FavoriteBorder, MoreVert, Reply } from '@mui/icons-material'
import { Avatar, Box, Card, IconButton, Skeleton, useTheme } from '@mui/material'
import { type ReactElement } from 'react'

export default function PostSkeleton(): ReactElement {
    const variant: any = 'iconWrapper'
    const theme = useTheme()

    return (
        <Card
            variant="elevation"
            elevation={2}
            sx={{
                display: 'flex',
                width: '75%',
                minHeight: {
                    md: '25rem',
                    xl: '20rem'
                },
                [theme.breakpoints.down('xl')]: {
                    width: '85%'
                },
                borderRadius: '20px',
                fontSize: '10px',
                mb: '3em',
                pt: 6,
                pb: 6,
                pl: 4,
                pr: 4
            }}
        >
            <Box display='flex' flexDirection='column' height='5.6em' width='100%'>
                <Box display='flex' gap={2} width='100%'>
                    <Box>
                        <Skeleton variant='rounded' sx={{ borderRadius: 3, height: '3.5rem', width: '3.5rem' }} />
                        <Skeleton variant='circular' sx={{ position: 'relative', height: '1.75rem', width: '1.75rem', bottom: '2em', right: '1em' }} />
                    </Box>
                    <Box display='flex' justifyContent='space-between' width='100%'>
                        <Box width='100%'>
                            <Skeleton variant='text' width='25%' sx={{ fontSize: '1.25rem' }} />
                            <Skeleton variant='text' width='20%' />
                        </Box>
                        <Box>
                            <IconButton>
                                <MoreVert sx={{ fontSize: '1.2em' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box display='flex' flexDirection='column' gap={1} width='100%'>
                    <Skeleton variant='text' width='100%'/>
                    <Skeleton variant='text' width='100%'/>
                    <Skeleton variant='text' width='100%'/>
                    <Skeleton variant='text' width='100%'/>
                </Box>
                <Box>
                    <Box display='flex' justifyContent='space-between' sx={{ height: '5em', mt: '1.5em' }}>
                        <Box display='flex' gap={2}>
                            <Avatar sx={{ bgcolor: 'background.paper' }} variant={variant}>
                                <IconButton>
                                    <FavoriteBorder/>
                                </IconButton>
                            </Avatar>
                            <Avatar sx={{ bgcolor: 'background.paper' }} variant={variant}>
                                <IconButton>
                                    <ChatBubbleRounded />
                                </IconButton>
                            </Avatar>

                            <Avatar sx={{ bgcolor: 'background.paper' }} variant={variant}>
                                <IconButton>
                                    <Reply sx={{ transform: 'scaleX(-1)' }} />
                                </IconButton>
                            </Avatar>
                        </Box>
                        <Box>
                            <Box display='flex'>
                                <Skeleton sx={{ height: 40, width: 40, borderRadius: 3.5, position: 'relative', left: '1.5em', zIndex: 1 }} variant='rounded' />
                                <Skeleton sx={{ height: 40, width: 40, borderRadius: 3.5, position: 'relative', top: '1em', left: '.5em', zIndex: 1 }} variant='rounded' />
                                <Skeleton sx={{ height: 40, width: 40, borderRadius: 3.5, position: 'relative', right: '.5em', zIndex: 2 }} variant='rounded' />
                                <Skeleton sx={{ height: 40, width: 40, borderRadius: 3.5, position: 'relative', top: '1em', right: '1.5em', zIndex: 1 }} variant='rounded' />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}
