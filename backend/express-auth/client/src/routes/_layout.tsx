import { createFileRoute } from '@tanstack/react-router'
import LayoutComponent from '../components/Layout'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent
})
