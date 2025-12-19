'use client'

import {
  Box,
  Button,
  Divider,
  Link,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
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

  const [fetchNews, { data: newsData, isLoading }] = useFetchNewsMutation()
  const [postNews] = useCreateNewsMutation()

  const user = useAppSelector(state => state.auth.user)

  const [alertDisplay, setAlertDisplay] = useState<string>('none')
  const [open, setOpen] = useState(false)
  const [NewsAttributes, setNewsAttributes] = useState<news>({
    title: '',
    description: '',
    visibility: 'public',
    topic: 'Outro',
    image: '',
    file: ''
  })

  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }

  const createNews = (): void => {
    ;(async () => {
      if (NewsAttributes.title) {
        await postNews(NewsAttributes)
        handleClose()
      } else setAlertDisplay('flex')
    })()
  }

  useEffect(() => {
    fetchNews(null).then(result => {
      console.log('News fetched:', result)
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (newsData) {
      console.log('News data updated:', newsData)
    }
  }, [newsData])

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        gap={{ md: 2, lg: 3, xl: 4 }}
      >
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
                fontSize: {
                  xs: '1.5rem',
                  md: '1.875rem',
                  lg: '2rem',
                  xl: '2.125rem'
                },
                color: 'primary.main',
                fontWeight: 700
              }}
            >
              Notícias
            </Typography>
            {user.admin && (
              <FilterAndConfig
                text={'CRIAR NOTÍCIAS'}
                handleOpen={handleOpen}
              />
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
            ) : Array.isArray(newsData) && newsData.length > 0 ? (
              newsData.map(item => (
                <News
                  key={item._id}
                  title={item.title || item.name}
                  description={item.description}
                  date={item.postedAt}
                  topic={item.topic || 'Saúde'}
                />
              ))
            ) : (
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
              elevation={4}
              sx={{
                width: '100%',
                borderRadius: 3,
                p: { md: 2, lg: 2.5, xl: 3 },
                position: 'sticky',
                top: { md: '1rem', lg: '1.5rem', xl: '2rem' }
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { md: '1rem', lg: '1.1rem' }
                }}
              >
                Mais Lidas
              </Typography>
              <Divider />
              <Stack sx={{ pt: 2 }} gap={1.5}>
                {[1, 2, 3, 4, 5].map(num => (
                  <Box key={num}>
                    <Link
                      sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        cursor: 'pointer',
                        py: 0.5,
                        ':hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mr: 2,
                          color: 'text.secondary',
                          minWidth: '24px',
                          fontSize: { md: '1.1rem', lg: '1.25rem' }
                        }}
                      >
                        {num}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { md: '0.9rem', lg: '1rem' },
                          lineHeight: 1.4
                        }}
                      >
                        {num === 2
                          ? 'Titulo da segunda noticia mais curtida'
                          : num === 3
                            ? 'Titulo da terceira noticia mais curtida'
                            : num === 4
                              ? 'Titulo da quarta noticia mais curtida'
                              : 'Titulo da noticia mais curtida'}
                      </Typography>
                    </Link>
                    {num < 5 && <Divider sx={{ mt: 1.5 }} />}
                  </Box>
                ))}
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
            [theme.breakpoints.only('md')]: { height: '28rem' }
          }}
          borderRadius={2}
        >
          <Box p={0}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              m={'1rem'}
            >
              Criar Notícia
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
            <TextField
              onChange={e => {
                setNewsAttributes({ ...NewsAttributes, title: e.target.value })
              }}
              id="outline-basic"
              label="Título"
              value={NewsAttributes.title}
              fullWidth
            />
            <Divider sx={{ m: '1rem 0' }} />
            <TextField
              onChange={e => {
                setNewsAttributes({
                  ...NewsAttributes,
                  description: e.target.value
                })
              }}
              id="outline-basic"
              label="Descrição"
              value={NewsAttributes.description}
              fullWidth
            />
            <Alert sx={{ display: alertDisplay }} severity="error">
              Preencha todos os campos!
            </Alert>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={3}
              marginTop={'3rem'}
            >
              <Button onClick={handleClose} variant="outlined" fullWidth>
                Cancelar
              </Button>
              <Button onClick={createNews} variant="outlined" fullWidth>
                Criar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
