/* eslint-disable max-len */

import { Box, Button, Checkbox, FormControl, TextField, Typography } from '@mui/material'
import { type ReactElement, useState } from 'react'
import { LoadingBackdrop, UNetworkModal } from '$layout'
import { useNavigate } from 'react-router-dom'
import { Auth } from '$components'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import authDecoration from '$assets/svg/Auth/AuthDecoration.svg'
import { useAppDispatch } from '$store'
import { signup } from '$features/auth/auth-slicer'

function RegisterForm(): ReactElement {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Este campo é obrigatório'),
        email: Yup.string().email().required('Este campo é obrigatório'),
        password: Yup.string().min(8, 'A senha precisa ter 8 digitos').required('Este campo é obrigatório'),
        confirmPassword: Yup.string().required('Este campo é obrigatório')
    })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [ open, setOpen ] = useState(false)
    const [ openLoading, setOpenLoading ] = useState(false)

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const handleOpenLoading = (): void => { setOpenLoading(true) }
    const handleCloseLoading = (): void => { setOpenLoading(false) }

    const handleSubmit = (user: { name: string, email: string, password: string }): void => {
        handleOpenLoading()

        try {
            dispatch(signup({
                name: user.name,
                email: user.email,
                password: user.password
            }))

            console.log('oi')
        } catch (error) {
            console.log(error)            
        }

        setTimeout(() => {
            navigate('/app')
        }, 2000)
    }

    return (
        <>
            <Box p={2.5}>
                <FormControl sx={{ display: 'flex', gap: 2.5 }}>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        style={{ width: '100%' }} 
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form action='/'>
                                <FormControl sx={{ display: 'flex', gap: 2.5 }}>
                                    <Box>
                                        <Field as={TextField} name='name' label='Nome' required fullWidth />
                                        {errors.name && touched.name && (
                                            <p style={{ color: 'red' }}>{errors.name}</p>
                                        )}
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
                                            <Field as ={TextField} fullWidth name='confirmPassword' label='Repetir senha' required type='password' />
                                            {errors.confirmPassword && touched.confirmPassword && (
                                                <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box display='flex' justifyContent='space-between' mt={2} alignItems='center'>
                                        <Button type='submit' variant='contained'>Entrar</Button>
                                    </Box>
                                </FormControl>
                            </Form>
                        )}
                    </Formik>
                    <Box display='flex' justifyContent='space-between' ml={-1.5} mt={2} alignItems='center'>
                        <Box width='60%' display='flex' alignItems='center'>
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
                handleClose={handleCloseLoading}
                open={openLoading}
            />
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