import { useEffect, useState } from 'react'
import { apiBaseUrl, getCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Workout', value: (row) => row.name || row.title },
  { label: 'Focus', value: (row) => row.type || row.category },
  { label: 'Duration', value: (row) => row.durationMinutes == null ? null : `${row.durationMinutes} min` },
  { label: 'Difficulty', value: (row) => row.difficulty },
]

export default function Workouts() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${apiBaseUrl}/api/workouts/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        return response.json()
      })
      .then((payload) => setRows(getCollection(payload, 'workouts')))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('Workouts could not be loaded. Check the API connection and try again.')
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  return <ResourceTable title="Workouts" description="Workout suggestions available to your community." rows={rows} columns={columns} loading={loading} error={error} />
}