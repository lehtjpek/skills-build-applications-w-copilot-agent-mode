import express from 'express'
import { getApiBaseUrl } from './config/apiUrl'
import apiRouter from './routes'

const app = express()

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() })
})

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl: getApiBaseUrl() })
})

app.use('/api', apiRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

export default app