'use client'

import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  LinearProgress,
  Collapse
} from '@mui/material'
import { Visibility, VisibilityOff, Lock, Warning } from '@mui/icons-material'
import { type ReactElement, useState, useEffect, useCallback } from 'react'
import { LoadingBackdrop } from '@/layout'
import { Auth } from '@/components'
import { Field, Form, Formik } from 'formik'
import { useAppDispatch } from '@/store'
import { setCredentials, useLoginMutation } from '@/features/auth'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'

const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 30000 // 30 seconds

function LoginForm(): ReactElement {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Este campo é obrigatório'),
    password: Yup.string().required('Este campo é obrigatório')
  })

  const [login, { data, isSuccess: isLoginSuccess, isError: isLoginError }] =
    useLoginMutation()

  const dispatch = useAppDispatch()
  const router = useRouter()

  const [openLoading, setOpenLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Rate limiting states
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState(0)

  const handleTogglePassword = (): void => {
    setShowPassword(prev => !prev)
  }

  const handleOpenLoading = (): void => {
    setOpenLoading(true)
  }
  const handleCloseLoading = (): void => {
    setOpenLoading(false)
  }

  const handleSnackbarOpen = (): void => {
    setSnackbarOpen(true)
  }
  const handleSnackbarClose = (): void => {
    setSnackbarOpen(false)
  }

  // Lockout timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLocked && lockoutTimeRemaining > 0) {
      interval = setInterval(() => {
        setLockoutTimeRemaining(prev => {
          if (prev <= 1000) {
            setIsLocked(false)
            setLoginAttempts(0)
            return 0
          }
          return prev - 1000
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isLocked, lockoutTimeRemaining])

  useEffect(() => {
    ;(async () => {
      if (isLoginSuccess && data) {
        console.log('[Login] Login success! Data:', data)
        setLoginAttempts(0) // Reset attempts on success
        // A API retorna { message, data: { user, token }, status }
        const responseData = (data as any).data || data
        const user = responseData.user
        const token = responseData.token
        console.log('[Login] Dispatching setCredentials with:', { user, accessToken: token })
        dispatch(setCredentials({ user, accessToken: token }))

        // Aguarda um pouco para o redux-persist salvar no localStorage
        await new Promise(resolve => setTimeout(resolve, 200))

        console.log('[Login] Navegando para /app...')
        router.push('/app')
      } else if (isLoginError) {
        handleCloseLoading()
        handleSnackbarOpen()

        // Increment login attempts
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)

        // Check if should lock
        if (newAttempts >= MAX_ATTEMPTS) {
          setIsLocked(true)
          setLockoutTimeRemaining(LOCKOUT_DURATION)
        }
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginSuccess, isLoginError, dispatch, router, data])

  const handleSubmit = async (user: {
    email: string
    password: string
  }): Promise<void> => {
    if (isLocked) return

    handleOpenLoading()

    try {
      await login({
        email: user.email.toLowerCase(),
        password: user.password
      })
    } catch (error) {
      console.log(error)
      router.push('/app/error')
    }
  }

  const attemptsRemaining = MAX_ATTEMPTS - loginAttempts

  return (
    <>
      <Box
        width={{ xs: '95%', sm: '90%', md: '85.3%' }}
        p={{ xs: 1.5, sm: 2, md: 2.5 }}
      >
        {/* Rate Limiting Warning */}
        <Collapse in={isLocked}>
          <Alert
            severity="error"
            icon={<Lock />}
            sx={{
              mb: 2,
              borderRadius: 2,
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Conta temporariamente bloqueada
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Muitas tentativas de login. Tente novamente em{' '}
                <strong>{Math.ceil(lockoutTimeRemaining / 1000)}s</strong>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(lockoutTimeRemaining / LOCKOUT_DURATION) * 100}
                sx={{ mt: 1, borderRadius: 1, height: 6 }}
                color="error"
              />
            </Box>
          </Alert>
        </Collapse>

        {/* Attempts Warning */}
        <Collapse in={loginAttempts > 0 && loginAttempts < MAX_ATTEMPTS && !isLocked}>
          <Alert
            severity="warning"
            icon={<Warning />}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            <Typography variant="body2">
              {attemptsRemaining === 1
                ? 'Ultima tentativa antes do bloqueio temporario!'
                : `${attemptsRemaining} tentativas restantes`}
            </Typography>
          </Alert>
        </Collapse>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          style={{ width: '100%' }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl sx={{ display: 'flex', gap: 2.5 }}>
                <Box>
                  <Field
                    as={TextField}
                    name="email"
                    label="Nome de usuario ou email"
                    required
                    fullWidth
                    disabled={isLocked}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  {errors.email && touched.email && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                      {errors.email}
                    </Typography>
                  )}
                </Box>
                <Box gap={2.5}>
                  <Field
                    as={TextField}
                    name="password"
                    fullWidth
                    label="Senha"
                    required
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLocked}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            edge="end"
                            disabled={isLocked}
                            sx={{
                              color: 'text.secondary',
                              '&:hover': {
                                color: 'primary.main'
                              }
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  {errors.password && touched.password && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                      {errors.password}
                    </Typography>
                  )}
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={2}
                  alignItems="center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLocked}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 4,
                      py: 1.2,
                      background: isLocked
                        ? undefined
                        : 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5e35b1 0%, #8e24aa 100%)'
                      }
                    }}
                  >
                    {isLocked ? 'Bloqueado' : 'Entrar'}
                  </Button>
                </Box>
              </FormControl>
            </Form>
          )}
        </Formik>
      </Box>
      <LoadingBackdrop
        // handleClose={handleCloseLoading}
        open={openLoading}
      />
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          Usuário e/ou senha incorreta(os)!
        </Alert>
      </Snackbar>
    </>
  )
}

function LoginSide(): ReactElement {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography
          textAlign="center"
          variant="h3"
          color="primary.main"
          fontWeight={900}
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
          }}
        >
          Já tem uma conta?
        </Typography>
        <Typography
          mb={5}
          textAlign="center"
          variant="h6"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.25rem' }
          }}
        >
          Entre e continue se conectando de ponta-a-ponta.
        </Typography>
        <img
          style={{
            height: matches ? '15rem' : '20rem',
            width: matches ? '20rem' : '30rem',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
          src="/assets/svg/Auth/LoginDecoration.svg"
          alt="Login decoration"
        />
      </Box>
    </Box>
  )
}

export default function Login(): ReactElement {
  return <Auth formTitle="Log in" form={<LoginForm />} side={<LoginSide />} />
}
