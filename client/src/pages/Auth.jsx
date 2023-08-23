import { Box, Button, Checkbox, FormControl, IconButton, Modal, TextField, Typography } from '@mui/material'
import { Footer, LandingPageHeader } from '../layout'
import { useTheme } from '@emotion/react'
import { useState } from 'react'
import { grey } from '@mui/material/colors'
import authDecoration from '../assets/svg/Auth/AuthDecoration.svg'
import facebookLogo from '../assets/svg/Auth/FacebookLogo.svg'
import googleLogo from '../assets/svg/Auth/GoogleLogo.svg'
import logo from '../assets/img/Logo.png'
import lightLogo from '../assets/img/LightLogo.png'

export default function Auth() {
    const theme = useTheme()

    const [ open, setOpen ] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    console.log(theme.palette.background.default);

    return (
        <>
            <Box bgcolor='background.paper'>
                <LandingPageHeader />
                <Box minHeight='65vh' width='100%' display='flex' justifyContent='center' alignItems='center' p={5}>
                    <Box height='100%' width='100%' display='flex' justifyContent='center' alignItems='center'>
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='start' minHeight='60vh' width='80%' borderRadius={5} border={`1px solid ${theme.palette.primary.main}`}>
                            <Typography m={3} variant='h5' color='primary.main' fontWeight={900} textAlign='center'>Crie sua conta</Typography>
                            <Box display='flex' gap={5}>
                                <IconButton>
                                    <img src={googleLogo} style={{ height: '3rem', width: '3rem' }} />
                                </IconButton>
                                <IconButton>
                                    <img src={facebookLogo} style={{ height: '3rem', width: '3rem' }} />
                                </IconButton>
                            </Box>
                            <Box display='flex' alignItems='center'>
                                <Box sx={{ width: '8rem', height: '1px', bgcolor: 'tinyElements' }} />
                                <Typography m={2}>Ou cadastre seu email</Typography>
                                <Box sx={{ width: '8rem', height: '1px', bgcolor: 'tinyElements' }} />
                            </Box>
                            <Box p={2.5}>
                                <FormControl sx={{ display: 'flex', gap: 2.5 }}>
                                    <TextField label='Nome' required fullWidth />
                                    <TextField label='Email' required  fullWidth/>
                                    <Box display='flex' gap={2.5}>
                                        <TextField fullWidth label='Senha' required type='password' />
                                        <TextField fullWidth label='Repetir senha' required type='password' />
                                    </Box>
                                    <Box display='flex' justifyContent='space-between' ml={-1.5} mt={2} alignItems='center'>
                                        <Box width='60%' display='flex' alignItems='center'>
                                            <Checkbox required />
                                            <Typography>Li e aceito os
                                                <Typography onClick={handleOpen} ml={0.5} component='span' sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }} color='primary.main'>
                                                    Termos de Serviço e Política de Privacidade
                                                </Typography>
                                            </Typography>
                                        </Box>
                                        <Button variant='contained'>Cadastrar</Button>
                                    </Box>
                                </FormControl>
                            </Box>
                            <Box></Box>
                        </Box>
                    </Box>
                    <Box height='100%' width='100%' display='flex' justifyContent='center' alignItems='center'>
                        <Box width='100%'>
                            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                <Typography textAlign='center' variant='h3' color='primary.main' fontWeight={900}>Pronto para se conectar?</Typography>
                                <Typography textAlign='center' variant='h6'>Faça seu cadastro e impulsione seu crescimento conosco!</Typography>
                                <img src={authDecoration} />
                            </Box>
                            <Box>

                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Footer />
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                disableAutoFocus
            >
                <Box height='80vh' width='30vw' borderRadius={3} bgcolor='background.paper'>
                    <Box m={3} display='flex' justifyContent='center' alignItems='center'>
                        { theme.palette.mode === 'light' ?
                            <img width={75} height={75} src={logo} alt="Logo" />
                            :                    
                            <img width={75} height={75} src={lightLogo} alt="Logo" />
                        }
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Box sx={{ width: '8rem', height: '1px', bgcolor: 'tinyElements' }}/>
                        <Typography variant='h6' m='0 20px' fontWeight={900}>Termos de Serviço</Typography>
                        <Box sx={{ width: '8rem', height: '1px', bgcolor: 'tinyElements' }}/>    
                    </Box>
                    <Box m={2.5} p={2} sx={{ '::-webkit-scrollbar': { height: 5, width: 5 } }} overflow='scroll' borderRadius={2} height='78%' bgcolor='background.card'>
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
                    </Box>
                </Box>
            </Modal>
        </>
    )
}