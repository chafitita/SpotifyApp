import { useState } from "react";
import axios from "axios";
import { ArtistList } from "./ArtistList";

export function SearchArtist(){
    const [query, setQuery] = useState("")
    const [artists, setArtists] = useState([])

    const handleSearch = async(event) => {
        event.preventDefault()
        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`)
            setArtists(response.data.artists.items)
        } catch(error) {
            console.error("Error al buscar")
            setArtists([])
        }
    }
    return(
        <div className="form-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder="Ingrese el nombre del artista"
                />
                <button type="submit">
                    Buscar
                </button>
            </form>

            {artists.length > 0 && <ArtistList artists={artists}/>}
        </div>
    )
}