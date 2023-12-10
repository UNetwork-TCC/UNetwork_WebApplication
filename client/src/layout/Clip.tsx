import { ClipComponent } from '$components'
import { Avatar, Box, Modal, Typography, useTheme } from '@mui/material'
import { type ReactElement, useState } from 'react'
export default function Clip({ postedBy, postedAt, avatar, id }: { postedBy: string, avatar?: string, postedAt: Date, id: string | number }): ReactElement {
    const theme: any = useTheme()

    const [ open, setOpen ] = useState<boolean>(false)

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const border = '5px'

    return (
        <>
            <Box onClick={handleOpen} sx={{
                '&': {
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '2rem',
                    width: '2rem',
                    margin: 'auto',
                    position: 'relative',
                    padding: '2rem',
                    boxSizing: 'border-box',
                    backgroundClip: 'padding-box',
                    borderRadius: '100%',
                    cursor: 'pointer',
                    transition: 'ease-in-out .3s',
                    [theme.breakpoints.down('lg')]:{
                        p: '2rem 1.7rem ',
                        pb:'1.4rem'
                        
                    }
                },

                '&:hover': {
                    transform: 'scale(1.1)'
                },

                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    left: 0,
                    margin: `-${border}`,
                    borderRadius: 'inherit',
                    background: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.contrast.main})`
                }
            }}>
                <Avatar sx={{
                    fontSize: '1.5rem',
                    height: '4.2rem',
                    width: '4.2rem',
                    position: 'relative',
                    bottom: 33,
                    [theme.breakpoints.down('xl')]: {
                        bottom: 25.5
                    },
                    [theme.breakpoints.down('lg')]: {
                        height:'3.5rem',
                        width:'3.5rem'
                    }
                }}>
                    {!avatar ?
                        String(postedBy).charAt(0).toUpperCase()
                        :
                        <img src={avatar} alt={'Clip de ' + postedBy} />
                    }
                </Avatar>
                <Box mt={-3}>
                    <Typography sx={{ [theme.breakpoints.down('lg')]: { mt:'15%' } }}>{postedBy}</Typography>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                disableAutoFocus
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw'
                }}
            >               
                <ClipComponent />
            </Modal>
        </>
    )
}