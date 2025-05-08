import React from 'react'
import { TrackItem } from './TopTrackItem'
import '../css/TopTracks.css'

export function TopTracks({topTracks}){
  return (
    <div className='TTracks-container'>
        <ul className='TTracks-list'>
            {topTracks.map((track) => (
                <li key={track.id} className='TTracks-li'>
                    <TrackItem topTrack={track}/>
                </li>
            ))}
        </ul>
    </div>
  )
}
