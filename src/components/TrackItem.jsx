export function TrackItem({track}){
    const formatDuration = (ms) => {
        const seconds = Math.floor(ms / 1000)
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    return(
        <div className="track-item-container">
            <h2>{track.name}</h2>
            <p>Duración: {formatDuration(track.duration_ms)}</p>
            {/* <audio controls src={track.preview_url}/> */}
        </div>
    )
}