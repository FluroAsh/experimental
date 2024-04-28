import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { createUser, findUser, validateUser } from './user.model'

const generateToken = (username: string) => jwt.sign({ username }, process.env.TOKEN_SECRET!, { expiresIn: '1800s' })

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const token = authorization && authorization.split(' ')[1]

  if (!token) return res.send('Unauthorized').status(401)

  jwt.verify(token, process.env.TOKEN_SECRET!, (err: unknown, user: any) => {
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
  } catch (e) {
    if (e instanceof Error) {
      return res.send(e.message).status(422)
    }
    return res.send('Error creating user').status(500)
  }
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const isValidUser = await validateUser(username, password)

    if (!isValidUser) {
      return res.send('Invalid login').status(404)
    }

    const token = generateToken(username)
    res.cookie('jwt', token)

    return res.json({ message: 'Logged in succesfully' }).status(200)
  } catch (e) {
    return res.send('Invalid login').status(404)
  }
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
