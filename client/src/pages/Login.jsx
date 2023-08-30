import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { LoadingBackdrop } from '../layout'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../components'
import loginDecoration from '../assets/svg/Auth/LoginDecoration.svg'
function LoginForm() {

    const navigate = useNavigate()

    const [ openLoading, setOpenLoading ] = useState(false)

    const handleOpenLoading = () => setOpenLoading(true)
    const handleCloseLoading = () => setOpenLoading(false)

    const handleSubmit = () => {
        handleOpenLoading()

        // localStorage.setItem('user', 1)

        setTimeout(() => {
            navigate('/app')
        }, 2000)
    }

    return (
        <>
            <Box width='85.3%' p={2.5}>
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <FormControl sx={{ display: 'flex', gap: 2.5 }}>
                        <TextField label='Nome de usuário ou email' required fullWidth />
                        <Box display='flex' gap={2.5}>
                            <TextField fullWidth label='Senha' required type='password' />
                        </Box>
                        <Box display='flex' justifyContent='space-between' mt={2} alignItems='center'>
                            <Button type='submit' variant='contained'>Entrar</Button>
                        </Box>
                    </FormControl>
                </form>
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
        <Auth form={<LoginForm />} side={<LoginSide />} />
    )
}