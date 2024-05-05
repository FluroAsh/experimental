import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // Redirect users to the login page by default
    throw redirect({
      to: '/login'
    })
  }
})
