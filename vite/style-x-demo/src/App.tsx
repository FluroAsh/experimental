import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  main: {
    padding: 20,
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    lineHeight: 1.5,
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.87)',
    backgroundColor: '#242424',
    minHeight: '100vh'
  },
  container: {
    padding: 20,
    backgroundColor: 'red'
  },
  button: {
    alignSelf: 'center',
    padding: 5,
    border: '2px solid #1f1f1f',
    borderRadius: 15,
    minWidth: 50
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 5,
    textAlign: 'center'
  },
  card: {
    transition: '200ms ease',
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    backgroundColor: '#4976ca'
  },
  emphasized: {
    backgroundColor: 'green'
  }
})

function App() {
  const [count, setCount] = useState(0)

  const countIsTen = count >= 10

  return (
    <main {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.container)}>
        <h1>Some Heading</h1>
      </div>
      <h1>Vite + React + Stylex</h1>
      <div {...stylex.props(styles.card, countIsTen && styles.emphasized)}>
        Count
        <div {...stylex.props(styles.buttonContainer)}>
          <button {...stylex.props(styles.button)} onClick={() => setCount((count) => count + 1)}>
            +
          </button>
          <button
            {...stylex.props(styles.button)}
            onClick={() => setCount((count) => (count - 1 < 0 ? count : count - 1))}
          >
            -
          </button>
        </div>
        <div>count is {count}</div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </main>
  )
}

export default App
