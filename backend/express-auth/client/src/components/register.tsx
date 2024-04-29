import { Link } from '@tanstack/react-router'

export default function Register() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    console.log(data)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-neutral-900 p-6 rounded-lg shadow-lg border border-neutral-600"
      >
        <div>
          <p className="text-lg font-bold">Register</p>
          <div className="w-full h-[2px] bg-neutral-300 rounded-full mt-4" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="username" className="font-bold text-xs mb-[2px]">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="text-neutral-900 bg-neutral-400 rounded-sm focus:bg-neutral-300 p-1 pl-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="username" className="font-bold text-xs mb-[2px]">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="text-neutral-900 bg-neutral-400 rounded-sm focus:bg-neutral-300 p-1 pl-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="username" className="font-bold text-xs mb-[2px]">
            Username
          </label>
          <input
            type="text"
            name="username"
            autoComplete="off"
            className="text-neutral-900 bg-neutral-400 rounded-sm focus:bg-neutral-300 p-1 pl-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold text-xs mb-[2px]">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="text-neutral-900 bg-neutral-400 rounded-sm focus:bg-neutral-300 p-1 pl-2"
          />
        </div>

        <button
          type="submit"
          className="text-sm p-2 rounded-lg bg-sky-600 font-bold hover:bg-sky-500 focus:ring-sky-300 "
        >
          Submit
        </button>

        <Link to="/login" className="text-sm font-bold text-neutral-400 hover:text-neutral-200">
          Login
        </Link>
      </form>
    </div>
  )
}
