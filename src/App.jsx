import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import LoadingScreen from './components/LoadingScreen';
import { Login } from './Login';

import { SearchArtist } from './components/SearchArtist';
import { ArtistInfo } from './components/ArtistInfo';
import { AlbumInfo } from './components/AlbumInfo';

import './css/App.css';
import background from './assets/background-op3.gif';
import title from './assets/Synthify-25-4-2025.png';
import { Callback } from './components/Callback'

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    const tokenExpiryString = localStorage.getItem("spotify_token_expiry");
    const tokenExpiry = tokenExpiryString ? parseInt(tokenExpiryString, 10) : null;

    const interceptor = axios.interceptors.response.use(
      response => response, 
      error => {
        
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Interceptor: Token inválido o expirado. Redirigiendo a login.");
          localStorage.removeItem("spotify_access_token");
          localStorage.removeItem("spotify_token_expiry");
          localStorage.removeItem("spotify_refresh_token");
          
          delete axios.defaults.headers.common["Authorization"];
          navigate("/login", { replace: true, state: { message: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo." } });
        }
        return Promise.reject(error);
      }
    );

    if (!token || (tokenExpiry && Date.now() > tokenExpiry)) {
      if (token || tokenExpiry) { 
        console.log("Token no encontrado o expirado al cargar. Redirigiendo a login.");
      }
      localStorage.removeItem("spotify_access_token");
      localStorage.removeItem("spotify_token_expiry");
      localStorage.removeItem("spotify_refresh_token");
      delete axios.defaults.headers.common["Authorization"];
    
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/callback") {
        navigate("/login", { replace: true });
      }
    } else {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      console.log("Token encontrado y configurado para Axios.");

      axios.get("https://api.spotify.com/v1/me")
        .then(response => {
          const name = response.data.display_name || "User";
          setUsername(name);
        })
        .catch(err => {
          console.error("Error al obtener el perfil del usuario:", err);
        });
    }

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <div className="app-container">
      {isLoading && <LoadingScreen text="Tuning Synthify..." />}
      
      <img src={background} alt="Fondo animado de la aplicación" className='background' />
      <header>
        <img src={title} alt="Título de la aplicación Synthify" className='title' />
        {username && <h2 className='welcome-text'>Welcome!! {username}</h2>}
      </header>
      
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/callback' element={<Callback />}/>
          <Route path="/" element={<SearchArtist />} />
          <Route path="/artist/:id" element={<ArtistInfo />} />
          <Route path="/album/:id" element={<AlbumInfo />} />
        </Routes>
      </main>
      
      <footer>
          <a href="https://github.com/chafitita" target="_blank"><svg className='github-icon' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100"><path fill="currentColor" fillRule="evenodd" d="M49.998 11.963C28.461 11.963 11 29.425 11 50.965c0 17.231 11.172 31.849 26.671 37.003c1.952.361 2.662-.84 2.662-1.877c0-.924-.034-3.375-.051-6.633c-10.849 2.359-13.138-5.229-13.138-5.229c-1.774-4.505-4.331-5.703-4.331-5.703c-3.541-2.418.269-2.371.269-2.371c3.914.277 5.974 4.018 5.974 4.018c3.478 5.96 9.129 4.235 11.35 3.243c.353-2.525 1.363-4.24 2.476-5.217c-8.659-.984-17.763-4.33-17.763-19.274c0-4.259 1.519-7.741 4.013-10.468c-.399-.982-1.74-4.947.383-10.319c0 0 3.274-1.048 10.726 4.001c3.109-.869 6.446-1.303 9.763-1.316c3.312.014 6.65.447 9.763 1.316c7.447-5.049 10.716-4.001 10.716-4.001c2.128 5.372.788 9.337.388 10.319c2.5 2.727 4.008 6.209 4.008 10.468c0 14.979-9.117 18.279-17.805 19.241c1.398 1.205 2.646 3.59 2.646 7.229c0 5.211-.047 9.416-.047 10.695c0 1.045.701 2.26 2.681 1.873C77.836 82.798 89 68.191 89 50.965c0-21.54-17.461-39.002-39.002-39.002" clipRule="evenodd"/></svg></a>
          <a href="https://github.com/MateoCQ" target="_blank"><svg className='github-icon' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100"><path fill="currentColor" fillRule="evenodd" d="M49.998 11.963C28.461 11.963 11 29.425 11 50.965c0 17.231 11.172 31.849 26.671 37.003c1.952.361 2.662-.84 2.662-1.877c0-.924-.034-3.375-.051-6.633c-10.849 2.359-13.138-5.229-13.138-5.229c-1.774-4.505-4.331-5.703-4.331-5.703c-3.541-2.418.269-2.371.269-2.371c3.914.277 5.974 4.018 5.974 4.018c3.478 5.96 9.129 4.235 11.35 3.243c.353-2.525 1.363-4.24 2.476-5.217c-8.659-.984-17.763-4.33-17.763-19.274c0-4.259 1.519-7.741 4.013-10.468c-.399-.982-1.74-4.947.383-10.319c0 0 3.274-1.048 10.726 4.001c3.109-.869 6.446-1.303 9.763-1.316c3.312.014 6.65.447 9.763 1.316c7.447-5.049 10.716-4.001 10.716-4.001c2.128 5.372.788 9.337.388 10.319c2.5 2.727 4.008 6.209 4.008 10.468c0 14.979-9.117 18.279-17.805 19.241c1.398 1.205 2.646 3.59 2.646 7.229c0 5.211-.047 9.416-.047 10.695c0 1.045.701 2.26 2.681 1.873C77.836 82.798 89 68.191 89 50.965c0-21.54-17.461-39.002-39.002-39.002" clipRule="evenodd"/></svg></a>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
