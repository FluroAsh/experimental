import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent
})

function LayoutComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Outlet />
    </div>
  )
}
