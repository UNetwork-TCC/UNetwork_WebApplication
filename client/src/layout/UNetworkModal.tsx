import { Box, Modal, Typography, useMediaQuery, useTheme } from '@mui/material'
import { type ReactNode, useEffect } from 'react'
import logo from '$assets/img/Logo.png'
import lightLogo from '$assets/img/LightLogo.png'

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
    const matches = useMediaQuery(theme.breakpoints.down('xl'))

    const mobileMatches = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const code: string = e.code

            if (Number(code) === 27) {
                handleClose()
            }
        })

    }, [ handleClose ])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            disableAutoFocus
        >
            <Box height='80vh' width={!matches ? '30vw' : '80vw'} borderRadius={3} bgcolor='background.paper'>
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
                <Box m={2.5} 
                    p={2} 
                    sx={{ '::-webkit-scrollbar': { height: 5, width: 5 }, maxHeight: matches ? 'calc(80vh - 15rem)' : 'calc(80vh - 12rem)' }} 
                    overflow='scroll' 
                    borderRadius={2} 
                    bgcolor='background.card'>
                    {children}
                </Box>
            </Box>
        </Modal>
    )
}
