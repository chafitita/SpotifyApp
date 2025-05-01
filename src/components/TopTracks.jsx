import React from 'react'
import { TrackItem } from './TrackItem'

export function TopTracks({topTracks}){
  return (
    <div className='TTracks-container'>
        <ul className='TTracks-list'>
            {topTracks.map((track) => (
                <li key={track.id} className='TTracks-li'>
                    <TrackItem track={track}/>
                </li>
            ))}
        </ul>
    </div>
  )
}
