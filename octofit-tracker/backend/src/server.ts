import './config/database'
import app from './app'
import { getApiBaseUrl } from './config/apiUrl'

const port = Number(process.env.PORT) || 8000

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`)
  console.log(`API base URL: ${getApiBaseUrl(port)}`)
})