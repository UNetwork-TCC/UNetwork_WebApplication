import { GoogleLogin } from 'react-google-login'
import { ActionTypes, GOOGLE_CLIENT_ID } from '../constants'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function GoogleAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { AUTH } = ActionTypes

    const googleSuccess = (res) => {
        const result = res?.profileObj
        const token = res?.token

        try {
            dispatch({ type: AUTH, data: { result, token } })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = error => {
        console.log(error)
        console.log('Não foi possível logar com a Google. Tente novamente mais tarde.')
    }

    return (
        <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            redirectUri='/'
            onSuccess={googleSuccess}
            onFailure={googleFailure}
        />
    )
}
