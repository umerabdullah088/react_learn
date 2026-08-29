import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState("olive")

  return (
    <div className="container" style={{ background: color, height: '100vh' }}>

      <div className="bar">
        <div className="button_holder">

          <button style={{ background: "red" }} onClick={() => setColor("red")}>Red</button>

          <button style={{ background: "lavender" }} onClick={() => setColor("lavender")} >lavendar</button>
          <button style={{ background: "green" }} onClick={() => setColor("green")}>Green</button>
          <button style={{ background: "brown" }} onClick={() => setColor("brown")}>Brown</button>
          <button style={{ background: "yellow" }} onClick={() => setColor("yellow")}>Yellow</button>
          <button style={{ background: "blue" }} onClick={() => setColor("blue")}>blue</button>
          <button style={{ background: "cyan" }} onClick={() => setColor("cyan")}>Cyan</button>


        </div>
      </div>

    </div>
  )
}

export default App
