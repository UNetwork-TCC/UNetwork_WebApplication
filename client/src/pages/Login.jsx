import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { LoadingBackdrop } from '../layout'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../components'
import loginDecoration from '../assets/svg/Auth/LoginDecoration.svg'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/auth-slicer'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

function LoginForm() {
    const validationSchema = Yup.object().shape({
        usernameOrEmail: Yup.string().required('Este campo é obrigatório'),
        password: Yup.string().required('Este campo é obrigatório')
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ openLoading, setOpenLoading ] = useState(false)

    const handleOpenLoading = () => setOpenLoading(true)
    const handleCloseLoading = () => setOpenLoading(false)

    const handleSubmit = async (user) => {
        handleOpenLoading()
        // localStorage.setItem('user', 1)

        try {
            dispatch(login())
            
            setTimeout(() => {
                navigate('/app')
            }, 2000)
        } catch (error) {
            setTimeout(() => {
                handleCloseLoading()    
            }, 2000)
        }

        console.log(user)

    }

    return (
        <>
            <Box width='85.3%' p={2.5}>
                <Formik 
                    initialValues={{ usernameOrEmail: '', password: '' }}
                    validationSchema={validationSchema}
                    style={{ width: '100%' }} 
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormControl sx={{ display: 'flex', gap: 2.5 }}>
                                <Box>
                                    <Field as={TextField} name='usernameOrEmail' label='Nome de usuário ou email' required fullWidth />
                                    {errors.usernameOrEmail && touched.usernameOrEmail && (
                                        <p style={{ color: 'red' }}>{errors.usernameOrEmail}</p>
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
        </>
    )
}

function LoginSide() {
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

export default function Login() {
    return (
        <Auth formTitle='Log in' form={<LoginForm />} side={<LoginSide />} />
    )
}