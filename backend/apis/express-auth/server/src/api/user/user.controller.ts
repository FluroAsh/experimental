import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { createUser } from './user.models'

const getTokenSecret = () => {
  const tokenSecret = process.env.TOKEN_SECRET
  if (!tokenSecret) throw new Error('A token was attempted to be generated without a secret!')
  return tokenSecret
}

const generateToken = (username: string) => {
  const TOKEN_SECRET = getTokenSecret()
  return jwt.sign({ username }, TOKEN_SECRET, { expiresIn: '1800s' })
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const token = authorization && authorization.split(' ')[1]

  if (!token) return res.send('Unauthorized').status(401)
  const TOKEN_SECRET = getTokenSecret()

  jwt.verify(token, TOKEN_SECRET, (err: unknown, user: any) => {
    if (err) return res.send('Unauthorized').status(401)
    req.user = user
    next()
  })
}

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.send('Invalid Details').status(422)
  }

  try {
    const token = generateToken(username)
    const [user] = await createUser(username, password)

    res.cookie('jwt', token)

    return res
      .json({
        message: 'User created successfully',
        username: user.username,
        password: user.password,
        token
      })
      .status(201)
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.send(e.message).status(422)
    }
    return res.send('Error creating user').status(500)
  }
}

// TODO:
// 1. Locate the created user in the database
// 2. Validate the users credentials match
// -  If the user does not exist, return a 404 (not found)
// -  If the user exists, return a 200 (OK)
const login = (req: Request, res: Response) => {
  const { username, password } = req.body
  console.log({ username, password })

  // Locate User in DB

  // Validate
  // - Compare password with stored password

  // Generate & store JWT token

  // Set the token as a client-side cookie

  // Return 200 (OK) status
  return res
    .json({
      message: 'Succesfully logged in!',
      user: req.user
    })
    .status(200)
}

/* ----- HTTP Methods ----- */
const POST = {
  register,
  login
}

const GET = (req: Request, res: Response) => {
  return res
    .json({
      firstName: 'Ashley',
      lastName: 'Thompson'
    })
    .status(200)
}

export { POST, GET, authenticateToken }
