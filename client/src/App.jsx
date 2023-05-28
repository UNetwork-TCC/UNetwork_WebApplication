
import { CssBaseline } from '@mui/material'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './constants'
import { useState } from 'react'
import { lightTheme } from './themes'
import { themeContext } from './contexts'
import { Home, ErrorPage } from './pages'
import ThemeStore from './layout/ThemeStore'
import ChatPage from './pages/Chat'

function App() {
    const [ theme, setTheme ] = useState(lightTheme)

    return (
        <Router>
            <themeContext.Provider value={{ theme, setTheme }}>
                <GoogleOAuthProvider clientId={ GOOGLE_CLIENT_ID }>
                    <ThemeStore>
                        <CssBaseline />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/error" element={<ErrorPage />} />
                            <Route path="/chat" element={<ChatPage />} />
                            <Route path='*' element={<Navigate to='/error' />} />
                        </Routes>
                    </ThemeStore>
                </GoogleOAuthProvider>
            </themeContext.Provider>
        </Router>
    )
}

export default App
