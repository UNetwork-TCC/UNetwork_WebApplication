import { GoogleLogin, type GoogleLoginResponse } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../constants'
import { useNavigate } from 'react-router-dom'
import googleLogo from '$assets/svg/Auth/GoogleLogo.svg'
import { IconButton } from '@mui/material'
import { type ReactElement, useEffect, useState } from 'react'
import { gapi } from 'gapi-script'
import { LoadingBackdrop } from '$layout'
import { useSignupMutation, useLoginMutation } from '$features/auth/authApiSlice'
import { useAppDispatch } from '$store'
import { setCredentials } from '$features/auth'
import { useGetUserMutation } from '$features/user'

export default function GoogleAuth(): ReactElement {
    const navigate = useNavigate()

    const [ loadingOpen, setLoadingOpen ] = useState<boolean>(false)

    const [ login, { data } ] = useLoginMutation()
    const [ signup ] = useSignupMutation()
    const [ getUser, { data: userData } ] = useGetUserMutation()

    const dispatch = useAppDispatch()

    const googleSuccess: any = async (response: GoogleLoginResponse): Promise<void> => {
        const result = response?.profileObj

        try {
            await signup({
                name: result.name,
                email: result.email.toLowerCase(),
                password: result.googleId
            })

            await login({
                email: result.email.toLowerCase(),
                password: result.googleId
            })

            await getUser(data?.id ?? '')

            dispatch(setCredentials({ user: userData, accessToken: data?.token }))

            navigate('/app')
        } catch (error) {
            console.log(error)
            navigate('/app/error')
        }
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
    )
}
