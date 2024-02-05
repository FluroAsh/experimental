'use client'

import { useState } from 'react'

function ClientComponent() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <p className="text-xl text-amber-500 pb-4">{count}</p>
      <div className="flex flex-col gap-2">
        <button
          className="w-52 h-20 rounded-lg shadow-lg border-green-300 border-4 bg-green-500 text-bold active:scale-110 transition-all"
          onClick={() => setCount((c) => c + 1)}
        >
          Increment
        </button>
        <button
          className="w-52 h-20 rounded-lg shadow-lg border-red-300 border-4 bg-red-500 text-bold active:scale-110 transition-all"
          onClick={() => setCount((c) => (c === 0 ? 0 : c - 1))}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default ClientComponent
