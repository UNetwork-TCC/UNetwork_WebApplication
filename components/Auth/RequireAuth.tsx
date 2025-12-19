'use client'

import { ReactElement } from 'react'
import { useAppSelector } from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RequireAuth({
  children
}: {
  children: ReactElement
}): ReactElement | null {
  const router = useRouter()
  const token = useAppSelector(state => state.auth.token)
  const user = useAppSelector(state => state.auth.user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Aguarda um tick para garantir que o Redux Persist hidratou
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Debug - remover depois
    console.log('[RequireAuth] isLoading:', isLoading, 'token:', !!token, 'user:', !!user?._id)
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('persist:auth')
        if (stored) {
          console.log('[RequireAuth] localStorage persist:auth:', JSON.parse(stored))
        }
      } catch (e) {
        console.error('[RequireAuth] Erro ao parsear localStorage:', e)
        // Limpar dados corrompidos
        localStorage.removeItem('persist:auth')
      }
    }
  }, [isLoading, token, user])

  useEffect(() => {
    // Só redirecionar após carregar e se não tiver autenticação
    if (!isLoading && !token && !user?._id) {
      console.log('[RequireAuth] Redirecionando para login...')
      router.push('/auth/login')
    }
  }, [isLoading, token, user, router])

  // Enquanto carrega, não renderiza nada
  if (isLoading) {
    return null
  }

  // Se não tem token nem usuário, não renderizar (vai redirecionar)
  if (!token && !user?._id) {
    return null
  }

  return children
}
