import { createFileRoute } from '@tanstack/react-router'
import Register from '../../components/register'

export const Route = createFileRoute('/_layout/register')({
  component: () => <Register />
})
