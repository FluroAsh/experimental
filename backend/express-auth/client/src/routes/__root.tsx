import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import type { AuthContext } from '../lib/auth'

type RootRouterContext = {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<RootRouterContext>()({
  component: () => (
    <>
      <TanStackRouterDevtools initialIsOpen={false} />
      <Outlet />
    </>
  )
})
