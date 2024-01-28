import PropTypes from 'prop-types'
import { useState } from 'react'
import { db, resetDatabase } from '../lib/db'

export const FriendForm = ({ defaultAge = 0 }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(defaultAge)

  // addFriend is called
  function handleSubmit(e) {
    e.preventDefault()

    // function to handle adding to IndexedDB
    db.friends.add({ name, age })
    setName('')
    setAge(defaultAge)

    console.log({ name, age: Number(age) })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="Name">Name</label>
        <input type="text" name="Name" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
      </div>

      <div className="form-field">
        <label htmlFor="Age">Age</label>
        <input
          type="number"
          name="Age"
          placeholder="Age"
          min={18}
          max={99}
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
      </div>

      <button type="submit">Add Friend</button>
      <button type="button" onClick={() => resetDatabase()}>
        Reset Database
      </button>
    </form>
  )
}

FriendForm.propTypes = {
  defaultAge: PropTypes.number
}
