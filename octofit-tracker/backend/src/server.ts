import './config/database'
import app from './app'

const port = Number(process.env.PORT) || 8000

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`)
})