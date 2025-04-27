import { ArtistItem } from "./ArtistItem";

export function ArtistList({artists}){
    return(
        <div className="artist-list-container">
            <ul className="artist-list">
                {artists.map((artist) => (
                    <li key = {artist.id}>
                        <ArtistItem artist={artist}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}