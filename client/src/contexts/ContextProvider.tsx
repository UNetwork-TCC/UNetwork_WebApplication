import { type ReactElement, useState, type CSSProperties } from 'react'
import { appLayoutContext, themeContext } from '$contexts'
import { ThemeStore } from '$layout'
import { CssBaseline, type CustomTheme } from '@mui/material'
import { darkTheme, lightTheme } from '$themes'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from '$constants'
import { setAppLayout, setTheme as setThemeAction } from '$features/user'
import { useAppDispatch, useAppSelector } from '$store'
export default function ContextProvider({ children } : { children: ReactElement }): ReactElement {
    const dispatch = useAppDispatch()

    //  Theme Context

    const themeMode = useAppSelector(state => state.config.theme)
    const appLayout = useAppSelector(state => state.config.appLayout)

    const [ theme, setTheme ] = useState(themeMode === 'light' ? lightTheme : darkTheme)

    const changeTheme = (themeParam: CustomTheme): void => {
        setTheme(themeParam)
        dispatch(setThemeAction(themeParam.palette.mode))
    }

    const themeContextValue = { theme, setTheme: changeTheme }

    // Layout Context

    const [ dropdownButtonClicked, setDropdownButtonClicked ] = useState<boolean>(appLayout.sideBar.dropdownButtonClicked || false)
    const [ shortcutsExpanded, setShortcutsExpanded ] = useState<boolean>(appLayout.sideBar.shortcutsExpanded || true)

    const changeDropdownState = (): void => {
        setDropdownButtonClicked(prevState => !prevState)

        dispatch(setAppLayout({
            ...appLayout,
            sideBar: {
                ...appLayout.sideBar,
                dropdownButtonClicked: !dropdownButtonClicked
            }
        }))
    }

    const changeShortcutsState = (): void => {
        setShortcutsExpanded(prevState => !prevState)
        
        dispatch(setAppLayout({
            ...appLayout,
            sideBar: {
                ...appLayout.sideBar,
                shortcutsExpanded: !shortcutsExpanded
            }
        }))
    }

    const [ size, setSize ] = useState<CSSProperties>(appLayout.window.size || {})

    const changeSize = (css: CSSProperties): void => {
        setSize(css)

        dispatch(setAppLayout({
            ...appLayout,
            window: {
                size: css
            }
        }))
    }

    const appLayoutContextValue = {
        sideBar: {
            setDropdownButtonClicked: changeDropdownState,
            setShortcutsExpanded: changeShortcutsState,
            dropdownButtonClicked,
            shortcutsExpanded
        },
        
        window: {
            size,
            setSize: changeSize
        }
    }

    return (
        <themeContext.Provider value={themeContextValue}>
            <ThemeStore>
                <appLayoutContext.Provider value={appLayoutContextValue}>
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <CssBaseline />
                        {children}
                    </GoogleOAuthProvider>
                </appLayoutContext.Provider>
            </ThemeStore>
        </themeContext.Provider>
    )
}