import { createContext } from "react";

export const user = {
    name: '',
    email: '',
    followers: '',
    settings: '',
    password: '',
    groupes: '',
    chats: '',
    admin: false,
    posts: '',
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
export const userContext = createContext()