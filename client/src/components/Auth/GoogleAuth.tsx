import { GoogleLogin, type GoogleLoginResponse } from 'react-google-login'
import { GET_TYPE, GOOGLE_CLIENT_ID, HTTP_STATUS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import googleLogo from '$assets/svg/Auth/GoogleLogo.svg'
import { IconButton } from '@mui/material'
import { type ReactElement, useEffect, useState } from 'react'
import { gapi } from 'gapi-script'
import { LoadingBackdrop } from '$layout'
import { useAppDispatch } from '$store'
import { login, signup } from '$features/auth'

export default function GoogleAuth(): ReactElement {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [loadingOpen, setLoadingOpen] = useState<boolean>(false)

    const googleSuccess: any = async (response: GoogleLoginResponse): Promise<void> => {
        const result = response?.profileObj
        // const token = response?.tokenId

        try {
            await dispatch(signup({
                name: result.name,
                email: result.email.toLowerCase(),
                password: result.googleId
            }))

            const status = await dispatch(login({
                email: result.email.toLowerCase(),
                password: result.googleId
            })).then(res => GET_TYPE(res.type))

            if (status === HTTP_STATUS.FULFILLED)
                navigate('/app')
        } catch (error) {
            console.log(error)
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
