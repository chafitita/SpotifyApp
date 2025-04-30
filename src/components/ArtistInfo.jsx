import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { use, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AlbumList } from "./AlbumList";
import LoadingScreen from "./LoadingScreen";
import '../css/ArtistInfo.css'

export function ArtistInfo(){
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const navigate = useNavigate()
    const [artist, setArtist] = useState(null)
    const [albums, setAlbums] = useState([])
    const [topTracks, setTopTracks] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get(`https://api.spotify.com/v1/artists/${id}`)
          .then((artistResponse) => {
            setArtist(artistResponse.data)
            return axios.get(`https://api.spotify.com/v1/artists/${id}/albums`)
          })
          .then((albumsResponse) => {
            setAlbums(albumsResponse.data.items)
          })
          .catch((error) => {
            console.error("Error al obtener datos del artista o de los albums")
          })
          .finally(() => {
            setLoading(false)
          })
    },[id])

    if (loading){
        return <LoadingScreen text="Searching..."/>
    }

    const defaultImage = 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/large?v=v2&px=999'
    const artistImage = artist?.images?.length > 0  ? artist.images[0].url : defaultImage

    return(
        <div className="artist-info-container">
          <div className="btn-container">
            
          </div>
            <button onClick={ () => navigate(-1)} className="back-btn">
                Back
            </button>
          <div className="artist-info">
              <img src={artistImage} alt={artist.name} className="artist-img"/>
              <h2>{artist.name}</h2>
          </div>
        <div className="album-list">
            {albums.length > 0 && <AlbumList albums={albums}/>}
        </div>
      </div>
    )
}