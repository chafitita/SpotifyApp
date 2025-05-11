import { useEffect, useState } from 'react'
import background from './assets/background-op3.gif'
import title from './assets/Synthify-25-4-2025.png'
import './css/App.css'
import LoadingScreen from './components/LoadingScreen'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { SearchArtist } from './components/SearchArtist'
import { ArtistInfo } from './components/ArtistInfo'
import { AlbumInfo } from './components/AlbumInfo'
import { Login } from './Login'
import { Callback } from './components/CallBack'

function AppContent() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token")
    const tokenExpiry = localStorage.getItem("spotify_token_expiry")
    
    // Configura el interceptor una sola vez
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          localStorage.removeItem("spotify_access_token")
          localStorage.removeItem("spotify_token_expiry")
          navigate("/login", { replace: true })
        }
        return Promise.reject(error)
      }
    )

    if (!token || (tokenExpiry && Date.now() > parseInt(tokenExpiry))) {
      localStorage.removeItem("spotify_access_token")
      localStorage.removeItem("spotify_token_expiry")
      navigate("/login", { replace: true })
    } else {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token
    }

    return () => {
      // Limpia el interceptor cuando el componente se desmonta
      axios.interceptors.response.eject(interceptor)
    }
  }, [navigate])

  return (
    <div className="app-container">
      {isLoading && <LoadingScreen text="Tuning Synthify..."/>} 
      <img src={background} alt="background" className='background'/>
      <header>
        <img src={title} alt="title" className='title'/>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<Callback />} /> 
          <Route path="/" element={<SearchArtist/>}/>
          <Route path="/artist/:id" element={<ArtistInfo/>}/>
          <Route path="/album/:id" element={<AlbumInfo/>}/>
        </Routes>
      </main>
      <footer>
        {/* Tus enlaces a GitHub */}
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App