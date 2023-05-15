
import { CssBaseline } from '@mui/material'
import GoogleAuth from './components/GoogleAuth'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './constants'
import { useState } from 'react'
import { lightTheme } from './themes'
import { themeContext } from './contexts'
import { Home } from './pages'

function App() {
    const [ theme, setTheme ] = useState(lightTheme)

    return (
        <Router>
            <themeContext.Provider value={{ theme, setTheme }}>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<GoogleAuth />} />
                        <Route path="/Home" element={<Home />} />
                    </Routes>
                </GoogleOAuthProvider>
            </themeContext.Provider>
        </Router>
    )
}

export default App
