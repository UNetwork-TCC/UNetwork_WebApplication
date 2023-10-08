import { useState, type ReactElement } from 'react'
import { Avatar, Box, FormHelperText, IconButton, Modal, Typography } from '@mui/material'

export default function ForumIcon({ name, topic, people, image: src } : { name: string, topic: string, people: number, image?: string }): ReactElement {
    const [ open, setOpen ] = useState(false)

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    return (
        <>
            <Box display='flex' sx={{ cursor: 'pointer' }} onClick={handleOpen}>
                <IconButton>
                    <Avatar 
                        sx={{
                            height: 50,
                            width: 50
                        }} 
                        variant='rounded'
                    >
                        {(src ?? false) ? 
                            <img src={src} alt={'Fórum ' + name} />
                            :
                            name.charAt(0).toUpperCase()
                        }
                    </Avatar>
                </IconButton>
                <Box display='flex' justifyContent='center' flexDirection='column'>
                    <Typography>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                    <Box gap={1} display='flex'>
                        <FormHelperText>{topic.charAt(0).toUpperCase() + topic.slice(1)}</FormHelperText>
                        <FormHelperText>•</FormHelperText>
                        <FormHelperText>{people + ' Pessoas estão nesta discussão'}</FormHelperText>
                    </Box>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box></Box>
            </Modal>
        </>
    )
}
