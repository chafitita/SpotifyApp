import { ArtistItem } from "./ArtistItem";
import '../css/ArtistList.css'

export function ArtistList({artists}){
    return(
        <div className="artist-list-container">
            <ul className="artist-list">
                {artists.map((artist) => (
                    <li className="artist-li" key = {artist.id}>
                        <ArtistItem artist={artist}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}