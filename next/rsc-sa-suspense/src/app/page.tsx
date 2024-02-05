import { Suspense } from 'react'

import ServerComponent from '../components/SlowComponent'
import ClientComponent from '../components/ClientComponent'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ClientComponent />
        <Suspense fallback={<div>Loading...</div>}>
          <ServerComponent />
        </Suspense>
      </div>
    </main>
  )
}
