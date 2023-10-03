import { Avatar, Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
export default function Clip({ postedBy, postedAt, avatar, id }: { postedBy: string, avatar?: string, postedAt: Date, id: string | number }) {
    const theme: any = useTheme()


    const [ _, setOpen ] = useState<boolean>(false)

    const handleOpen = () => setOpen(true)
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
                    background: '#000',
                    backgroundClip: 'padding-box',
                    border: `solid ${border} transparent`,
                    borderRadius: '100%'
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
                <Avatar sx={{ height: '4.1rem', width: '4.1rem',  position: 'relative', bottom: 33, fontSize: '1.5rem' }}>
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