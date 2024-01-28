import Dexie from 'dexie'

export const db = new Dexie('viteDatabase')
db.version(1).stores({
  friends: '++id, name, age' // Primary key and indexed props
})

db.on('populate', seedData)

async function seedData() {
  db.friends.bulkAdd([
    { name: 'Nicolas', age: 24 },
    { name: 'Javier', age: 25 }
  ])
}

export function resetDatabase() {
  return db.transaction('rw', db.friends, async () => {
    await db.friends.clear()
    await seedData()
  })
}
