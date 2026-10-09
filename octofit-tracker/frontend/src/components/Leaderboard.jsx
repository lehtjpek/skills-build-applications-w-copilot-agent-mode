import { useEffect, useState } from 'react'
import { apiBaseUrl, getCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Rank', value: (row) => row.rank },
  { label: 'Athlete', value: (row) => row.userId || row.user || row.name },
  { label: 'Team', value: (row) => row.teamId || row.team },
  { label: 'Points', value: (row) => row.points ?? row.score },
]

export default function Leaderboard() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${apiBaseUrl}/api/leaderboard/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        return response.json()
      })
      .then((payload) => setRows(getCollection(payload, 'leaderboard')))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('The leaderboard could not be loaded. Check the API connection and try again.')
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  return <ResourceTable title="Leaderboard" description="See how athletes and teams are progressing." rows={rows} columns={columns} loading={loading} error={error} />
}