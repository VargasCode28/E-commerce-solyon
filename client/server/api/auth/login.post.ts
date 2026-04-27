import { defineEventHandler, readBody, createError } from 'h3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDb } from '../../db/mongodb'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const db = await connectDb()
  const user = await db.collection('users').findOne({ email })

  if (!user) {
    throw createError({ statusCode: 400, message: 'Usuario no encontrado' })
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    throw createError({ statusCode: 400, message: 'Contraseña incorrecta' })
  }

  const config = useRuntimeConfig()

  const token = jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    config.jwtSecret,
    { expiresIn: '1h' }
  )

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
  }
})