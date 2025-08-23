// Basic usage example
import Gremllm from './src/index';

export function App() {
  return (
    <div>
      <h1>My App</h1>
      
      {/* At build time, this becomes a real calculator component */}
      <Gremllm prompt="A simple calculator with buttons for +, -, *, / and a display" />
      
      {/* At build time, this becomes a real todo list component */}  
      <Gremllm prompt="A todo list where you can add and remove items" />
      
      {/* At build time, this becomes a real color picker component */}
      <Gremllm prompt="A color picker that shows the selected color" />
    </div>
  );
}

export default App;