import { Alert, Box, Button, FormControl, Snackbar, TextField, Typography } from '@mui/material'
import { type ReactElement, useState } from 'react'
import { LoadingBackdrop } from '$layout'
import { Auth } from '$components'
import loginDecoration from '$assets/svg/Auth/LoginDecoration.svg'
import { login } from '$features/auth/auth-slicer'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '$store'
import { useNavigate } from 'react-router-dom'
import { GET_TYPE, HTTP_STATUS } from '$constants'

function LoginForm(): ReactElement {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Este campo é obrigatório'),
        password: Yup.string().required('Este campo é obrigatório')
    })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [ openLoading, setOpenLoading ] = useState(false)
    const [ snackbarOpen, setSnackbarOpen ] = useState(false)

    const handleOpenLoading = (): void => { setOpenLoading(true) }
    const handleCloseLoading = (): void => { setOpenLoading(false) }

    const handleSnackbarOpen = (): void => { setSnackbarOpen(true) }
    const handleSnackbarClose = (): void => { setSnackbarOpen(false) }

    const handleSubmit = async (user: { email: string, password: string }): Promise<void> => {
        handleOpenLoading()
        
        try {
            const status = await dispatch(login(user)).then(res => GET_TYPE(res.type))
            
            if (status === HTTP_STATUS.FULFILLED) {
                navigate('/app')
            } else if (status === HTTP_STATUS.REJECTED) {
                handleCloseLoading()
                handleSnackbarOpen()
            }
            
        } catch (error) {
            setTimeout((err: any) => {
                handleCloseLoading()
                console.log(err)    
            }, 2000)
        }

        console.log(user)
    }

    return (
        <>
            <Box width='85.3%' p={2.5}>
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
                                    <Field as={TextField} name='email' label='Nome de usuário ou email' required fullWidth />
                                    {errors.email && touched.email && (
                                        <p style={{ color: 'red' }}>{errors.email}</p>
                                    )}
                                </Box>
                                <Box gap={2.5}>
                                    <Field as={TextField} name='password' fullWidth label='Senha' required type='password' />
                                    {errors.password && touched.password && (
                                        <p style={{ color: 'red' }}>{errors.password}</p>
                                    )}
                                </Box>
                                <Box display='flex' justifyContent='space-between' mt={2} alignItems='center'>
                                    <Button type='submit' variant='contained'>Entrar</Button>
                                </Box>
                            </FormControl>
                        </Form>
                    )}
                </Formik>
            </Box>
            <LoadingBackdrop
                handleClose={handleCloseLoading}
                open={openLoading}
            />
            <Snackbar 
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
            >
                <Alert onClose={handleSnackbarClose} severity='error'>
                    Usuário e/ou senha incorreta(os)!
                </Alert>
            </Snackbar>
        </>
    )
}

function LoginSide(): ReactElement {
    return (
        <Box width='100%'>
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                <Typography textAlign='center' variant='h3' color='primary.main' fontWeight={900}>Já tem uma conta?</Typography>
                <Typography mb={5} textAlign='center' variant='h6'>Entre e continue se conectando de ponta-a-ponta.</Typography>
                <img style={{ height: '20rem', width: '30rem' }} src={loginDecoration} />
            </Box>
        </Box>
    )
}

export default function Login(): ReactElement {
    return (
        <Auth formTitle='Log in' form={<LoginForm />} side={<LoginSide />} />
    )
}