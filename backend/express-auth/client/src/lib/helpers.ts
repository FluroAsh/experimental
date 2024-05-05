import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

export function validateJWT(username?: string): {
  isValidJWT: boolean
  username: string | null
} {
  const jwt = Cookies.get('jwt')
  const decoded = jwt ? jwtDecode<{ username: string }>(jwt) : null

  return {
    isValidJWT: jwt !== undefined && decoded !== null && decoded.username === username,
    username: decoded?.username ?? null
  }
}
