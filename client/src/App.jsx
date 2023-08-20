import { CssBaseline } from '@mui/material'
import GoogleAuth from './components/GoogleAuth'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './constants'
import { useState } from 'react'
import { lightTheme } from './themes'
import { themeContext } from './contexts'
import { LandingPage, ErrorPage, FavoritesPage, ChatPage } from './pages'
import ThemeStore from './layout/ThemeStore'
import Auth from './pages/Auth'
import './utils/languages'
import { Home } from './pages'
import MaterialsPage from './pages/MaterialsPage'

function App() {
    const [ theme, setTheme ] = useState(lightTheme)
    const lang = navigator.language.split('-')[1].toLowerCase()

    return (
        <Router>
            <themeContext.Provider value={{ theme, setTheme }}>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <ThemeStore>
                        <CssBaseline />
                        <Routes>
                            <Route path="/" element={<Navigate to={'/' + lang} />} />
                            <Route path="/:lang" element={<LandingPage />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/error" element={<ErrorPage />} />
                            <Route path='/app' element={<Home />} />
                            <Route path='/app/favorites' element={<FavoritesPage />} />
                            <Route path='/app/materials' element={<MaterialsPage />} />
                            <Route path='/app/chat' element={<ChatPage />} />
                            <Route path='/app/*' element={<Navigate to='/error' />} />
                            
                        </Routes>
                    </ThemeStore>
                </GoogleOAuthProvider>
            </themeContext.Provider>
        </Router>
    )
}

export default App
