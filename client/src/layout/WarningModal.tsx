import { Box, Button, Modal, Typography, useTheme } from '@mui/material'
import { type ReactElement } from 'react'

export default function WarningModal({ 
    text,
    open,
    onClose,
    onConfirm
} : { 
    text: string,
    open: boolean,
    onClose: () => void,
    onConfirm: () => void
}): ReactElement {
    const theme = useTheme()
    
    return (
        <Modal
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open={open}
            onClose={onClose}
        >
            <Box 
                borderRadius='10px'
                p={2}
                height='20vh'
                width='20vw'
                boxShadow={theme.shadows[10]}
                bgcolor='background.paper'
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                sx={{
                    [theme.breakpoints.down('md')]: {
                        width: '60vw',
                        height: '20vh'
                    }
                }}
            >
                <Box display='flex' flexDirection='column' gap={1}>
                    <Typography variant='h6'>Tem certeza?</Typography>
                    <Typography variant='body2'>{text}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Button onClick={onConfirm} variant='contained'>Confirmar</Button>
                    <Button onClick={onClose} variant='outlined'>Cancelar</Button>
                </Box>
            </Box>
        </Modal>
    )
}