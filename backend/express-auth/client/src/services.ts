import Cookies from 'js-cookie'

export const fetchUserDetails = async (
  username: string
): Promise<{
  username: string
  firstName: string
  lastName: string
}> => {
  const res = await fetch(`http://localhost:3000/user/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${Cookies.get('jwt')}`
    },
    credentials: 'include'
  })

  if (!res.ok) throw new Error('Failed to fetch User Details.')

  return await res.json()
}
