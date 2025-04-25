import { useState } from 'react'
import background from './assets/background-op3.gif'
import title from './assets/Synthify-25-4-2025.png'
import './css/App.css'

function App() {

  return (
    <>
      <body>
        <img src={background} alt="fondo" className='background'/>
        <header>
          <img src={title} alt="title" className='title'/>
        </header>
      </body>
    </>
  )
}

export default App
