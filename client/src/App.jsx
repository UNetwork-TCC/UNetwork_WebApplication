import { CssBaseline } from '@mui/material'
import GoogleAuth from './components/GoogleAuth'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './constants'
import { useState } from 'react'
import { lightTheme } from './themes'
import { themeContext } from './contexts'
import { Home, ErrorPage, ChatPage, ClassesPage, FavoritesPage, MaterialsPage, NewsPage} from './pages'
import ThemeStore from './layout/ThemeStore'

function App() {
    const [theme, setTheme] = useState(lightTheme)

    return (
        <Router>
            <themeContext.Provider value={{ theme, setTheme }}>
                <GoogleOAuthProvider clientId={ GOOGLE_CLIENT_ID }>
                    <ThemeStore>
                        <CssBaseline />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/chat" element={<ChatPage />} />
                            <Route path="/classes" element={<ClassesPage />} />
                            <Route path="/favorites" element={<FavoritesPage />} />
                            <Route path="/materials" element={<MaterialsPage />} />
                            <Route path="/news" element={<NewsPage />} />
                            <Route path="/error" element={<ErrorPage />} />
                            <Route path='*' element={<Navigate to='/error' />} />
                        </Routes>
                    </ThemeStore>
                </GoogleOAuthProvider>
            </themeContext.Provider>
        </Router>
    )
}

export default App
