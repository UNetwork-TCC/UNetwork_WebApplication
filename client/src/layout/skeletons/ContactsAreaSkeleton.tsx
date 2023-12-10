import { CustomInput } from '$layout'
import { Add, Search, Settings } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { type ReactElement } from 'react'
import { Contact } from '$components'
import ContactSkeleton from './ContactSkeleton'

export default function ContactsAreaSkeleton(): ReactElement {
    const theme = useTheme()

    return (
        <>
            <Box
                display='flex'
                height='96%'
                position='sticky'
                alignItems='start'
                maxHeight='99%'
                width='25%'
                pt={4.5}
                sx={{
                    boxSizing: 'border-box',
                    [theme.breakpoints.only('md')]: { pt:2.5 }
                }}>
                <Box sx={{ width: '100%', height: '100%' }} >
                    <Box sx={{ width: '100%', height: '12.5%' }}>
                        <Stack gap={2} sx={{ position: 'sticky', top: '0' }}>
                            <Box display={'flex'} sx={{ alignItems: 'center', ml: '5%' }}>
                                <Box sx={{ width: '70%', [theme.breakpoints.only('md')]: { ml:'5%', width:'63%' } }}>
                                    <Typography variant='h4' sx={{}}>Conversas</Typography>
                                </Box>
                                <Box sx={{ width: '25%', display: 'flex', justifyContent: 'space-between' }}>
                                    <IconButton>
                                        <Add />
                                    </IconButton>
                                    <IconButton>
                                        <Settings />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{}}>
                                <CustomInput
                                    width='95%'
                                    bgcolor={theme.palette.mode === 'light' ? 'white' : undefined}
                                    color='#673AB7'
                                    iconColor={'white'}
                                    placeholder='Procurar...'
                                    icon={<Search />}
                                    sx={{ ml: '5%' }}
                                />
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{
                        width: '100%', height: '87%',
                        overflow: 'scroll',
                        '::-webkit-scrollbar': { display: 'none' }
                    }}>
                        <Stack gap={1} sx={{ mt: '2%', width: '100%', height: '100%', [theme.breakpoints.only('md')]: { mt:'6%' } }}>
                            {[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(e => (
                                <ContactSkeleton key={e} />
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
