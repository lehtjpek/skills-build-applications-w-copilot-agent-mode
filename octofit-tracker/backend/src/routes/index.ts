import { Router } from 'express'
import activitiesRouter from './activities'
import leaderboardRouter from './leaderboard'
import teamsRouter from './teams'
import usersRouter from './users'
import workoutsRouter from './workouts'

const apiRouter = Router()

apiRouter.get('/', (_request, response) => {
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

apiRouter.use('/users', usersRouter)
apiRouter.use('/teams', teamsRouter)
apiRouter.use('/activities', activitiesRouter)
apiRouter.use('/leaderboard', leaderboardRouter)
apiRouter.use('/workouts', workoutsRouter)

export default apiRouter