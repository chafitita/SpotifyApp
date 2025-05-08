import React from 'react'

export function TrackItem({topTrack}){
  return (
    <div className='track-item'>
        <h2>{topTrack.name}</h2>
    </div>
  )
}
