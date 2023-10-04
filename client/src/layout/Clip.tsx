import { Avatar, Box, Typography, useTheme } from '@mui/material'
import { type ReactElement, useState } from 'react'
export default function Clip({ postedBy, postedAt, avatar, id }: { postedBy: string, avatar?: string, postedAt: Date, id: string | number }): ReactElement {
    const theme: any = useTheme()

    const [ , setOpen ] = useState<boolean>(false)

    const handleOpen = (): void => { setOpen(true) }
    // const handleClose = () => setOpen(false)

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
                    transition: 'ease-in-out .3s'
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
                <Avatar sx={{ height: '4.2rem', width: '4.2rem',  position: 'relative', bottom: { lg: 25.5, xl: 33 }, fontSize: '1.5rem' }}>
                    { !avatar ?
                        String(postedBy).charAt(0).toUpperCase()
                        :
                        <img src={avatar} alt={'Clip de ' + postedBy} />
                    }
                </Avatar>
                <Box mt={-3}>
                    <Typography>{postedBy}</Typography>
                </Box>
            </Box>
        
        </>
    )
}