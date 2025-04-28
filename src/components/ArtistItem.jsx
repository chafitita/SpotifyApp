import { Link } from "react-router-dom";

export function ArtistItem({artist}){
    const defaultImage = 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/large?v=v2&px=999'
    const artistImage = artist.images?.length > 0  ? artist.images[0].url : defaultImage
    return(
        <div className="artist-item-container">
            <Link to={`/artist/${artist.id}`}>
                <img src={artistImage} alt={artist.name} className="artist-img"/>
                <h2>{artist.name}</h2>
            </Link>
        </div>
    )
}
