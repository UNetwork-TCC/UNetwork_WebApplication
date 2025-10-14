'use client'

import { ReactElement, useEffect, useState } from 'react'

export default function RequireAuth({ children } : { children: ReactElement }): ReactElement | null {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getToken()
            setToken(token)
        }

        fetchToken()
    }, [])

    const getToken = async (): Promise<string | null> => {
        const token = await (await fetch('/api/auth/token')).text()
        return token
    }

    if (token) {
        return children
    } else {
        // location.href = '/auth/login'
        return null
    }
}