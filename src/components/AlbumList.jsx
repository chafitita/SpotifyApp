import { AlbumItem } from "./AlbumItem";

export function AlbumList({albums}){
    return(
        <div className="album-list-container">
            <ul className="album-list">
                {albums.map((album) => (
                    <li key = {album.id}>
                        <AlbumItem album={album}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}