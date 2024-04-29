import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const navigate = Route.useNavigate()
  const pathname = Route.path

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
