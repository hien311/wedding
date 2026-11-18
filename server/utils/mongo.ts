import { MongoClient, type Db } from 'mongodb'

let client: MongoClient | null = null
let db: Db | null = null

export async function getDb() {
  const config = useRuntimeConfig()
  const uri = config.mongodbUri

  if (!uri) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Thiếu MONGODB_URI trong biến môi trường.',
    })
  }

  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db()
  }

  if (!db) {
    db = client.db()
  }

  return db
}
