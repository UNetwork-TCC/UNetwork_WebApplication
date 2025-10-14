'use client';

import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { type ReactElement } from 'react'

function ErrorPage(): ReactElement {
    const router = useRouter()

    return (
        <>
            <style>
                {
                    `html {
                        overflow: hidden;
                    }`
                }
            </style>
            <Box height='100vh' display='flex' justifyContent='center' alignItems={'center'} flexDirection='column'>
                <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' position='absolute'>
                    <Image alt='' src='/assets/svg/Error/TopDecoration.svg' />
                </Box>
                <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' position='absolute' top={'62%'}>
                    <Image alt='' src='/assets/svg/Error/BottomDecoration.svg' />
                </Box>
                <Box p={1} m={1} display='flex' alignItems='center' width='70%' height='50%'>
                    <Box>
                        <Image alt='' style={{ position: 'relative' }} src='/assets/svg/Error/ErrorSvg.svg' />
                    </Box>
                    <Box m={5} height='50%' width='5px' bgcolor='divider'></Box>
                    <Box m={3} display='flex' flexDirection='column' height='80%'>
                        <Box display='flex' flexDirection='column'>
                            <Typography m={1} variant="h1" color='secondary.main' fontSize='9rem' fontWeight={900}>404</Typography>
                            <Typography m={1} variant="h4" fontWeight={900}>Essa página não existe</Typography>
                            <Typography m={1} variant="h5">Você pode ficar e relaxar aqui ou voltar ao começo.</Typography>
                        </Box>
                        <Box>
                            <Button 
                                onClick={() => { router.push('/app') }} sx={{ marginLeft: '8px', marginTop: '25px', borderRadius: '15px' }}
                                variant="contained"
                            >
                                Volte para o início
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ErrorPage