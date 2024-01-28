// import { useEffect, useState } from 'react'
import './App.css'
import { FriendForm } from './components/friend-form'
import { FriendsList } from './components/friends-list'
import { db } from './lib/db'
import { useLiveQuery } from 'dexie-react-hooks'

// https://dexie.org/docs/Tutorial/React

function App() {
  const friends = useLiveQuery(() => db.friends.toArray(), [])
  if (!friends) return null

  return (
    <>
      <FriendForm defaultAge={18} />
      <FriendsList friends={friends} />
    </>
  )
}

export default App
