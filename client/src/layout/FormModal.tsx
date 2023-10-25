import { type SxProps, useMediaQuery, useTheme } from '@mui/material'
import { Typography } from '@mui/material'
import { Box, Modal } from '@mui/material'
import { useEffect, type FormEventHandler, type ReactElement } from 'react'

export default function FormModal({
    open,
    title,
    onClose,
    onSubmit,
    sx,
    children
}: {
    open: boolean,
    title: string,
    onClose: () => void,
    onSubmit?: FormEventHandler<HTMLFormElement>,
    sx?: SxProps,
    children: ReactElement | ReactElement[]
}): ReactElement {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const code: string = e.code

            if (Number(code) === 27) {
                onClose()
            }
        })
    }, [ onClose ])

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            disableAutoFocus
            disableEnforceFocus
            disableRestoreFocus
        >
            <form onSubmit={onSubmit}>
                <Box
                    sx={{
                        height: matches ? '45vh' : '40vh',
                        width: '35vw',
                        bgcolor: 'background.paper',
                        ...sx
                    }}
                    p={1}
                    borderRadius={2}
                >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            {title}
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' p={2} gap={2}>
                        {children}
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}
