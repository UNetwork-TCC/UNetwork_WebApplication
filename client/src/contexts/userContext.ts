import { type Dispatch, type SetStateAction, createContext } from 'react'
import { type User } from '../types'

export const user: User = {
    name: '',
    email: '',
    followers: [],
    settings: {
        theme: 'light',
        account: 'public'
    },
    password: '',
    groupes: [],
    chats: [],
    admin: false,
    posts: [],
    otherInfo: {
        avatar: '',
        bio: '',
        phone: ' ',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brazil',
        grade: 1
    }
}
export const userContext = createContext<{
    user: User; setUser: Dispatch<SetStateAction<User>> | (() => void) 
        }>({ user, setUser: () => {} })
