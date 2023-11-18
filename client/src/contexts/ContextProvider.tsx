import { type ReactElement, useState, type CSSProperties } from 'react'
import { appLayoutContext, themeContext } from '$contexts'
import { ThemeStore } from '$layout'
import { CssBaseline, type Theme } from '@mui/material'
import { lightTheme } from '$themes'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from '$constants'

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

    return (
        <themeContext.Provider value={themeContextValue}>
            <ThemeStore>
                <appLayoutContext.Provider value={appLayoutContextValue}>
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
                        <CssBaseline />
                        {children}
                    </GoogleOAuthProvider>
                </appLayoutContext.Provider>
            </ThemeStore>
        </themeContext.Provider>
    )
}