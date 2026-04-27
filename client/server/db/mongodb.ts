import { MongoClient } from 'mongodb'

let client: MongoClient | null = null
let db: any = null

export const connectDb = async () => {
  const config = useRuntimeConfig()

  if (!config.mongoUri) {
    throw new Error('MONGO_URI no está definido')
  }

  if (!client) {
    client = new MongoClient(config.mongoUri)
  }

  if (db) return db

  await client.connect()
  db = client.db('E-commerce-solyon')

  console.log('MongoDB connected')
  return db
}