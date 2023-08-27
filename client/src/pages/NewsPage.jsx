import { Box, Container, Divider, Link, Paper, Stack, Typography } from '@mui/material'

import AppLayout from '../layout/AppLayout'
import { useTheme } from '@emotion/react'
import { BuildOutlined, FilterList } from '@mui/icons-material'
import { LittleNotice, BigNotice, Notice } from '../components'

export default function NewsPage() {
    const theme = useTheme()

    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} width='100%' height='100%' fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', mb: '2%' }}>
                    <Typography sx={{ fontSize: '2.5em', color: '#673AB7', fontWeight: 'bold' }}>Notícias</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <FilterList sx={{ cursor: 'pointer', fontSize: '2em', ':hover': { color: 'text.secondary' } }} />
                        {/* Qualquer um pode filtrar */}
                        <BuildOutlined sx={{ ml: '1.5em', fontSize: '2em', transform: 'scaleX(-1)', ':hover': { color: 'text.secondary', cursor: 'pointer' } }} />
                        <Box sx={{ height: '75%', bgcolor: '#673AB7', fontSize: '1rem', borderRadius: '3.1vh', color: 'white', padding: '0.3em 1em', ml: '2em', ':hover': { cursor: 'pointer', bgcolor: '#673AB7', opacity: '0.85' } }}>CRIAR NOTÍCIAS</Box>
                        {/* unico que vai poder criar noticias e modificalas, são as pessoas com certo nivel de acesso */}
                    </Box>
                </Container>
                <Box sx={{ display: 'flex' }}>
                    <Container sx={{ display: 'flex', flexDirection: 'column', mb: '5%', fontSize: '10px', width: '60%', }} >
                        <Notice title={'ATCHINNN'} description={`Saudeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`} topic={'Saude'} data={'1 Dia'} />
                        <Notice title={'ATCHINNN'} description={`Saudeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`} topic={'Saude'} data={'1 Dia'} />
                        <Notice title={'ATCHINNN'} description={`Saudeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`} topic={'Saude'} data={'1 Dia'} />
                        <Notice title={'ATCHINNN'} description={`Saudeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`} topic={'Saude'} data={'1 Dia'} />
                        <Notice title={'ATCHINNN'} description={`Saudeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`} topic={'Saude'} data={'1 Dia'} />
                        <Notice title={'ATCHINNN'} description={`Saudeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`} topic={'Saude'} data={'1 Dia'} />
                        <Notice title={'ATCHINNN'} description={`Saudeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`} topic={'Saude'} data={'1 Dia'} />
                    </Container>
                    <Box sx={{ width: '25rem', height: '40rem', display: 'flex', alignItems: 'center', position:'sticky', top:75}}>
                        <Paper elevation={8} sx={{ width: '80%', height: '90%', borderRadius: '15px', p: '1rem'}}>
                            <Typography sx={{ m: '5% 0 5% 5%', fontWeight: 'bold' }}>Mais Lidas</Typography>
                            <Divider />
                            <Stack sx={{ width: '100%', height: '90%', pt:'1rem'}} gap={2}>

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor:'pointer'}}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>1</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor:'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>2</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da segunda noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor:'pointer'}}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>3</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da terceira noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor:'pointer'}}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>4</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da quarta noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor:'pointer'}}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>5</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da  noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                            </Stack>
                        </Paper>
                    </Box>
                </Box>


            </Box>
        </AppLayout>
    )
}
