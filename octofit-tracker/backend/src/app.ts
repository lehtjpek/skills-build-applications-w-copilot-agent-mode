import express from 'express'
import cors from 'cors'
import { getApiBaseUrl } from './config/apiUrl'
import apiRouter from './routes'

const app = express()
const codespaceName = process.env.CODESPACE_NAME
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
])

app.use(cors({
  origin(origin, callback) {
    callback(null, !origin || allowedOrigins.has(origin))
  },
}))
app.use(express.json())

app.get('/', (_request, response) => {
  const apiBaseUrl = getApiBaseUrl()

  response.json({
    message: 'OctoFit Tracker API',
    apiBaseUrl,
    resources: {
      users: `${apiBaseUrl}/api/users/`,
      teams: `${apiBaseUrl}/api/teams/`,
      activities: `${apiBaseUrl}/api/activities/`,
      leaderboard: `${apiBaseUrl}/api/leaderboard/`,
      workouts: `${apiBaseUrl}/api/workouts/`,
    },
  })
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() })
})

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl: getApiBaseUrl() })
})

app.use(apiRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

export default app