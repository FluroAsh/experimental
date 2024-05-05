import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'

import { routeTree } from './routeTree.gen' // Import the generated route tree
import { AuthProvider, useAuth } from './lib/auth'

const router = createRouter({ routeTree, context: { auth: undefined! } })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

export default function App() {
  // TODO: Fix the AuthProvider logic so it will actually
  // Allow us to check for Auth properly using Context. This doesn't
  // work right now, it will return false for the isAuthenticated user
  // by the time the `/_auth` route is hit.
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}
