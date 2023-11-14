import { Box, Button, Container, Divider, Link, Modal, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

import { AppLayout } from '$layout'
import { FilterAndConfig, News } from '$components'
import { type ReactElement, useEffect, useState } from 'react'
import { fetchNews } from '$features/news'
import { type news } from '$types'
import { useFetchDispatch } from '$hooks'
import { HTTP_STATUS } from '$constants'
import { useAppSelector } from '$store'

export default function NewsPage(): ReactElement {
    const theme = useTheme()
    const status = useFetchDispatch(fetchNews())
    const matches = useMediaQuery(theme.breakpoints.up('md'))
    const newsArr = useAppSelector(state => state.news.news)

    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ open, setOpen ] = useState(false)
    const [ news, setNews ] = useState<news[]>([])
    const [ NewsAttributes, setNewsAttributes ] = useState<news>({
        title: '',
        description: '',
        visibility: 'public',
        code: '',
        setPassword: '',
        getPassword: ''
    })

    // const [ checkedButtons, setCheckedButtons ] = useState({
    //     public: true,
    //     private: false
    // })

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const createNews = (): void => {
        // ...

        if (NewsAttributes.title) {
            setNews([
                ...news,
                NewsAttributes
            ])
            handleClose()
        }
        else alert('preencha todos os campos!')
    }

    useEffect(() => {
        (async () => {
            if (await status === HTTP_STATUS.FULFILLED) {
                setIsLoading(false)
            }
        })()

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const code: string = e.code

            if (Number(code) === 27) {
                handleClose()
            }
        })
    }, [ status ])

    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} width='100%' height='100%' fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', mb: '2%' }}>
                    <Typography sx={{ fontSize: '2.5em', color: '#673AB7', fontWeight: 'bold' }}>Notícias</Typography>
                    <FilterAndConfig text={'CRIAR NOTICIAS'} handleOpen={handleOpen} />
                </Container>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: 5, flexDirection: 'column', mb: '5%', fontSize: '10px', width: '60%' }} >
                        {isLoading ? (
                            <Typography sx={{ width: '100%', height: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Carregando...</Typography>
                        ) : newsArr.map(item => (
                            <News 
                                key={item._id}
                                title={item.name}
                                description={item.description}
                                date={item.postedAt}
                                topic='Saúde'
                            />
                        ))}
                    </Box>
                    <Box sx={{ width: '25rem', height: '40rem', display: 'flex', alignItems: 'center', position: 'sticky', top: 75 }}>
                        <Paper elevation={8} sx={{ width: '80%', height: '90%', borderRadius: '15px', p: '1rem' }}>
                            <Typography sx={{ m: '5% 0 5% 5%', fontWeight: 'bold' }}>Mais Lidas</Typography>
                            <Divider />
                            <Stack sx={{ width: '100%', height: '90%', pt: '1rem' }} gap={2}>
                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>1</Typography>
                                    <Typography variant='h6'>Titulo da noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>2</Typography>
                                    <Typography variant='h6'>Titulo da segunda noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>3</Typography>
                                    <Typography variant='h6'>Titulo da terceira noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>4</Typography>
                                    <Typography variant='h6'>Titulo da quarta noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>5</Typography>
                                    <Typography variant='h6'>Titulo da  noticia mais curtida</Typography>
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
                <Box p={1} sx={{ height: matches ? '45  vh' : '40vh', width: '35vw', bgcolor: 'background.paper' }} borderRadius={2} >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            Criar Notícia
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
                        <TextField
                            onChange={e => { setNewsAttributes({ ...NewsAttributes, title: e.target.value }) }}
                            id="outline-basic"
                            label="Título"
                            value={NewsAttributes.title}
                            fullWidth
                        />
                        <Divider sx={{ m: '1rem 0' }} />
                        <TextField
                            onChange={e => { setNewsAttributes({ ...NewsAttributes, description: e.target.value }) }}
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
