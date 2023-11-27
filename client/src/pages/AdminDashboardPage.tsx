import { AppLayout } from '$layout'
import { useAppSelector } from '$store'
import { useEffect, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboardPage(): ReactElement {

    const user = useAppSelector(state => state.auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.admin)
            navigate('/app/error')
    }, [ user, navigate ])

    return (
        <AppLayout>

        </AppLayout>
    )
}