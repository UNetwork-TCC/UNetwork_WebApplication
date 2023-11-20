import { type ReactElement, useState, type CSSProperties } from 'react'
import { appLayoutContext, userContext, themeContext, user as userDefaultValue } from '$contexts'
import { ThemeStore } from '$layout'
import { CssBaseline, type Theme } from '@mui/material'
import { lightTheme } from '$themes'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from '$constants'

import { type User } from '$types'

export default function ContextProvider({ children } : { children: ReactElement }): ReactElement {
    //  Theme Context

    const [ theme, setTheme ] = useState<Theme>(lightTheme)
    const themeContextValue = { theme, setTheme }
    
    // Layout Context

    const [ dropdownButtonClicked, setDropdownButtonClicked ] = useState(false)
    const [ shortcutsExpanded, setShortcutsExpanded ] = useState(true)

    const [ size, setSize ] = useState<CSSProperties>({})

    const appLayoutContextValue = {
        sideBar: {
            dropdownButtonClicked,
            setDropdownButtonClicked,
            shortcutsExpanded,
            setShortcutsExpanded
        },
        
        window: {
            size,
            setSize
        }
    }

    // User Context

    const [ user, setUser ] = useState<User>(userDefaultValue)
    const userContextValue = { user, setUser }

    return (
        <themeContext.Provider value={themeContextValue}>
            <ThemeStore>
                <appLayoutContext.Provider value={appLayoutContextValue}>
                    <userContext.Provider value={userContextValue}>
                        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                            <CssBaseline />
                            {children}
                        </GoogleOAuthProvider>
                    </userContext.Provider>
                </appLayoutContext.Provider>
            </ThemeStore>
        </themeContext.Provider>
    )
}