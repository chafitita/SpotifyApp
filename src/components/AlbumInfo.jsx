import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import { TrackList } from "./TrackList";

export function AlbumInfo(){
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const navigate = useNavigate()
    const [album, setAlbum] = useState(null)
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get(`https://api.spotify.com/v1/albums/${id}`)
          .then((albumResponse) => {
            setAlbum(albumResponse.data)
            return axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`)
          })
          .then((tracksResponse) => {
            const sortedTracks = tracksResponse.data.items.sort((a, b) => a.track_number - b.track_number);
            setTracks(sortedTracks);
          })
          .catch((error) => {
            console.error("Error al obtener datos del album o de las canciones")
          })
          .finally(() => {
            setLoading(false)
          })
    },[id])

    if (loading){
        return <LoadingScreen text="Searching..."/>
    }

    const artistNames = album.artists?.map(artist=>artist.name).join(", ") ||  "Artista desconocido"

    return(
        <div className="album-info-container">
            <div className="btn-container">
                <button onClick={ () => navigate(-1)} className="back-btn">
                    Back
                </button>
            </div>  
            <h2>{artistNames}</h2>
            <h2>{album.name}</h2>
            <div className="track-list">
                <TrackList tracks={tracks}/>
            </div>
        </div>
    )
}