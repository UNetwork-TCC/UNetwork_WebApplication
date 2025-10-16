'use client';

import { Box, Button, Divider, Link, Modal, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FilterAndConfig, News } from '@/components'
import { type ReactElement, useEffect, useState } from 'react'
import { type news } from '@/types'
import { NewsSkeleton } from '@/layout/skeletons'
import { useCreateNewsMutation, useFetchNewsMutation } from '@/features/news'
import { Alert } from '@mui/material'
import { useAppSelector } from '@/store'

export default function NewsPage(): ReactElement {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))

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
            const result = await fetchNews(null)
            console.log('News fetched:', result)
        })()

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                handleClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [ fetchNews ])

    useEffect(() => {
        if (newsData) {
            console.log('News data updated:', newsData)
        }
    }, [newsData])

    return (
        <>
            <Box display="flex" justifyContent="center" width="100%" gap={{ md: 2, lg: 3, xl: 4 }}>
                <Box
                    width={matches ? '100%' : undefined}
                    height="100%"
                    display="flex"
                    justifyContent="start"
                    alignItems="center"
                    flexDirection="column"
                    sx={{
                        flex: { md: '1 1 60%', lg: '1 1 50%', xl: '1 1 50%' },
                        maxWidth: { md: '700px', lg: '700px', xl: '900px' },
                        px: { xs: 2, md: 3, lg: 3.5, xl: 4 },
                        py: { xs: 2, md: 3, lg: 3.5, xl: 4 },
                        mx: { xs: 0, md: 2, lg: 3, xl: 4 }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            justifyContent: 'space-between',
                            width: '100%',
                            mb: { xs: 2, md: 3, lg: 3.5, xl: 4 },
                            gap: { xs: 2, sm: 0 }
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '1.5rem', md: '1.875rem', lg: '2rem', xl: '2.125rem' },
                                color: 'primary.main',
                                fontWeight: 700
                            }}
                        >
                            Notícias
                        </Typography>
                        {user.admin && (
                            <FilterAndConfig text={'CRIAR NOTÍCIAS'} handleOpen={handleOpen} />
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: 3, md: 4, lg: 5 },
                            flexDirection: 'column',
                            width: '100%'
                        }}
                    >
                        {isLoading ? (
                            <>
                                <NewsSkeleton />
                                <NewsSkeleton />
                                <NewsSkeleton />
                            </>
                        ) : Array.isArray(newsData) && newsData.length > 0 ? newsData.map(item => (
                            <News
                                key={item._id}
                                title={item.title || item.name}
                                description={item.description}
                                date={item.postedAt}
                                topic={item.topic || 'Saúde'}
                            />
                        )) : (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                minHeight="20rem"
                            >
                                <Typography variant="h6" color="text.secondary">
                                    Nenhuma notícia disponível no momento.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
                {!matches && (
                    <Box
                        sx={{
                            flex: { md: '0 0 280px', lg: '0 0 320px', xl: '0 0 360px' },
                            maxWidth: { md: '280px', lg: '320px', xl: '360px' },
                            mr: { md: 2, lg: 3, xl: 4 }
                        }}
                        display="flex"
                        justifyContent="center"
                        alignItems="flex-start"
                        pt={{ md: 3, lg: 3.5, xl: 4 }}
                    >
                        <Paper
                            elevation={8}
                            sx={{
                                width: '100%',
                                borderRadius: '15px',
                                p: { lg: 2.5, xl: 3 },
                                position: 'sticky',
                                top: { lg: '1.5rem', xl: '2rem' },
                                maxHeight: { lg: '600px', xl: '700px' },
                                overflow: 'auto'
                            }}
                        >
                            <Typography sx={{ m: '5% 0 5% 5%', fontWeight: 'bold' }}>Mais Lidas</Typography>
                            <Divider />
                            <Stack sx={{ width: '100%', height: '90%', pt: '1rem', [theme.breakpoints.only('md')]: { gap: 1, pt: 1 } }} gap={2}>
                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>1</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.only('md')]: { fontSize:'1.1rem' } }} >Titulo da noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>2</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.only('md')]: { fontSize:'1.1rem' } }} >Titulo da segunda noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>3</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.only('md')]: { fontSize:'1.1rem' } }} >Titulo da terceira noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>4</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.only('md')]: { fontSize:'1.1rem' } }} >Titulo da quarta noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                                <Link sx={{ color: 'black', display: 'flex', width: '100%', height: '15%', alignItems: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h5' sx={{ mr: '5%', color: 'gray' }}>5</Typography>
                                    <Typography variant='h6' sx={{ [theme.breakpoints.only('md')]: { fontSize:'1.1rem' } }} >Titulo da  noticia mais curtida</Typography>
                                </Link>
                                <Divider />

                            </Stack>
                        </Paper>
                    </Box>
                )}
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disableAutoFocus
            >
                <Box
                    p={{ xs: 1, sm: 1.5, md: 2 }}
                    sx={{
                        height: { xs: 'auto', sm: '28rem', md: matches ? '25rem' : '40%' },
                        width: { xs: '90%', sm: '70%', md: '40%' },
                        maxHeight: '90vh',
                        overflow: 'auto',
                        bgcolor: 'background.paper',
                        [theme.breakpoints.only('md')]: { height:'28rem' }
                    }}
                    borderRadius={2}
                >
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
                            <Button onClick={createNews} variant='outlined' fullWidth>
                                Criar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
