import { Router } from 'express'
import activitiesRouter from './activities'
import leaderboardRouter from './leaderboard'
import teamsRouter from './teams'
import usersRouter from './users'
import workoutsRouter from './workouts'

const router = Router()

router.get('/api', (_request, response) => {
	response.json({
		message: 'OctoFit Tracker API',
		resources: {
			users: '/api/users/',
			teams: '/api/teams/',
			activities: '/api/activities/',
			leaderboard: '/api/leaderboard/',
			workouts: '/api/workouts/',
		},
	})
})

router.use('/api/users/', usersRouter)
router.use('/api/teams/', teamsRouter)
router.use('/api/activities/', activitiesRouter)
router.use('/api/leaderboard/', leaderboardRouter)
router.use('/api/workouts/', workoutsRouter)

export default router