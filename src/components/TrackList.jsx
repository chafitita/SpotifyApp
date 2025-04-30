import { TrackItem } from "./TrackItem.jsx"
export function TrackList({tracks}){
    return(
        <div className="track-list-container">
            <ul className="track-list">
                {tracks.map((track) => (
                    <li key = {track.id} className="track-li">
                        <TrackItem track={track}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}