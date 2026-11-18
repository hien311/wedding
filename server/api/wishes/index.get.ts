import { getDb } from '../../utils/mongo'

export default defineEventHandler(async () => {
  const db = await getDb()
  const wishes = await db
    .collection('wishes')
    .find({}, { projection: { name: 1, message: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray()

  return wishes.map((w) => ({
    id: String(w._id),
    name: w.name as string,
    message: w.message as string,
    createdAt: w.createdAt as Date,
  }))
})
