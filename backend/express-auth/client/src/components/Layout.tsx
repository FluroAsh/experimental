import { Outlet } from '@tanstack/react-router'

export default function LayoutComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Outlet />
    </div>
  )
}
