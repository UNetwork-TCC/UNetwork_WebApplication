<<<<<<< HEAD
import NavBar from './components/Home/NavBar.jsx'
import './App.css'
import Header from './layout/Header.jsx'

function App() {
    

    return (
        <div>
            <Header/>
            <NavBar/>
            
        </div>
=======
import { CssBaseline } from '@mui/material'
import GoogleAuth from './components/GoogleAuth'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './constants'
import { useState } from 'react'
import { lightTheme } from './themes'
import { themeContext } from './contexts'

function App() {
    const [ theme, setTheme ] = useState(lightTheme)

    return (
        <Router>
            <themeContext.Provider value={{ theme, setTheme }}>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<GoogleAuth />} />
                    </Routes>
                </GoogleOAuthProvider>
            </themeContext.Provider>
        </Router>
>>>>>>> 731bd55abd0af4104a62bea271eb279d2389d8ad
    )
}

export default App
