'use client'

import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Alert,
  Snackbar,
  Badge
} from '@mui/material'
import { type ReactElement, useEffect, useState } from 'react'
import { type news } from '@/types'
import { NewsSkeleton } from '@/layout/skeletons'
import { useCreateNewsMutation, useFetchNewsMutation } from '@/features/news'
import { useAppSelector } from '@/store'
import {
  Search,
  Add,
  TrendingUp,
  Close,
  Article
} from '@mui/icons-material'
import NewsArticleCard from '@/components/News/NewsArticleCard'

const categories = ['Todos', 'Tecnologia', 'Carreira', 'Design', 'Mercado', 'Saúde', 'Escola', 'Eventos']

const mostReadNews = [
  { id: '1', title: '10 linguagens de programação mais usadas em 2024' },
  { id: '2', title: 'Como conseguir seu primeiro emprego em TI' },
  { id: '3', title: 'Inteligência Artificial: o que esperar do futuro' },
  { id: '4', title: 'Dicas para melhorar sua produtividade' },
  { id: '5', title: 'O impacto da tecnologia na educação' }
]

export default function NewsPage(): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const [fetchNews, { data: newsData, isLoading }] = useFetchNewsMutation()
  const [postNews, { isLoading: isCreating }] = useCreateNewsMutation()

  const user = useAppSelector(state => state.auth.user)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })
  const [newsForm, setNewsForm] = useState<news>({
    title: '',
    description: '',
    visibility: 'public',
    topic: 'Outro',
    image: '',
    file: ''
  })
  const [formErrors, setFormErrors] = useState({ title: false, description: false })

  useEffect(() => {
    fetchNews(null)
  }, [fetchNews])

  const handleCreateNews = async (): Promise<void> => {
    const errors = {
      title: !newsForm.title.trim(),
      description: !newsForm.description.trim()
    }
    setFormErrors(errors)

    if (errors.title || errors.description) return

    try {
      await postNews(newsForm)
      setDialogOpen(false)
      setNewsForm({
        title: '',
        description: '',
        visibility: 'public',
        topic: 'Outro',
        image: '',
        file: ''
      })
      setSnackbar({ open: true, message: 'Notícia criada com sucesso!', severity: 'success' })
      fetchNews(null)
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao criar notícia', severity: 'error' })
    }
  }

  const handleShare = async (title: string, description: string): Promise<void> => {
    const shareText = `📰 ${title}\n\n${description}\n\n🔗 UNetwork News`

    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText })
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await navigator.clipboard.writeText(shareText)
          setSnackbar({ open: true, message: 'Conteúdo copiado!', severity: 'success' })
        }
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      setSnackbar({ open: true, message: 'Conteúdo copiado!', severity: 'success' })
    }
  }

  // Filter news based on search and category
  const filteredNews = Array.isArray(newsData)
    ? newsData.filter((article: any) => {
        const matchesSearch =
          article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory =
          selectedCategory === 'Todos' || article.topic === selectedCategory
        return matchesSearch && matchesCategory
      })
    : []

  const featuredNews = filteredNews[0]
  const otherNews = filteredNews.slice(1)

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          p: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%)'
        }}
      >
        <Box maxWidth="1200px" mx="auto">
          {/* Header */}
          <Box mb={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 50%, #e91e63 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Notícias
            </Typography>
            <Typography color="text.secondary">
              Fique por dentro das últimas novidades
            </Typography>
          </Box>

          {/* Search and Filters */}
          <Box mb={4}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={2}
              mb={3}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <TextField
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar notícias..."
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  maxWidth: { xs: '100%', sm: 400 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    '& fieldset': {
                      borderColor: 'rgba(103, 58, 183, 0.1)'
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(103, 58, 183, 0.3)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main'
                    }
                  }
                }}
              />

              {user?.admin && (
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setDialogOpen(true)}
                  sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
                    boxShadow: '0 4px 15px rgba(103, 58, 183, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5e35b1 0%, #8e24aa 100%)',
                      boxShadow: '0 6px 20px rgba(103, 58, 183, 0.4)'
                    }
                  }}
                >
                  Criar Notícia
                </Button>
              )}
            </Box>

            {/* Category filters */}
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              sx={{
                overflowX: { xs: 'auto', sm: 'visible' },
                pb: { xs: 1, sm: 0 },
                '&::-webkit-scrollbar': { display: 'none' }
              }}
            >
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    borderRadius: 5,
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                    ...(selectedCategory === category
                      ? {
                          bgcolor: 'primary.main',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(103, 58, 183, 0.3)',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }
                      : {
                          bgcolor: 'rgba(255,255,255,0.8)',
                          border: '1px solid rgba(103, 58, 183, 0.1)',
                          '&:hover': {
                            bgcolor: 'rgba(103, 58, 183, 0.08)'
                          }
                        })
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Main Content */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }}
            gap={4}
          >
            {/* News Articles */}
            <Box>
              {isLoading ? (
                <Box display="flex" flexDirection="column" gap={3}>
                  <NewsSkeleton />
                  <NewsSkeleton />
                  <NewsSkeleton />
                </Box>
              ) : filteredNews.length > 0 ? (
                <Box display="flex" flexDirection="column" gap={3}>
                  {/* Featured Article */}
                  {featuredNews && (
                    <NewsArticleCard
                      title={featuredNews.title || featuredNews.name}
                      description={featuredNews.description}
                      category={featuredNews.topic || 'Geral'}
                      image={featuredNews.image}
                      date={featuredNews.postedAt}
                      views={featuredNews.views}
                      readTime={featuredNews.readTime || '5 min'}
                      featured
                      onShare={() => handleShare(featuredNews.title, featuredNews.description)}
                    />
                  )}

                  {/* Other Articles */}
                  {otherNews.map((article: any, index: number) => (
                    <Box
                      key={article._id || index}
                      sx={{
                        animation: 'fadeInUp 0.5s ease forwards',
                        animationDelay: `${index * 100}ms`,
                        opacity: 0,
                        '@keyframes fadeInUp': {
                          from: {
                            opacity: 0,
                            transform: 'translateY(20px)'
                          },
                          to: {
                            opacity: 1,
                            transform: 'translateY(0)'
                          }
                        }
                      }}
                    >
                      <NewsArticleCard
                        title={article.title || article.name}
                        description={article.description}
                        category={article.topic || 'Geral'}
                        image={article.image}
                        date={article.postedAt}
                        views={article.views}
                        readTime={article.readTime || '5 min'}
                        onShare={() => handleShare(article.title, article.description)}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 3,
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'rgba(103, 58, 183, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <Article sx={{ fontSize: 40, color: 'primary.main', opacity: 0.6 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={0.5}>
                    {searchQuery || selectedCategory !== 'Todos'
                      ? 'Nenhuma notícia encontrada'
                      : 'Nenhuma notícia disponível'}
                  </Typography>
                  <Typography color="text.secondary">
                    {searchQuery || selectedCategory !== 'Todos'
                      ? 'Tente ajustar seus filtros'
                      : 'Volte em breve para novidades!'}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Sidebar */}
            {!isMobile && (
              <Box
                sx={{
                  position: 'sticky',
                  top: 16,
                  alignSelf: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >
                {/* Most Read */}
                <Box
                  sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(103, 58, 183, 0.1)',
                    p: 3
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={3}>
                    <TrendingUp sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight={600}>
                      Mais Lidas
                    </Typography>
                  </Box>

                  <Box display="flex" flexDirection="column" gap={1}>
                    {mostReadNews.map((item, index) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                          p: 1.5,
                          borderRadius: 2,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'rgba(103, 58, 183, 0.05)',
                            '& .news-title': {
                              color: 'primary.main'
                            }
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            flexShrink: 0,
                            ...(index === 0
                              ? { background: 'linear-gradient(135deg, #ffd700 0%, #ff9800 100%)', color: 'white' }
                              : index === 1
                                ? { background: 'linear-gradient(135deg, #9e9e9e 0%, #757575 100%)', color: 'white' }
                                : index === 2
                                  ? { background: 'linear-gradient(135deg, #cd7f32 0%, #8b4513 100%)', color: 'white' }
                                  : { bgcolor: 'grey.200', color: 'text.secondary' })
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography
                          className="news-title"
                          sx={{
                            fontSize: '0.875rem',
                            lineHeight: 1.4,
                            transition: 'color 0.2s ease',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Categories Summary */}
                <Box
                  sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(103, 58, 183, 0.1)',
                    p: 3
                  }}
                >
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Categorias
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={0.5}>
                    {categories.slice(1).map((category) => {
                      const count = Array.isArray(newsData)
                        ? newsData.filter((n: any) => n.topic === category).length
                        : 0

                      return (
                        <Box
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1.5,
                            borderRadius: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: 'rgba(103, 58, 183, 0.05)',
                              '& .cat-name': {
                                color: 'primary.main'
                              }
                            }
                          }}
                        >
                          <Typography
                            className="cat-name"
                            sx={{
                              fontSize: '0.9rem',
                              transition: 'color 0.2s ease'
                            }}
                          >
                            {category}
                          </Typography>
                          <Chip
                            label={count}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: '0.75rem',
                              bgcolor: 'grey.100'
                            }}
                          />
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Create News Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(245,247,250,0.98) 100%)',
            overflow: 'hidden'
          }
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
            px: 3,
            py: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Article sx={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>
                Criar Notícia
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
                Compartilhe informações importantes
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setDialogOpen(false)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Título"
              value={newsForm.title}
              onChange={(e) => {
                setNewsForm({ ...newsForm, title: e.target.value })
                setFormErrors(prev => ({ ...prev, title: false }))
              }}
              placeholder="Digite o título da notícia"
              fullWidth
              required
              error={formErrors.title}
              helperText={formErrors.title ? 'Campo obrigatório' : ''}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.5,
                  bgcolor: 'rgba(103, 58, 183, 0.02)'
                }
              }}
            />

            <TextField
              label="Descrição"
              value={newsForm.description}
              onChange={(e) => {
                setNewsForm({ ...newsForm, description: e.target.value })
                setFormErrors(prev => ({ ...prev, description: false }))
              }}
              placeholder="Descreva a notícia em detalhes..."
              fullWidth
              required
              multiline
              rows={4}
              error={formErrors.description}
              helperText={formErrors.description ? 'Campo obrigatório' : ''}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.5,
                  bgcolor: 'rgba(103, 58, 183, 0.02)'
                }
              }}
            />
          </Box>
        </DialogContent>

        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Button
            onClick={() => setDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2.5, textTransform: 'none', px: 3 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateNews}
            variant="contained"
            disabled={isCreating}
            sx={{
              borderRadius: 2.5,
              textTransform: 'none',
              px: 4,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5e35b1 0%, #8e24aa 100%)'
              }
            }}
          >
            Criar Notícia
          </Button>
        </Box>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
