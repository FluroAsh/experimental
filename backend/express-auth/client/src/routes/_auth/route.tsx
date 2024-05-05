import { createFileRoute, redirect } from '@tanstack/react-router'
import LayoutComponent from '../../components/Layout'
import { isValidJWT } from '../../helpers'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ location }) => {
    const jwt = Cookies.get('jwt')
    const decoded = jwt ? jwtDecode<{ username: string }>(jwt) : null

    if (!isValidJWT(decoded?.username)) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: LayoutComponent
})
