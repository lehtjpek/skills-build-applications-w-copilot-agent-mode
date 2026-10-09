import { Router } from 'express'
import Leaderboard from '../models/Leaderboard'

const leaderboardRouter = Router()

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId', 'name email')
      .populate('teamId', 'name city')
      .sort({ rank: 1 })
      .lean()

    response.json({ leaderboard })
  } catch (error) {
    next(error)
  }
})

export default leaderboardRouter