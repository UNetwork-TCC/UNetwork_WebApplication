import { createContext } from 'react'
import { lightTheme } from '../themes'
import { type CustomTheme } from '@mui/material'

export const themeContext = createContext<
    { theme: CustomTheme, setTheme: (themeParam: CustomTheme) => void }
        >({ theme: lightTheme, setTheme: () => {} })
