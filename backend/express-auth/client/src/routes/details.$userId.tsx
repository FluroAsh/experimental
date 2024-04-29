import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/details/$userId')({
  component: DetailsComponent
})

function DetailsComponent() {
  const { userId } = Route.useParams()

  return (
    <div>
      Hello /details!
      <p>User Id: {userId}</p>
    </div>
  )
}
