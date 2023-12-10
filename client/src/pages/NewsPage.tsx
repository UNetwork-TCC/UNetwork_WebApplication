import { Box, Button, Container, Divider, Link, Modal, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { AppLayout } from '$layout'
import { FilterAndConfig, News } from '$components'
import { type ReactElement, useEffect, useState } from 'react'
import { type news } from '$types'
import { NewsSkeleton } from '$skeletons'
import { useCreateNewsMutation, useFetchNewsMutation } from '$features/news'
import { Alert } from '@mui/material'
import { useAppSelector } from '$store'

export default function NewsPage(): ReactElement {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [ fetchNews, { data: newsData, isLoading } ] = useFetchNewsMutation()
    const [ postNews ] = useCreateNewsMutation()

    const user = useAppSelector(state => state.auth.user)
    
    const [ alertDisplay, setAlertDisplay ] = useState<string>('none')
    const [ open, setOpen ] = useState(false)
    const [ news, setNews ] = useState<news[]>([])
    const [ NewsAttributes, setNewsAttributes ] = useState<news>({
        title: '',
        description: '',
        visibility: 'public',
        topic: 'Outro',
        image: '',
        file: ''
    })

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const createNews = (): void => {
        (async () => {
            if (NewsAttributes.title) {
                await postNews(NewsAttributes)
                handleClose()
            } else setAlertDisplay('flex')
        })()
    }

    useEffect(() => {
        (async () => {
            await fetchNews(null)
        })()

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const code: string = e.code

            if (Number(code) === 27) {
                handleClose()
            }
        })
    }, [ fetchNews ])

    return (
        <AppLayout>
            <Box display='flex' flexDirection='column' p={3} mt={5} width='100%' height='100%' fontSize={'1rem'} sx={{ [theme.breakpoints.down('xl')]: { mt: 3 },
                [theme.breakpoints.down('lg')]: { mt: 1 }
            }}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: '2%', [theme.breakpoints.down('lg')]: { mb:'0' } }}>
                    <Typography sx={{ fontSize: '2rem', color: '#673AB7', fontWeight: 'bold' }}>Notícias</Typography>
                    {user.admin && (
                        <FilterAndConfig text={'CRIAR NOTICIAS'} handleOpen={handleOpen} />
                    )}
                </Container>
                <Box sx={{ display: 'flex', width: '100%', justifyContent:'center' }}>
                    <Box sx={{ display: 'flex', gap: 5, flexDirection: 'column', mb: '5%', fontSize: '10px', width: '60%', justifyContent:'center', 
                        [theme.breakpoints.down('lg')]: {
                            width:'65%'
                        }
                    }} >
                        {isLoading ? (
                            <>
                                <NewsSkeleton />
                                <NewsSkeleton />
                                <NewsSkeleton />
                            </>
                        ) : newsData?.map(item => (
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
                        <Paper elevation={8} sx={{ width: '80%', height: '90%', borderRadius: '15px', p: '1rem',
                            [theme.breakpoints.down('lg')]: { ml:'10%', height:'80%', mb:'15%' }
                        }}>
                            <Typography sx={{ m: '5% 0 5% 5%', fontWeight: 'bold' }}>Mais Lidas</Typography>
                            <Divider />
                            <Stack sx={{ width: '100%', height: '90%', pt: '1rem', [theme.breakpoints.down('lg')]: { gap: 1, pt: 1 } }} gap={2}>
                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>1</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.down('lg')]: { fontSize:'1.1rem' } }} >Titulo da noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>2</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.down('lg')]: { fontSize:'1.1rem' } }} >Titulo da segunda noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>3</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.down('lg')]: { fontSize:'1.1rem' } }} >Titulo da terceira noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>4</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.down('lg')]: { fontSize:'1.1rem' } }} >Titulo da quarta noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>5</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.down('lg')]: { fontSize:'1.1rem' } }} >Titulo da  noticia mais curtida</Typography>
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
                <Box p={1} sx={{ height: matches ? '25rem' : '40%', width: '40%', bgcolor: 'background.paper', 
                    [theme.breakpoints.down('lg')]: { height:'28rem' } }} borderRadius={2} >
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
                        <Alert sx={{ display: alertDisplay }} severity='error'>Preencha todos os campos!</Alert>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} marginTop={'3rem'} >
                            <Button onClick={handleClose} variant='outlined' fullWidth>
                                Cancelar
                            </Button>
                            <Button onClick={postNews} variant='outlined' fullWidth>
                                Criar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </AppLayout>
    )
}
