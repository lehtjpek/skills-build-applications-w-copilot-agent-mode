import { Router } from 'express'
import User from '../models/User'

const usersRouter = Router()

usersRouter.get('/', async (_request, response, next) => {
  try {
    const users = await User.find().populate('teamId', 'name city focus').sort({ name: 1 }).lean()
    response.json({ users })
  } catch (error) {
    next(error)
  }
})

export default usersRouter