import { createContext } from 'react'

export const authContext = createContext({ authenticated: false, handleLogin: () => {} })