import { useEffect, useState } from 'react'
import { apiBaseUrl, getCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Team', value: (row) => row.name },
  { label: 'Members', value: (row) => Array.isArray(row.members) ? row.members.length : row.memberCount },
  { label: 'Points', value: (row) => row.points ?? row.score },
  { label: 'Created', value: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : null },
]

export default function Teams() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${apiBaseUrl}/api/teams/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        return response.json()
      })
      .then((payload) => setRows(getCollection(payload, 'teams')))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('Teams could not be loaded. Check the API connection and try again.')
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  return <ResourceTable title="Teams" description="Find the groups training together." rows={rows} columns={columns} loading={loading} error={error} />
}