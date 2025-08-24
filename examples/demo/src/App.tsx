import { useState } from 'react'
import { Gremllm } from '../../../dist/Gremllm.js'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
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
      <h1>Gremllm Vite React Demo</h1>

      {/* Gremllm generated components */}
      <div style={{ margin: '1rem 0', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <div style={{ margin: '1.5rem 0', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <pre style={{ backgroundColor: '#2d3748', color: '#e2e8f0', padding: '0.75rem', borderRadius: '4px', margin: '0 0 1rem 0', overflow: 'auto', fontSize: '12px', fontFamily: 'Monaco, Consolas, "Liberation Mono", monospace', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            <code>&lt;Gremllm prompt="A simple calculator with buttons for +, -, *, / and a display, monospaced font. Orange buttons" /&gt;</code>
          </pre>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Gremllm prompt="A simple calculator with buttons for +, -, *, / and a display, monospaced font. Orange buttons" />
          </div>
        </div>
        
        <div style={{ margin: '1.5rem 0', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <pre style={{ backgroundColor: '#2d3748', color: '#e2e8f0', padding: '0.75rem', borderRadius: '4px', margin: '0 0 1rem 0', overflow: 'auto', fontSize: '12px', fontFamily: 'Monaco, Consolas, "Liberation Mono", monospace', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            <code>&lt;Gremllm prompt="A todo list where you can add and remove items" /&gt;</code>
          </pre>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Gremllm prompt="A todo list where you can add and remove items" />
          </div>
        </div>
        
        <div style={{ margin: '1.5rem 0', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <pre style={{ backgroundColor: '#2d3748', color: '#e2e8f0', padding: '0.75rem', borderRadius: '4px', margin: '0 0 1rem 0', overflow: 'auto', fontSize: '12px', fontFamily: 'Monaco, Consolas, "Liberation Mono", monospace', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            <code>&lt;Gremllm prompt="A color picker that shows the selected color" /&gt;</code>
          </pre>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Gremllm prompt="A color picker that shows the selected color" />
          </div>
        </div>
        
        <div style={{ margin: '1.5rem 0', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <pre style={{ backgroundColor: '#2d3748', color: '#e2e8f0', padding: '0.75rem', borderRadius: '4px', margin: '0 0 1rem 0', overflow: 'auto', fontSize: '12px', fontFamily: 'Monaco, Consolas, "Liberation Mono", monospace', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            <code>&lt;Gremllm prompt="A timer that counts down from 60 seconds with start/stop buttons" /&gt;</code>
          </pre>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Gremllm prompt="A timer that counts down from 60 seconds with start/stop buttons" />
          </div>
        </div>
      </div>

      <p className="read-the-docs">
        The components above are generated at build time by AI based on the prompts!
      </p>
    </>
  )
}

export default App
