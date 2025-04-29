import '../css/AlbumItem.css'

export function AlbumItem({album}){
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/2/26/512px_album_cover_placeholder.png';
    const albumImage = album.images?.length > 0 ? album.images[0].url : defaultImage;

    return(
        <div className="album-item-container">
            <img src={albumImage} alt={album.name} className="album-img"/>
            <h2>{album.name}</h2>
            <p>Año: {album.release_date ? album.release_date.split("-")[0] : "Desconocido"}</p>
        </div>
    )
}