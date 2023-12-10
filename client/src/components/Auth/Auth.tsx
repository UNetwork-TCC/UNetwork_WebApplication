import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import { Footer, LandingPageHeader } from '$layout'
import facebookLogo from '$assets/svg/Auth/FacebookLogo.svg'
import React, { type ReactElement } from 'react'
import { useTheme } from '@mui/material'
import { GoogleAuth } from '$components'

export default function Auth({
    form,
    side,
    formTitle
}: {
    form: React.ReactNode,
    side: React.ReactNode,
    formTitle: string
}): ReactElement {
    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box bgcolor='background.paper'>
            <LandingPageHeader />
            <Box minHeight='65vh' width='100%' display='flex' justifyContent='center' alignItems='center' p={5}>
                <Box height='100%' width='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='start'
                        minHeight='60vh'
                        width={!matches ? '80%' : '100%'}
                        mb={!matches ? 0 : 15}
                        borderRadius={5}
                        border={`1px solid ${theme.palette.primary.main}`}
                    >
                        <Typography m={3} variant='h5' color='primary.main' fontWeight={900} textAlign='center'>{formTitle}</Typography>
                        <Box display='flex' gap={5}>
                            <GoogleAuth />
                            <IconButton>
                                <img src={facebookLogo} style={{ height: '3rem', width: '3rem' }} />
                            </IconButton>
                        </Box>
                        <Box display='flex' alignItems='center'>
                            <Box sx={{ width: '8rem', height: '1px', bgcolor: 'tinyElements' }} />
                            <Typography m={2}>Ou...</Typography>
                            <Box sx={{ width: '8rem', height: '1px', bgcolor: 'tinyElements' }} />
                        </Box>
                        {form}
                    </Box>
                </Box>
                {!matches && (
                    <Box height='100%' width='100%' display='flex' justifyContent='center' alignItems='center'>
                        {side}
                    </Box>
                )}
            </Box>
            <Footer />
        </Box>
    )
}