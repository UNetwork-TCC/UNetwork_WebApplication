import { Box, Modal, Typography, useTheme } from '@mui/material'
import { type ReactNode, type ReactElement } from 'react'
import logo from '$assets/img/Logo.png'
import lightLogo from '$assets/img/lightLogo.png'

export default function UNetworkModal({
    children,
    handleClose,
    open,
    title
} : {
    children: any,
    handleClose: () => void,
    open: boolean,
    title: string
}) : ReactNode {
    const theme = useTheme()

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            disableAutoFocus
        >
            <Box height='80vh' width='30vw' borderRadius={3} bgcolor='background.paper'>
                <Box m={3} display='flex' justifyContent='center' alignItems='center'>
                    {theme.palette.mode === 'light' ?
                        <img width={75} height={75} src={logo} alt="Logo" />
                        :
                        <img width={75} height={75} src={lightLogo} alt="Logo" />
                    }
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Box sx={{ width: '8rem', height: '1px', bgcolor: 'tinyElements' }} />
                    <Typography variant='h6' m='0 20px' fontWeight={900}>{title}</Typography>
                    <Box sx={{ width: '8rem', height: '1px', bgcolor: 'tinyElements' }} />
                </Box>
                <Box m={2.5} p={2} sx={{ '::-webkit-scrollbar': { height: 5, width: 5 } }} overflow='scroll' borderRadius={2} height='78%' bgcolor='background.card'>
                    {children}
                </Box>
            </Box>
        </Modal>
    )
}
