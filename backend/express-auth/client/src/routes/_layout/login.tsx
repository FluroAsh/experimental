import { createFileRoute, Link, useRouter, useRouterState } from '@tanstack/react-router'

import FormField from '../../components/form-field'

export const Route = createFileRoute('/_layout/login')({
  component: () => <Login />
})

function Login() {
  const router = useRouter()
  const navigate = Route.useNavigate()
  const isLoading = useRouterState({ select: (s) => s.isLoading })

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    console.log('Submitted')

    try {
      // Handle form data
      const formData = new FormData(evt.currentTarget)
      const data = Object.fromEntries(formData.entries())

      // Handle fetch
      const res = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        throw new Error(`Failed to login with status ${res.status}`)
      }

      const username = data.username.toString()

      router.invalidate().finally(() => {
        navigate({
          params: { username: username },
          to: '/user/$username'
        })
      })
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  return (
    <div>
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col gap-4 w-[350px] p-6 border rounded-lg shadow-lg bg-neutral-900 border-neutral-600"
      >
        <div>
          <p className="text-lg font-bold">Sign In</p>
          <p className="text-xs">Login to view all your stored details!</p>
          <div className="w-full h-[2px] bg-neutral-300 rounded-full mt-4" />
        </div>

        <FormField name="username" label="Username" autoComplete="off" />
        <FormField name="password" label="Password" type="password" autoComplete="off" />

        <button
          type="submit"
          className="p-2 text-sm font-bold rounded-lg bg-sky-600 hover:bg-sky-500 focus:ring-sky-300"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>

        <div className="text-sm">
          <span className="pr-1 text-neutral-300">Don't have an account?</span>
          <Link to="/register" className="font-bold text-neutral-400 hover:text-neutral-200">
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}
