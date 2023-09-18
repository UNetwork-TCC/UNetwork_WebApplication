import { GoogleLogin } from 'react-google-login'
import { ActionTypes, GOOGLE_CLIENT_ID } from '../constants'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import googleLogo from '../assets/svg/Auth/GoogleLogo.svg'
import { IconButton } from '@mui/material'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'

export default function GoogleAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { AUTH } = ActionTypes

    const googleSuccess = (res) => {
        const result = res?.profileObj
        const token = res?.token

        try {
            dispatch({ type: AUTH, data: { result, token } })
            console.log({ result, token })
            
            setTimeout(() => {
                navigate('/app')
            }, 1000)

        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = error => {
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
                    <IconButton onClick={renderProps.onClick}>
                        <img src={googleLogo} style={{ height: '3rem', width: '3rem' }} />
                    </IconButton>
                )
            }
            clientId={GOOGLE_CLIENT_ID}
            redirectUri='/'
            onSuccess={googleSuccess}
            onFailure={googleFailure}
        />
    )
}
