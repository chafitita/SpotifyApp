import { AlbumItem } from "./AlbumItem";
import '../css/AlbumList.css'

export function AlbumList({albums}){
    return(
        <div className="album-list-container">
            <ul className="album-list">
                {albums.map((album) => (
                    <li key = {album.id} className="album-li">
                        <AlbumItem album={album}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}