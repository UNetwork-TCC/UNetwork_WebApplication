import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { ContextProvider } from '$contexts'
import { type ReactElement } from 'react'

import { 
    Login,
    Register,
    Home,
    LandingPage,
    ErrorPage,
    FavoritesPage,
    ChatPage,
    NewsPage,
    ClassesPage,
    ForumPage,
    MaterialsPage,
    ForumHome, 
    PostPage,
    ProfilePage,
    AdminDashboardPage
} from '$pages'

import '$utils/languages'

function App(): ReactElement {
    const lang = navigator.language.split('-')[0].toLowerCase()

    return ( 
        <ContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to={'/' + lang} />} />
                    <Route path="/:lang" element={<LandingPage />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path='/app' element={<Home />} />
                    <Route path='/app/profile/:id' element={<ProfilePage />} />
                    <Route path='/app/favorites' element={<FavoritesPage />} />
                    <Route path='/app/materials' element={<MaterialsPage />} />
                    <Route path='/app/admin/dashboard' element={<AdminDashboardPage />} />
                    <Route path='/app/chat' element={<ChatPage />} />
                    <Route path='/app/news' element={<NewsPage />} />
                    <Route path='/app/forum' element={<ForumHome />} />
                    <Route path='/app/classes' element={<ClassesPage />} />
                    <Route path='/app/post/:id' element={<PostPage />} />
                    <Route path='/app/forum/:id' element={<ForumPage />} />
                    <Route path='/app/*' element={<Navigate to='/error' />} />
                </Routes>
            </Router>
        </ContextProvider>  
    )
}

export default App
