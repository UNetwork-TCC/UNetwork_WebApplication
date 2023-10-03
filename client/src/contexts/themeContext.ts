import { createContext } from 'react'
import { lightTheme } from '../themes'
import { CustomTheme } from '@mui/material'

export const themeContext = createContext<CustomTheme | any>(lightTheme)