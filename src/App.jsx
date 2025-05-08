import { useEffect, useState } from 'react'
import background from './assets/background-op3.gif'
import title from './assets/Synthify-25-4-2025.png'
import './css/App.css'
import LoadingScreen from './components/LoadingScreen'
import axios from 'axios'
import { data } from 'react-router-dom'
import { SearchArtist } from './components/SearchArtist'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ArtistInfo } from './components/ArtistInfo'
import { AlbumInfo } from './components/AlbumInfo'

function App() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

  function requestToken(){
    axios.post("https://accounts.spotify.com/api/token",
      {
        grant_type : "client_credentials",
        client_id : clientID,
        client_secret : clientSecret
      },
      {
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
        },
      })
      .then((data) =>{
        console.log("Token Obtenido")
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.data.access_token
      })
      .catch((error) => {
        console.log("Error de token")
      })
  }

  useEffect(() => {
    requestToken()
  },[])

  return (
    <Router>
      <div className="app-container">
        {/* {isLoading && <LoadingScreen text="Tuning Synthify..."/>} */}
        <img src={background} alt="background" className='background'/>
        <header>
          <img src={title} alt="title" className='title'/>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SearchArtist/>}/>
            <Route path="/artist/:id" element={<ArtistInfo/>}/>
            <Route path="/album/:id" element={<AlbumInfo/>}/>
          </Routes>
        </main>
        <footer>
          <a href="https://github.com/chafitita" target="_blank"><svg className='github-icon' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100"><path fill="currentColor" fillRule="evenodd" d="M49.998 11.963C28.461 11.963 11 29.425 11 50.965c0 17.231 11.172 31.849 26.671 37.003c1.952.361 2.662-.84 2.662-1.877c0-.924-.034-3.375-.051-6.633c-10.849 2.359-13.138-5.229-13.138-5.229c-1.774-4.505-4.331-5.703-4.331-5.703c-3.541-2.418.269-2.371.269-2.371c3.914.277 5.974 4.018 5.974 4.018c3.478 5.96 9.129 4.235 11.35 3.243c.353-2.525 1.363-4.24 2.476-5.217c-8.659-.984-17.763-4.33-17.763-19.274c0-4.259 1.519-7.741 4.013-10.468c-.399-.982-1.74-4.947.383-10.319c0 0 3.274-1.048 10.726 4.001c3.109-.869 6.446-1.303 9.763-1.316c3.312.014 6.65.447 9.763 1.316c7.447-5.049 10.716-4.001 10.716-4.001c2.128 5.372.788 9.337.388 10.319c2.5 2.727 4.008 6.209 4.008 10.468c0 14.979-9.117 18.279-17.805 19.241c1.398 1.205 2.646 3.59 2.646 7.229c0 5.211-.047 9.416-.047 10.695c0 1.045.701 2.26 2.681 1.873C77.836 82.798 89 68.191 89 50.965c0-21.54-17.461-39.002-39.002-39.002" clipRule="evenodd"/></svg></a>
          <a href="https://github.com/MateoCQ" target="_blank"><svg className='github-icon' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100"><path fill="currentColor" fillRule="evenodd" d="M49.998 11.963C28.461 11.963 11 29.425 11 50.965c0 17.231 11.172 31.849 26.671 37.003c1.952.361 2.662-.84 2.662-1.877c0-.924-.034-3.375-.051-6.633c-10.849 2.359-13.138-5.229-13.138-5.229c-1.774-4.505-4.331-5.703-4.331-5.703c-3.541-2.418.269-2.371.269-2.371c3.914.277 5.974 4.018 5.974 4.018c3.478 5.96 9.129 4.235 11.35 3.243c.353-2.525 1.363-4.24 2.476-5.217c-8.659-.984-17.763-4.33-17.763-19.274c0-4.259 1.519-7.741 4.013-10.468c-.399-.982-1.74-4.947.383-10.319c0 0 3.274-1.048 10.726 4.001c3.109-.869 6.446-1.303 9.763-1.316c3.312.014 6.65.447 9.763 1.316c7.447-5.049 10.716-4.001 10.716-4.001c2.128 5.372.788 9.337.388 10.319c2.5 2.727 4.008 6.209 4.008 10.468c0 14.979-9.117 18.279-17.805 19.241c1.398 1.205 2.646 3.59 2.646 7.229c0 5.211-.047 9.416-.047 10.695c0 1.045.701 2.26 2.681 1.873C77.836 82.798 89 68.191 89 50.965c0-21.54-17.461-39.002-39.002-39.002" clipRule="evenodd"/></svg></a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
