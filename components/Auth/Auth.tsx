import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import { Footer, LandingPageHeader } from '@/layout'
import React, { type ReactElement } from 'react'
import { useTheme } from '@mui/material'
import { GoogleAuth } from '@/components'

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
            <Box
                minHeight='65vh'
                width='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
                p={{ xs: 2, sm: 3, md: 5 }}
            >
                <Box
                    height='100%'
                    width='100%'
                    display='flex'
                    flexDirection={{ xs: 'column', md: 'row' }}
                    justifyContent='center'
                    alignItems='center'
                    gap={{ xs: 3, md: 0 }}
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='start'
                        minHeight={{ xs: 'auto', md: '60vh' }}
                        width={{ xs: '100%', sm: '90%', md: '80%' }}
                        mb={{ xs: 3, md: 0 }}
                        borderRadius={5}
                        border={`1px solid ${theme.palette.primary.main}`}
                        sx={{
                            px: { xs: 1, sm: 2 }
                        }}
                    >
                        <Typography
                            m={{ xs: 2, sm: 3 }}
                            variant='h5'
                            color='primary.main'
                            fontWeight={900}
                            textAlign='center'
                            sx={{
                                fontSize: { xs: '1.25rem', sm: '1.5rem' }
                            }}
                        >
                            {formTitle}
                        </Typography>
                        <Box
                            display='flex'
                            gap={{ xs: 3, sm: 5 }}
                            flexWrap='wrap'
                            justifyContent='center'
                        >
                            <GoogleAuth />
                            <IconButton>
                                <img
                                    src='/assets/svg/Auth/FacebookLogo.svg'
                                    style={{
                                        height: '3rem',
                                        width: '3rem'
                                    }}
                                    alt='Facebook login'
                                />
                            </IconButton>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            width='100%'
                            maxWidth='500px'
                            px={{ xs: 2, sm: 0 }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    height: '1px',
                                    bgcolor: 'tinyElements'
                                }}
                            />
                            <Typography m={2}>Ou...</Typography>
                            <Box
                                sx={{
                                    flex: 1,
                                    height: '1px',
                                    bgcolor: 'tinyElements'
                                }}
                            />
                        </Box>
                        {form}
                    </Box>
                </Box>
                {!matches && (
                    <Box
                        height='100%'
                        width='100%'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        {side}
                    </Box>
                )}
            </Box>
            <Footer />
        </Box>
    )
}