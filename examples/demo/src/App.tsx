import { useState } from 'react'
import Gremllm from '../../../src/index'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Gremllm React Demo</h1>
      
      {/* Original counter for comparison */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Original count is {count}
        </button>
      </div>

      {/* Gremllm generated components */}
      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Gremllm Generated Components:</h2>
        
        <Gremllm prompt="A simple calculator with buttons for +, -, *, / and a display" />
        
        <Gremllm prompt="A todo list where you can add and remove items" />
        
        <Gremllm prompt="A color picker that shows the selected color" />
        
        <Gremllm prompt="A timer that counts down from 60 seconds with start/stop buttons" />
      </div>

      <p className="read-the-docs">
        The components above are generated at build time by AI based on the prompts!
      </p>
    </>
  )
}

export default App
