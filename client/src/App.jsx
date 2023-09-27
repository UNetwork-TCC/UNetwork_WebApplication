import { CssBaseline } from '@mui/material'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './constants'
import { useState } from 'react'
import { lightTheme } from './themes'
import { themeContext } from './contexts'
import { LandingPage, ErrorPage, FavoritesPage, ChatPage, NewsPage, ClassesPage, ForumPage } from './pages'
import ThemeStore from './layout/ThemeStore'
import { Home } from './pages'
import MaterialsPage from './pages/MaterialsPage'
import { Login, Register } from './pages'
import './utils/languages'

function App() {
    const [ theme, setTheme ] = useState(lightTheme)
    const lang = navigator.language.split('-')[0].toLowerCase()

    return (
        <Router>
            <themeContext.Provider value={{ theme, setTheme }}>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <ThemeStore>
                        <CssBaseline />
                        <Routes>
                            <Route path="/" element={<Navigate to={'/' + lang} />} />
                            <Route path="/:lang" element={<LandingPage />} />
                            <Route path="/auth/register" element={<Register />} />
                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/error" element={<ErrorPage />} />
                            <Route path='/app' element={<Home />} />
                            <Route path='/app/favorites' element={<FavoritesPage />} />
                            <Route path='/app/materials' element={<MaterialsPage />} />
                            <Route path='/app/chat' element={<ChatPage />} />
                            <Route path='/app/news' element={<NewsPage />} />
                            <Route path='/app/forum' element={<ForumPage />} />
                            <Route path='/app/classes' element={<ClassesPage />} />
                            <Route path='/app/*' element={<Navigate to='/error' />} />
                        </Routes>
                    </ThemeStore>       
                </GoogleOAuthProvider>
            </themeContext.Provider>
        </Router>
    )
}

export default App
