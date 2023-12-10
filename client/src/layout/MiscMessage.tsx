import { UserAvatar } from '$components'
import { CustomMenu } from '$layout'
import { useAppSelector } from '$store'
import { MoreHoriz, SubdirectoryArrowRight } from '@mui/icons-material'
import { Box, Chip, IconButton, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'

export default function MiscMessage({
    text,
    replying
}: {
    text: string
    replying?: boolean
}) {
    const user = useAppSelector(state => state.auth.user)

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuOpen, setMenuOpen ] = useState(false)

    const handleMenuClose = (): void => { setMenuOpen(false) }
    const handleMenuOpen = (e: any): void => { 
        setAnchorEl(e.currentTarget)
        setMenuOpen(true)
    }

    // const ownForumMessage = user?._id === forum?.createdBy

    return (
        <>
            {replying ? (
                <Box display='flex' gap={1} ml='3.5rem'>
                    <SubdirectoryArrowRight />
                    <Box display='flex'>
                        <UserAvatar
                            sx={{
                                borderRadius: 10,
                                height: '3.25rem',
                                width: '3.25rem'
                            }}
                            user={user}
                        />
                        <Box ml='1rem'>
                            <Box display='flex' width='100%' mb={.5} justifyContent='space-between'>
                                <Box display='flex' gap={1} alignItems='center'>
                                    <Typography sx={{ fontSize: '1rem' }}>@{user?.username}</Typography>
                                    <Typography sx={{ color: 'gray', fontSize: '1em' }}>09/21/2005</Typography>
                                    <Box>
                                        <Chip label="Respondendo" sx={{ height: '1.5rem', fontSize: '.75rem' }} onClick={() => { }} />
                                    </Box>
                                </Box>
                                <Box>
                                    <IconButton>
                                        <MoreHoriz sx={{ fontSize: '.75em' }} />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box>
                                <Typography whiteSpace='pre-wrap'>{text}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box display='flex'>
                    <UserAvatar
                        sx={{
                            borderRadius: 10,
                            height: '3.25rem',
                            width: '3.25rem'
                        }}
                        user={user}
                    />
                    <Box ml='1rem'>
                        <Box display='flex' width='100%' mb={.5} justifyContent='space-between'>
                            <Box display='flex' gap={1} alignItems='center'>
                                <Typography sx={{ fontSize: '1rem' }}>@{user?.username}</Typography>
                                <Typography sx={{ color: 'gray', fontSize: '1em' }}>09/21/2005</Typography>
                            </Box>
                            <Box>
                                <IconButton>
                                    <MoreHoriz onClick={handleMenuOpen} sx={{ fontSize: '.75em' }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box>
                            <Typography whiteSpace='pre-wrap'>{text}</Typography>
                        </Box>
                    </Box>
                </Box>
            )}
            <CustomMenu 
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {}}>Responder</MenuItem>
            </CustomMenu>
        </>
    )
}