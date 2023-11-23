import { Backdrop, CircularProgress } from '@mui/material'
import { type ReactElement } from 'react'

export default function LoadingBackdrop({ open, handleClose } : { open: boolean, handleClose?: () => void }): ReactElement {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
