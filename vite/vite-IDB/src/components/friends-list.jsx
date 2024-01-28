import PropTypes from 'prop-types'

export const FriendsList = ({ friends }) => {
  return friends.length > 0 ? (
    <div>
      <h2>Your Friends!</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {friend.name} is {friend.age} years old
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No friends yet 🥺</p>
  )
}

FriendsList.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired
    })
  )
}
