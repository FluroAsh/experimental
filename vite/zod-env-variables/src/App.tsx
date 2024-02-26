import './App.css'

import env from './schemas/clientEnvSchema'

function App() {
  return (
    <div>
      <h1>Clientside Variables</h1>
      <pre>{JSON.stringify(env, null, 2)}</pre>
    </div>
  )
}

export default App
