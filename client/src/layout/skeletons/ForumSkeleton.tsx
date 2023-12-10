import { MoreHoriz, MoreVert } from '@mui/icons-material'
import { IconButton, Skeleton, useTheme } from '@mui/material'
import { Card } from '@mui/material'
import { Box } from '@mui/material'

export default function ForumSkeleton() {
    const theme = useTheme()
    
    return (
        <>
            <Card variant="elevation" elevation={2} sx={{
                minHeight: '18rem',
                width: '50%',
                display: 'flex',
                fontSize: '10px',
                borderRadius: 2,
                bgcolor: 'background.secondary',
                [theme.breakpoints.down('xl')]: {
                    width: '60%'
                }
            }}>
                <Box
                    sx={{
                        width: '100%',
                        [theme.breakpoints.down('xl')]: {
                            p: 3
                        }
                    }}
                    p={4}
                >
                    <Box mb='1rem' sx={{ minHeight: '7em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    height: '5.6em',
                                    [theme.breakpoints.down('xl')]: {
                                        height: '4em'
                                    }
                                }}
                            >
                                <Skeleton
                                    variant='rectangular'
                                    sx={{
                                        borderRadius: 3,
                                        height: '3.5rem',
                                        width: '3.5rem'
                                    }}
                                />
                                <Skeleton
                                    sx={{
                                        position: 'relative',
                                        height: '2rem',
                                        width: '1.25rem',
                                        bottom: '2em',
                                        right: '0.5em',
                                        bgcolor: 'primary.dark',
                                        color: ''
                                    }}
                                />
                            </Box>
                            <Box sx={{ ml: '1rem', width: '8rem' }}>
                                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                            </Box>
                        </Box>
                        <IconButton onClick={() => { }}>
                            <MoreVert sx={{ fontSize: '1.2em' }} />
                        </IconButton>
                    </Box>
                    <Box width='100%'>
                        <Box
                            sx={{
                                minHeight: '70%',
                                [theme.breakpoints.down('xl')]: {
                                    minHeight: '60%'
                                }
                            }}
                            display='flex'
                            gap='0.75rem'
                            flexDirection='column'
                            mt='1rem'
                            mb='2rem'
                        >

                            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                        </Box>
                    </Box>
                </Box>
            </Card>
            <Card variant="elevation" elevation={2} sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '18rem',
                width: '50%',
                fontSize: '10px',
                borderRadius: 2,
                gap: 7.5,
                p: 4,
                bgcolor: 'background.secondary',
                [theme.breakpoints.down('xl')]: {
                    width: '60%'
                }
            }}>
                <Box display='flex'>
                    <Skeleton
                        sx={{
                            borderRadius: 10,
                            height: '6rem',
                            width: '3rem'
                        }}
                    />
                    <Box ml='1rem'>
                        <Box display='flex' width='100%' mb={.5} justifyContent='space-between'>
                            <Box display='flex' gap={1} alignItems='center'>
                                <Skeleton sx={{ fontSize: '1rem' }}  variant='text' />
                                <Skeleton sx={{ color: 'gray', fontSize: '1em' }} variant="text" />
                            </Box>
                            <Box>
                                <IconButton>
                                    <MoreHoriz sx={{ fontSize: '.75em' }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box>
                            <Skeleton variant='text' />
                        </Box>
                    </Box>
                </Box>
            </Card>
        </>
    )
}