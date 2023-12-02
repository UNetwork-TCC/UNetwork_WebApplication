import { GoogleLogin, type GoogleLoginResponse } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../constants'
import { useNavigate } from 'react-router-dom'
import googleLogo from '$assets/svg/Auth/GoogleLogo.svg'
import { Box, Button, IconButton, TextField } from '@mui/material'
import { type ReactElement, useEffect, useState } from 'react'
import { gapi } from 'gapi-script'
import { FormModal, LoadingBackdrop } from '$layout'
import { useSignupMutation, useLoginMutation } from '$features/auth'
import { useAppDispatch } from '$store'
import { setCredentials } from '$features/auth'

export default function GoogleAuth(): ReactElement {
    const navigate = useNavigate()

    const [ loadingOpen, setLoadingOpen ] = useState<boolean>(false)

    const [ login, { data } ] = useLoginMutation()
    const [ signup ] = useSignupMutation()

    const [ modalOpen, setModalOpen ] = useState(false)

    const [ userRM, setUserRM ] = useState<string>('')
    const [ result, setResult ] = useState<GoogleLoginResponse | null>(null)

    const dispatch = useAppDispatch()

    const googleSuccess: any = async (response: GoogleLoginResponse): Promise<void> => {
        setResult(response)
        setModalOpen(true)
    }

    const onConfirm = (): void => {
        (async () => {
            setModalOpen(false)
    
            await signup({
                username: result?.profileObj.name as string,
                name: result?.profileObj.familyName as string,
                email: result?.profileObj.email.toLowerCase() as string,
                password: result?.profileObj.googleId as string
            })
    
            await login({
                email: result?.profileObj.email.toLowerCase() as string,
                password: result?.profileObj.googleId as string
            })
    
            dispatch(setCredentials({ user: data?.user, accessToken: data?.token }))
    
            navigate('/app')
        })()
    }

    const googleFailure = (error: any): void => {
        console.log(error)
        console.log('Não foi possível logar com a Google. Tente novamente mais tarde.')
    }

    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.auth2.init({ clientId: GOOGLE_CLIENT_ID })
        })
    }, [])

    return (
        <>
            <GoogleLogin
                render={
                    (renderProps) => (
                        <>
                            <IconButton onClick={() => {
                                setLoadingOpen(true)
                                renderProps.onClick()
                            }}>
                                <img src={googleLogo} style={{ height: '3rem', width: '3rem' }} />
                            </IconButton>
                            <LoadingBackdrop
                                open={loadingOpen}
                                handleClose={(): void => { setLoadingOpen(false) }}
                            />
                        </>
                    )
                }
                clientId={GOOGLE_CLIENT_ID}
                redirectUri='/'
                onSuccess={googleSuccess}
                onFailure={googleFailure}
            />
            <FormModal
                open={modalOpen}
                onClose={() => { setModalOpen(false) }}
                title='Insira seu RM'
                sx={{
                    minHeight: '10rem'
                }}
            >
                <Box>
                    <TextField 
                        fullWidth
                        placeholder='Insira seu RM'
                        label='RM'
                        onChange={e => { setUserRM(e.currentTarget.value) }}
                        value={userRM}
                        inputProps={{ maxLength: 4 }}
                    />
                    <Box display='flex' justifyContent='space-between' mt={5}>
                        <Button onClick={onConfirm} variant='contained'>Confirmar</Button>
                        <Button onClick={() => { setModalOpen(false); setLoadingOpen(false) }} variant='outlined' >Cancelar</Button>
                    </Box>
                </Box>
            </FormModal>
        </>
    )
}
