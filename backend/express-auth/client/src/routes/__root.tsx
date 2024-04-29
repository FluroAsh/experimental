import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const navigate = Route.useNavigate()
  const pathname = Route.path

  // Hacky client-side way to redirect to `/login` after landing on the root path
  // Ideally this would be handled server-side for the purposes of this demo, but I'm lazy.
  useEffect(() => {
    if (pathname === '/') {
      navigate({
        from: '/',
        to: '/login'
      })
    }
  }, [pathname, navigate])

  return <Outlet />
}
