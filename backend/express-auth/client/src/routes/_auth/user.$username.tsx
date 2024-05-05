import { createFileRoute, useRouter } from '@tanstack/react-router'

import { fetchUserDetails } from '../../lib/services'

export const Route = createFileRoute('/_auth/user/$username')({
  loader: async ({ params: { username } }) => ({
    user: await fetchUserDetails(username)
  }),
  component: DetailsComponent
})

function DetailsComponent() {
  const router = useRouter()
  const { user } = Route.useLoaderData()
  const navigate = Route.useNavigate()

  if (!user) return <p>No data...</p>

  const { username, firstName, lastName } = user

  const handleLogout = () => {
    router.invalidate().finally(() => {
      navigate({ to: '/login' })
    })
  }

  return (
    <div className="flex flex-col p-6 rounded-lg shadow-lg bg-slate-900 w-[300px] border border-sky-800">
      <h1 className="font-bold">
        Welcome <span className="underline underline-offset-2">{firstName}!</span>
      </h1>

      <div className="self-center pt-6 min-w-[200px] text-sm">
        <div>
          <span className="font-bold">Username&#58;</span>
          <pre className="inline-block pl-1">{username}</pre>
        </div>
        <div>
          <span className="font-bold">First Name&#58;</span>
          <pre className="inline-block pl-1">{firstName}</pre>
        </div>
        <div>
          <span className="font-bold">Last Name&#58;</span>
          <pre className="inline-block pl-1">{lastName}</pre>
        </div>
      </div>

      <button
        type="button"
        className="p-2 mt-4 text-sm font-bold rounded-lg bg-sky-600 hover:bg-sky-500 focus:ring-sky-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}
