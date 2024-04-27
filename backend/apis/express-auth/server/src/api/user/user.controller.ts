import { NextFunction, Request, Response } from 'express'

const generateToken = (username: string) => {
  // Create a signed JWT token
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  console.log({ authorization })

  // const { email, password } = req.body
  // console.log({ email, password })

  // check bearer token

  // if null return 401 (unauthenticated)

  // if valid, verify the JWT
  // - if valid token, assign req.user the user data
  // - if invalid token, return 403 (forbidden)

  next()
}

const register = (_req: Request, res: Response) => {
  return res
    .json({
      message: 'Succesfully created a new user!'
    })
    .status(201)
}

const login = (_req: Request, res: Response) => {
  return res
    .json({
      message: 'Succesfully logged in!'
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

export { POST, GET, authenticateToken, generateToken }
