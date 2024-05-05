import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/register')({
  component: () => <Register />
})

function Register() {
  const navigate = Route.useNavigate()

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    try {
      // Handle form data
      const formData = new FormData(evt.currentTarget)
      const data = Object.fromEntries(formData.entries())

      // Handle fetch
      const res = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        throw new Error(`Failed to login with status ${res.status}`)
      }

      navigate({
        params: { username: data.username.toString() },
        to: '/details/$username'
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
          <p className="text-xs">Register today to start storing your user details!</p>
          <div className="w-full h-[2px] bg-neutral-300 rounded-full mt-4" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold text-xs mb-[2px]">
            First Name
          </label>
          <input
            name="firstName"
            autoComplete="none"
            className="p-1 pl-2 rounded-sm text-neutral-900 bg-neutral-400 focus:bg-neutral-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold text-xs mb-[2px]">
            Last Name
          </label>
          <input
            name="lastName"
            autoComplete="none"
            className="p-1 pl-2 rounded-sm text-neutral-900 bg-neutral-400 focus:bg-neutral-300"
          />
        </div>

        <div className="flex flex-col min-w-[250px]">
          <label htmlFor="username" className="font-bold text-xs mb-[2px]">
            Username
          </label>
          <input
            type="text"
            name="username"
            autoComplete="off"
            className="p-1 pl-2 rounded-sm text-neutral-900 bg-neutral-400 focus:bg-neutral-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold text-xs mb-[2px]">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className="p-1 pl-2 rounded-sm text-neutral-900 bg-neutral-400 focus:bg-neutral-300"
          />
        </div>

        <button
          type="submit"
          className="p-2 text-sm font-bold rounded-lg bg-sky-600 hover:bg-sky-500 focus:ring-sky-300 "
        >
          Submit
        </button>

        <div className="text-sm">
          <span className="pr-1 text-neutral-300">Already have an account?</span>
          <Link to="/login" className="font-bold text-neutral-400 hover:text-neutral-200">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}
