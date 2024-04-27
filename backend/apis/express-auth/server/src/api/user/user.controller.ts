import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

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
    if (err) return res.send('Forbidden').status(403)
    req.user = user
    next()
  })
}

// TODO:
// 1. Create a user in a database
// 2. Store the token in a client-side cookie (`HttpOnly` & `SameSite=Lax`)
const register = (req: Request, res: Response) => {
  const { username } = req.body

  if (!username) {
    return res.send('Invalid Details').status(422)
  }

  // Create a new "user" in the database
  // - If the user already exists handle the error

  // Store the token in a cookie
  const token = generateToken(username)

  return res
    .json({
      message: 'Succesfully created a new user!',
      token
    })
    .status(201)
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
