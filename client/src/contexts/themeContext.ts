import { createContext, type Dispatch, type SetStateAction } from 'react'
import { lightTheme } from '../themes'
import { type CustomTheme } from '@mui/material'

export const themeContext = createContext<
    { theme: CustomTheme, setTheme: Dispatch<SetStateAction<CustomTheme>> }
>({ theme: lightTheme, setTheme: () => {} })
