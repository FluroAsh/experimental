import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'

import { createUser, findUser, validateUser } from './user.model'

const generateToken = (username: string) => jwt.sign({ username }, process.env.TOKEN_SECRET!, { expiresIn: '1800s' })

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const token = authorization && authorization.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Unauthorized.' })

  jwt.verify(token, process.env.TOKEN_SECRET!, (err: unknown, user: any) => {
    if (err) return res.status(401).json({ message: 'Unauthorized.' })
    req.user = user
    next()
  })
}

const register = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body

  const hasRequiredFields = [username, password, firstName, lastName].every(
    (field) => field !== undefined && field !== null
  )

  try {
    if (!hasRequiredFields) {
      throw new Error('Incomplete credentials provided.')
    }

    const token = generateToken(username)
    const [user] = await createUser(username, password, firstName, lastName)

    res.cookie('jwt', token)

    return res.status(201).json({
      message: 'User created successfully.',
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      token
    })
  } catch (e) {
    if (e instanceof Error) {
      return res.status(422).json({ message: e.message })
    }
    return res.status(500).json({ message: 'Error creating user.' })
  }
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  console.log(chalk.bgWhite.black(`[server]: User "${username}" is trying to login`))

  try {
    const isValidUser = await validateUser(username, password)

    if (!isValidUser) {
      throw new Error('No matching credentials.')
    }

    const token = generateToken(username)
    res.cookie('jwt', token)

    return res.status(200).json({ message: 'Logged in succesfully.' })
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message })
    }
  }
}

/* ----- HTTP Methods ----- */
const POST = {
  register,
  login
}

const GET = async (req: Request, res: Response) => {
  const { id } = req.params
  const [user] = await findUser(id, 'id')

  if (!user) return res.status(404).json({ message: 'User not found.' })
  return res.status(200).json(user)
}

export { POST, GET, authenticateToken }
