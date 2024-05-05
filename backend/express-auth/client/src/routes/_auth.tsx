import { createFileRoute } from '@tanstack/react-router'
import LayoutComponent from '../components/Layout'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    // TODO: Fix this route so it's actually checking for auth lmao
  },
  component: LayoutComponent
})
