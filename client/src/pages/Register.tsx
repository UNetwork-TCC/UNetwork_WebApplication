/* eslint-disable max-len */

import { Box, Button, Checkbox, FormControl, Snackbar, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { type ReactElement, useState } from 'react'
import { LoadingBackdrop, UNetworkModal } from '$layout'
import { useNavigate } from 'react-router-dom'
import { Auth } from '$components'
import { Field, Form, Formik } from 'formik'
import { Alert } from '@mui/material'
import { setCredentials, useLoginMutation, useSignupMutation } from '$features/auth'
import { useAppDispatch } from '$store'
import { type User } from '$types'
import * as Yup from 'yup'
import authDecoration from '$assets/svg/Auth/AuthDecoration.svg'

function RegisterForm(): ReactElement {

    const validationSchema = Yup.object().shape({
        fname: Yup.string().required('Este campo é obrigatório'),
        lname: Yup.string().required('Este campo é obrigatório'),
        username: Yup.string().required('Este campo é obrigatório'),
        email: Yup.string().email().required('Este campo é obrigatório'),
        password: Yup.string().min(8, 'A senha precisa ter 8 digitos').required('Este campo é obrigatório'),
        confirmPassword: Yup.string().required('Este campo é obrigatório'),
        rm: Yup.string().required('Este campo é obrigatório')
    })

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [ open, setOpen ] = useState(false)
    const [ openLoading, setOpenLoading ] = useState(false)
    const [ snackbarOpen, setSnackbarOpen ] = useState(false)

    const [ signup, { isSuccess: isSignupSuccess } ] = useSignupMutation()
    const [ login ] = useLoginMutation()

    const handleSnackbarOpen = (): void => { setSnackbarOpen(true) }
    const handleSnackbarClose = (): void => { setSnackbarOpen(false) }

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const handleOpenLoading = (): void => { setOpenLoading(true) }
    const handleCloseLoading = (): void => { setOpenLoading(false) }

    const handleSubmit = async (user: { fname: string, lname: string, email: string, password: string, username: string }): Promise<void> => {
        handleOpenLoading()

        const name = user.fname + ' ' + user.lname

        try {
            const response: any = await signup({
                name,
                username: user.username,
                email: user.email.toLowerCase(),
                password: user.password
            })

            if (!response.error) {
                const data: any = await login({
                    email: user.email.toLowerCase(),
                    password: user.password
                })

                dispatch(setCredentials({
                    user: data.data?.user as User,
                    accessToken: data.data?.token as string
                }))

                navigate('/app')
            } else if (!isSignupSuccess) {
                handleCloseLoading()
                handleSnackbarOpen()
            }
        } catch (error) {
            console.log(error)
            navigate('/app/error')
        }
    }

    const formInitialValues = { 
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        rm: ''
    }

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <>
            <Box width='85.3%' p={2.5}>
                <FormControl sx={{ display: 'flex', gap: 2.5 }}>
                    <Formik
                        initialValues={formInitialValues}
                        validationSchema={validationSchema}
                        style={{ width: '100%' }}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form action='/'>
                                <FormControl sx={{ display: 'flex', gap: 2.5 }}>
                                    <Box display='flex' gap={2.5}>
                                        <Box width='100%'>
                                            <Field as={TextField} fullWidth name='fname' label='Primeiro nome' required type='text' />
                                            {errors.fname && touched.fname && (
                                                <p style={{ color: 'red' }}>{errors.fname}</p>
                                            )}
                                        </Box>
                                        <Box width='100%'>
                                            <Field as={TextField} fullWidth name='lname' label='Segundo nome' required type='text' />
                                            {errors.lname && touched.lname && (
                                                <p style={{ color: 'red' }}>{errors.lname}</p>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box display='flex' gap={2.5}>
                                        <Box width='100%'>
                                            <Field as={TextField} name='username' inputProps={{ maxLength: 15 }} label='Nome de usuário' required fullWidth />
                                            {errors.username && touched.username && (
                                                <p style={{ color: 'red' }}>{errors.username}</p>
                                            )}
                                        </Box>
                                        <Box width='100%'>
                                            <Field as={TextField} name='rm' label='RM' inputProps={{ maxLength: 4 }} required fullWidth />
                                            {errors.rm && touched.rm && (
                                                <p style={{ color: 'red' }}>{errors.rm}</p>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box gap={2.5}>
                                        <Field as={TextField} name='email' fullWidth label='Email' required type='email' />
                                        {errors.email && touched.email && (
                                            <p style={{ color: 'red' }}>{errors.email}</p>
                                        )}
                                    </Box>
                                    <Box display='flex' gap={2.5}>
                                        <Box width='100%'>
                                            <Field as={TextField} fullWidth name='password' label='Senha' required type='password' />
                                            {errors.password && touched.password && (
                                                <p style={{ color: 'red' }}>{errors.password}</p>
                                            )}
                                        </Box>
                                        <Box width='100%'>
                                            <Field as={TextField} fullWidth name='confirmPassword' label='Repetir senha' required type='password' />
                                            {errors.confirmPassword && touched.confirmPassword && (
                                                <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box display='flex' justifyContent='space-between' mt={2} alignItems='center'>
                                        <Button type='submit' variant='contained'>Cadastrar</Button>
                                    </Box>
                                </FormControl>
                                <Box display='flex' justifyContent='space-between' ml={-1.5} mt={2} alignItems='center'>
                                    <Box width={!matches ? '60%' : '100%'} mt={matches ? 2.5 : 0} display='flex' alignItems='center'>
                                        <Checkbox required />
                                        <Typography>Li e aceito os
                                            <Typography
                                                onClick={handleOpen}
                                                sx={{
                                                    cursor: 'pointer',
                                                    ':hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }} color='primary.main'
                                                ml={0.5}
                                                component='span'
                                            >
                                                Termos de Serviço e Política de Privacidade
                                            </Typography>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </FormControl>
            </Box>
            <UNetworkModal
                open={open}
                title='Termos de Serviço'
                handleClose={handleClose}
            >
                <Box component='span'>Bem-vindo a UNetwork.</Box><br /><br /> Somos uma rede social que permite aos usuários se conectarem e compartilharem conteúdo. Ao usar nosso aplicativo, você concorda com estes termos de serviço. Por favor, leia-os atentamente:<br /><br />
                <Box component='span' fontWeight={600}>Descrição do Serviço</Box><br /> A UNetwork é uma rede social que permite aos usuários criar perfis, compartilhar conteúdo e se conectar com outros usuários. Oferecemos diversas funcionalidades, como postagens de fotos e vídeos, mensagens privadas e grupos de discussão. Nosso objetivo é fornecer uma plataforma segura e amigável para que os usuários possam se conectar e compartilhar suas experiências.<br /><br />
                <Box component='span' fontWeight={600}>Elegibilidade</Box><br />Para usar a UNetwork, você deve ter pelo menos 13 anos de idade. Ao criar uma conta, você declara que tem pelo menos 13 anos de idade e que todas as informações fornecidas são verdadeiras e precisas.<br /><br />
                <Box component='span' fontWeight={600}>Conteúdo do Usuário</Box><br />A UNetwork permite que os usuários postem conteúdo, incluindo fotos, vídeos e textos. Você é o único responsável pelo conteúdo que posta e pelas consequências de sua postagem. Você concorda em não postar conteúdo ilegal, ofensivo ou difamatório. Reservamo-nos o direito de remover qualquer conteúdo que viole estes termos de serviço.<br /><br />
                <Box component='span' fontWeight={600}>Conduta do Usuário</Box><br />Você concorda em usar a UNetwork de maneira responsável e respeitosa. Você não deve assediar, intimidar ou ameaçar outros usuários. Você não deve usar a UNetwork para atividades ilegais ou para promover atividades ilegais. Reservamo-nos o direito de encerrar sua conta se você violar estas regras de conduta.<br /><br />
                <Box component='span' fontWeight={600}>Direitos de Propriedade Intelectual</Box><br />A UNetwork e seu conteúdo são protegidos por leis de propriedade intelectual. Você não pode copiar, modificar ou distribuir nosso conteúdo sem nossa permissão prévia por escrito. Ao postar conteúdo na UNetwork, você nos concede uma licença não exclusiva, transferível, sublicenciável, livre de royalties e mundial para usar, copiar, modificar, criar trabalhos derivados, distribuir e exibir publicamente esse conteúdo em conexão com a UNetwork.<br /><br />
                <Box component='span' fontWeight={600}>Limitações de Responsabilidade</Box><br />A UNetwork é fornecida “como está” e “conforme disponível”. Não garantimos que o serviço será ininterrupto ou livre de erros. Não nos responsabilizamos por qualquer perda ou dano resultante do uso do nosso serviço. Em nenhum caso nossa responsabilidade total para com você excederá o valor pago por você pelo uso da UNetwork nos últimos 12 meses.<br /><br />
                <Box component='span' fontWeight={600}>Indenização</Box><br />Você concorda em indenizar e isentar a UNetwork e seus afiliados, diretores, funcionários e agentes de qualquer reclamação ou demanda feita por terceiros devido ao seu uso da UNetwork ou à violação destes termos de serviço.<br /><br />
                <Box component='span' fontWeight={600}>Rescisão</Box><br />Você pode encerrar sua conta a qualquer momento, acessando as configurações da sua conta. Reservamo-nos o direito de encerrar sua conta se você violar estes termos de serviço.<br /><br />
                <Box component='span' fontWeight={600}>Disposições Gerais</Box><br />Estes termos de serviço constituem o acordo integral entre você e a UNetwork em relação ao uso do nosso serviço. Podemos alterar estes termos de serviço a qualquer momento. Se houver uma disputa entre você e a UNetwork, ela será resolvida de acordo com as leis do país em que nossa empresa está sediada.<br /><br />
            </UNetworkModal>
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
                <Alert onClose={handleSnackbarClose} severity='error'>
                    Usuário já cadastrado!
                </Alert>
            </Snackbar>
        </>
    )
}

function RegisterSide(): ReactElement {
    return (
        <Box width='100%'>
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                <Typography textAlign='center' variant='h3' color='primary.main' fontWeight={900}>Pronto para se conectar?</Typography>
                <Typography mb={5} textAlign='center' variant='h6'>Faça seu cadastro e impulsione seu crescimento conosco!</Typography>
                <img style={{ height: '20rem', width: '30rem' }} src={authDecoration} />
            </Box>
        </Box>
    )
}

export default function Register(): ReactElement {
    return (
        <Auth formTitle='Sign in' form={<RegisterForm />} side={<RegisterSide />} />
    )
}