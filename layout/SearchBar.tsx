'use client'
import { Search, Person, TrendingUp, History, Close, Forum, Article } from '@mui/icons-material'
import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import {
  useEffect,
  type ReactElement,
  useState,
  type ChangeEvent,
  type FormEvent,
  useMemo,
  useCallback
} from 'react'
import { useSearchMutation } from '@/features/search'
import { useNavigate } from '@/hooks'

interface SearchOption {
  type: 'user' | 'forum' | 'news' | 'recent' | 'suggestion'
  label: string
  id?: string
  avatar?: string
  description?: string
}

const defaultSuggestions: SearchOption[] = [
  { type: 'suggestion', label: 'Tecnologia', description: 'Buscar por tecnologia' },
  { type: 'suggestion', label: 'Eventos', description: 'Buscar por eventos' },
  { type: 'suggestion', label: 'Grupos', description: 'Buscar por grupos' }
]

export default function SearchBar(): ReactElement {
  const theme = useTheme()
  const [search, { data: searchResults, isLoading }] = useSearchMutation()
  const [text, setText] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<SearchOption[]>([])

  const navigate = useNavigate()

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (text && text.length >= 2) {
        search({ q: text, type: 'all', limit: 10 })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [text, search])

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch {
        setRecentSearches([])
      }
    }
  }, [])

  const saveRecentSearch = useCallback((option: SearchOption) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.label !== option.label)
      const updated = [{ ...option, type: 'recent' as const }, ...filtered].slice(0, 5)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }, [])

  const options: SearchOption[] = useMemo(() => {
    const result: SearchOption[] = []

    // Add search results if searching
    if (text && text.length >= 2 && searchResults) {
      // Add users
      if (searchResults.users?.length > 0) {
        const userOptions: SearchOption[] = searchResults.users
          .slice(0, 5)
          .map((user: any) => ({
            type: 'user' as const,
            label: user.username,
            id: user._id,
            avatar: user.avatar || user.otherInfo?.avatar?.src,
            description: user.name || `@${user.username}`
          }))
        result.push(...userOptions)
      }

      // Add forums
      if (searchResults.forums?.length > 0) {
        const forumOptions: SearchOption[] = searchResults.forums
          .slice(0, 3)
          .map((forum: any) => ({
            type: 'forum' as const,
            label: forum.title,
            id: forum._id,
            description: forum.topic || forum.description
          }))
        result.push(...forumOptions)
      }

      // Add news
      if (searchResults.news?.length > 0) {
        const newsOptions: SearchOption[] = searchResults.news
          .slice(0, 3)
          .map((news: any) => ({
            type: 'news' as const,
            label: news.name,
            id: news._id,
            description: news.description
          }))
        result.push(...newsOptions)
      }
    }

    // Add recent searches when no text
    if (!text && recentSearches.length > 0) {
      result.push(...recentSearches)
    }

    // Add suggestions when no text
    if (!text) {
      result.push(...defaultSuggestions)
    }

    return result
  }, [text, searchResults, recentSearches])

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (text) {
      saveRecentSearch({ type: 'recent', label: text, description: 'Busca recente' })
    }
  }

  const handleOptionSelect = (option: SearchOption | null) => {
    if (!option) return

    // Se for uma busca recente ou sugestão, definir o texto e disparar a busca
    if (option.type === 'recent' || option.type === 'suggestion') {
      setText(option.label)
      // A busca será disparada automaticamente pelo useEffect quando o texto mudar
      return
    }

    saveRecentSearch(option)

    if (option.type === 'user' && option.id) {
      navigate('/app/profile/' + option.id)
    } else if (option.type === 'forum' && option.id) {
      navigate('/app/forum/' + option.id)
    } else if (option.type === 'news' && option.id) {
      navigate('/app/news/' + option.id)
    }
    setText('')
  }

  const getOptionIcon = (type: SearchOption['type']) => {
    switch (type) {
      case 'user':
        return <Person sx={{ fontSize: 18, color: 'primary.main' }} />
      case 'forum':
        return <Forum sx={{ fontSize: 18, color: 'info.main' }} />
      case 'news':
        return <Article sx={{ fontSize: 18, color: 'success.main' }} />
      case 'recent':
        return <History sx={{ fontSize: 18, color: 'text.secondary' }} />
      case 'suggestion':
        return <TrendingUp sx={{ fontSize: 18, color: 'secondary.main' }} />
    }
  }

  return (
    <Box component="form" width="100%" onSubmit={handleSubmit}>
      <Autocomplete
        freeSolo
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.label
        }
        inputValue={text}
        onInputChange={(_, value) => setText(value)}
        onChange={(_, value) => {
          if (value && typeof value !== 'string') {
            handleOptionSelect(value)
          }
        }}
        loading={isLoading}
        filterOptions={(x) => x}
        groupBy={(option) => {
          if (option.type === 'user') return 'Usuarios'
          if (option.type === 'forum') return 'Forum'
          if (option.type === 'news') return 'Noticias'
          if (option.type === 'recent') return 'Buscas Recentes'
          return 'Sugestoes'
        }}
        PaperComponent={({ children, ...props }) => (
          <Paper
            {...props}
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              overflow: 'hidden',
              mt: 1,
              bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'background.paper'
            }}
          >
            {children}
            {recentSearches.length > 0 && !text && (
              <Box
                sx={{
                  p: 1,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Chip
                  label="Limpar historico"
                  size="small"
                  onClick={clearRecentSearches}
                  onDelete={clearRecentSearches}
                  deleteIcon={<Close sx={{ fontSize: 16 }} />}
                  sx={{ fontSize: '0.75rem' }}
                />
              </Box>
            )}
          </Paper>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Buscar usuarios, topicos..."
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'background.paper',
                transition: 'all 0.2s ease',
                '& fieldset': {
                  borderColor: 'transparent'
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main'
                }
              }
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary', fontSize: 22 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...otherProps } = props
          return (
          <Box
            key={key}
            component="li"
            {...otherProps}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1.5,
              px: 2,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            {option.type === 'user' ? (
              <Avatar
                src={option.avatar}
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'primary.main',
                  fontSize: '0.9rem'
                }}
              >
                {option.label?.[0]?.toUpperCase()}
              </Avatar>
            ) : (
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: option.type === 'forum' ? 'info.light'
                    : option.type === 'news' ? 'success.light'
                    : option.type === 'recent' ? (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100')
                    : 'secondary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {getOptionIcon(option.type)}
              </Box>
            )}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {option.type === 'user' ? `@${option.label}` : option.label}
              </Typography>
              {option.description && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block'
                  }}
                >
                  {option.description}
                </Typography>
              )}
            </Box>
            {(option.type === 'user' || option.type === 'forum' || option.type === 'news') && (
              <Chip
                label={option.type === 'user' ? 'Usuario' : option.type === 'forum' ? 'Forum' : 'Noticia'}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  bgcolor: option.type === 'user' ? 'primary.light'
                    : option.type === 'forum' ? 'info.light'
                    : 'success.light',
                  color: option.type === 'user' ? 'primary.dark'
                    : option.type === 'forum' ? 'info.dark'
                    : 'success.dark'
                }}
              />
            )}
          </Box>
        )}}
        renderGroup={(params) => (
          <Box key={params.key}>
            <Typography
              variant="caption"
              sx={{
                px: 2,
                py: 1,
                display: 'block',
                fontWeight: 700,
                color: 'text.secondary',
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}
            >
              {params.group}
            </Typography>
            {params.children}
          </Box>
        )}
        fullWidth
      />
    </Box>
  )
}
