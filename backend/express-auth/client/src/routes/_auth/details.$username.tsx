import { createFileRoute } from '@tanstack/react-router'
import Cookies from 'js-cookie'

import { fetchUserDetails } from '../../services'

export const Route = createFileRoute('/_auth/details/$username')({
  component: DetailsComponent,
  loader: async ({ params: { username } }) => await fetchUserDetails(username),
  onError(err) {
    console.error(err)
  }
})

function DetailsComponent() {
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()

  if (!data) return <p>No data...</p>

  const { username, firstName, lastName } = data

  const handleLogout = async () => {
    Cookies.remove('jwt')
    navigate({
      to: '/login'
    })
  }

  return (
    <div className="flex flex-col p-6 rounded-lg shadow-lg bg-slate-900 w-[300px]">
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
        className="p-2 mt-4 text-sm font-bold rounded-lg bg-sky-600 hover:bg-sky-500 focus:ring-sky-300"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  )
}
