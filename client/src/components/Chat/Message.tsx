import { Avatar, useTheme } from '@mui/material'
import { Box, type SxProps, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { type ReactElement } from 'react'

export default function Message({ 
    text,
    messageFrom = 'me',
    sendedAt = 'Agora há pouco'
} : {
    text: string,
    messageFrom?: 'me' | 'him',
    sendedAt: string | 'Agora há pouco'
}) : ReactElement {
    const theme = useTheme()

    let messageStyle: SxProps = {
        boxShadow: theme.shadows[2],
        borderRadius: 5,
        p: 2
    }

    if (messageFrom === 'me')
        messageStyle = {
            ...messageStyle,
            bgcolor: grey[100]
        }
    else
        messageStyle = {
            ...messageStyle,
            bgcolor: 'white'
        }

    return (
        <>
            <Box display='flex' justifyContent={messageFrom === 'him' ? 'start' : 'end'} width='100%'>
                <Box maxWidth='60%' sx={messageStyle}>
                    <Typography>
                        {text}
                    </Typography>
                </Box>
            </Box>
            <Box display='flex' flexDirection=''>
                <Avatar 
                    sx={{
                        position: 'relative',
                        height: 25,
                        width: 25,
                        left: messageFrom === 'me' && '96.5%',
                        right: messageFrom === 'him' && 8,
                        bottom: 15
                    }}
                />
                <Typography variant='caption'>
                    {sendedAt}
                </Typography>
            </Box>
        </>
    )
}