import { Avatar, useTheme } from '@mui/material'
import { Box, type SxProps, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { type ReactElement } from 'react'

export default function Message({ 
    text,
    messageFrom = 'me',
    sendedAt = '00:00'
} : {
    text: string,
    messageFrom?: 'me' | 'him',
    sendedAt?: string | 'Agora há pouco'
}) : ReactElement {
    const theme = useTheme()

    let messageStyle: SxProps = {
        boxShadow: theme.shadows[2],
        borderRadius: 4,
        p: 1.5
    }

    if (messageFrom === 'me')
        messageStyle = {
            ...messageStyle,
            bgcolor: theme.palette.primary.dark,
            color: 'white'
        }
    else
        messageStyle = {
            ...messageStyle,
            bgcolor: theme.palette.mode === 'dark' ?
                '#444047' 
                :
                theme.palette.background.paper
        }

    return (
        <Box width='100%'>
            <Box display='flex' justifyContent={messageFrom === 'him' ? 'start' : 'end'} width='100%'>
                <Box maxWidth='60%' sx={messageStyle}>
                    <Typography>
                        {text}
                    </Typography>
                </Box>
            </Box>
            <Box
                display='flex'
                width='100%'
                position='relative'
                left={messageFrom === 'me' && '98%'}
            >
                <Avatar 
                    sx={{
                        position: 'relative',
                        height: 25,
                        width: 25,
                        bottom: 15,
                        right: 5
                    }}
                />
                <Typography
                    display='flex'
                    position='relative'
                    variant='caption'
                    width='100%'
                    top={2}
                    right={messageFrom === 'me' ? '11%' : '1%'}
                >
                    {sendedAt}
                </Typography>
            </Box>
        </Box>
    )
}