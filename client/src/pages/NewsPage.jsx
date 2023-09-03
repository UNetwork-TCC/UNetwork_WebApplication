import { Box, Button, Container, Divider, FormControl, Link, Modal, Paper, Stack, TextField, Typography, useMediaQuery } from '@mui/material'

import AppLayout from '../layout/AppLayout'
import { useTheme } from '@emotion/react'
import { BuildOutlined, FilterList } from '@mui/icons-material'
import { LittleNotice, BigNotice, Notice } from '../components'
import CustomCheckBox from '../layout/CustomCheckBox'
import { useEffect, useState } from 'react'

export default function NewsPage() {
    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [open, setOpen] = useState(false)

    const [NewsAttributes, setNewsAttributes] = useState({
        title: '',
        description: ''
    })

    const [checkedButtons, setCheckedButtons] = useState({
        public: true,
        private: false
    })

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const createNews = () => {
        // ...

        console.log(NewsAttributes)

        if (NewsAttributes.description && NewsAttributes.title)
            handleClose()
    }

    useEffect(() => {
        document.addEventListener('keydown', e => {
            if (e.code == 27) {
                handleClose()
            }
        })
    }, [])

    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} width='100%' height='100%' fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', mb: '2%' }}>
                    <Typography sx={{ fontSize: '2.5em', color: '#673AB7', fontWeight: 'bold' }}>Notícias</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <FilterList sx={{ cursor: 'pointer', fontSize: '2em', ':hover': { color: 'text.secondary' } }} />
                        {/* Qualquer um pode filtrar */}
                        <BuildOutlined sx={{ ml: '1.5em', fontSize: '2em', transform: 'scaleX(-1)', ':hover': { color: 'text.secondary', cursor: 'pointer' } }} />
                        <Box sx={{ height: '75%', bgcolor: '#673AB7', fontSize: '1rem', borderRadius: '3.1vh', color: 'white', padding: '0.3em 1em', ml: '2em', ':hover': { cursor: 'pointer', bgcolor: '#673AB7', opacity: '0.85' } }} onClick={handleOpen}>CRIAR NOTÍCIAS</Box>
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
                    <Box sx={{ width: '25rem', height: '40rem', display: 'flex', alignItems: 'center', position: 'sticky', top: 75 }}>
                        <Paper elevation={8} sx={{ width: '80%', height: '90%', borderRadius: '15px', p: '1rem' }}>
                            <Typography sx={{ m: '5% 0 5% 5%', fontWeight: 'bold' }}>Mais Lidas</Typography>
                            <Divider />
                            <Stack sx={{ width: '100%', height: '90%', pt: '1rem' }} gap={2}>

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>1</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>2</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da segunda noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>3</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da terceira noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>4</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da quarta noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>5</Typography>
                                    <Typography variant='h7' sx={{}}>Titulo da  noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                            </Stack>
                        </Paper>
                    </Box>
                </Box>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disableAutoFocus
            >
                <Box p sx={{ height: matches ? '45  vh' : '40vh', width: '35vw', bgcolor: 'background.paper' }} borderRadius={2} >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            Criar Notícia
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
                        <TextField
                            onChange={e => setNewsAttributes({ ...NewsAttributes, title: e.target.value })}
                            id="outline-basic"
                            label="Título"
                            value={NewsAttributes.title}
                            fullWidth
                        />
                        <Divider sx={{m:'1rem 0'}}/>
                        <TextField
                            onChange={e => setNewsAttributes({ ...NewsAttributes, description: e.target.value })}
                            id="outline-basic"
                            label="Descrição"
                            value={NewsAttributes.description}
                            fullWidth
                        />

                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} >
                            <Button onClick={handleClose} variant='outlined' fullWidth>
                                Cancelar
                            </Button>
                            <Button onClick={createNews} variant='outlined' fullWidth>
                                Criar
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </AppLayout>
    )
}
