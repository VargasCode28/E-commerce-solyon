import { defineEventHandler, readBody, createError } from 'h3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDb } from '../../db/mongodb'

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event)

  const db = await connectDb()

  const exists = await db.collection('users').findOne({ email })

  if (exists) {
    throw createError({ statusCode: 400, message: 'Usuario ya existe' })
  }

  const hash = await bcrypt.hash(password, 10)

  const result = await db.collection('users').insertOne({
    name,
    email,
    password: hash,
  })

  const config = useRuntimeConfig()

  const token = jwt.sign(
    {
      id: result.insertedId.toString(),
      email,
      name,
    },
    config.jwtSecret,
    { expiresIn: '1h' }
  )

  return {
    token,
    user: {
      id: result.insertedId.toString(),
      email,
      name,
    },
  }
})