import './config/database'
import app from './app'

const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`)
  console.log(`API base URL: ${apiBaseUrl}`)
})