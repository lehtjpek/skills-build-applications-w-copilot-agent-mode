import { useEffect, useState } from 'react'
import { apiBaseUrl, getCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Athlete', value: (row) => row.userId },
  { label: 'Activity', value: (row) => row.type },
  { label: 'Duration', value: (row) => row.durationMinutes == null ? null : `${row.durationMinutes} min` },
  { label: 'Calories', value: (row) => row.caloriesBurned },
  { label: 'Date', value: (row) => row.activityDate ? new Date(row.activityDate).toLocaleDateString() : null },
]

export default function Activities() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${apiBaseUrl}/api/activities/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        return response.json()
      })
      .then((payload) => setRows(getCollection(payload, 'activities')))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('Activities could not be loaded. Check the API connection and try again.')
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  return <ResourceTable title="Activities" description="Recent training logged by your community." rows={rows} columns={columns} loading={loading} error={error} />
}