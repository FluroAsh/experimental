import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

export function isValidJWT(username: string | undefined): boolean {
  const jwt = Cookies.get('jwt')
  const decoded = jwt ? jwtDecode<{ username: string }>(jwt) : null
  return jwt !== undefined && decoded?.username === username
}
