import { useAppSelector } from '$store'
import { type ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({ children } : { children: ReactElement }): ReactElement {
    const token = useAppSelector(state => state.auth.token)
    const location = useLocation()

    return (
        token
            ? children
            : <Navigate to='/auth/login' state={{ from: location }} replace />
    )
}