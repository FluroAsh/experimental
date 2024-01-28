import { wait } from '../../utils'

async function ServerComponent() {
  const data: any = await new Promise(async (resolve) => {
    await wait(2000)
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    resolve(res.json())
  })

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold tracking-wide text-red-200">React Server Component</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default ServerComponent
