import { CssBaseline, CustomTheme } from '@mui/material'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from '$constants'
import { Dispatch, SetStateAction, useState } from 'react'
import { lightTheme } from '$themes'
import { themeContext } from '$contexts'
import { Login, Register, Home, LandingPage, ErrorPage, FavoritesPage, ChatPage, NewsPage, ClassesPage, ForumPage, MaterialsPage } from '$pages'
import { ThemeStore } from '$layout'
import '$utils/languages'
import { Theme } from '@mui/material'

function App() {
    const [ theme, setTheme ] = useState<Theme>(lightTheme)
    const lang = navigator.language.split('-')[0].toLowerCase()

    const themeContextValue: { theme: CustomTheme, setTheme: Dispatch<SetStateAction<CustomTheme>> } = { theme, setTheme }

    return (    
        <Router>
            <themeContext.Provider value={themeContextValue}>
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
