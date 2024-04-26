export type User = {
  id: number
  username: string
  password: string
  role: 'user' | 'admin' | 'guest'
}

const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password',
    role: 'user'
  },
  {
    id: 2,
    username: 'janesmith',
    password: 'password',
    role: 'admin'
  }
] satisfies User[]
