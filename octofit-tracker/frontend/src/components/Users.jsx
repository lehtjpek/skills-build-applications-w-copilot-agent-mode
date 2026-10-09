import { useEffect, useState } from 'react'
import { apiBaseUrl, getCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Name', value: (row) => row.name },
  { label: 'Email', value: (row) => row.email },
  { label: 'Role', value: (row) => row.role },
  { label: 'Fitness goal', value: (row) => row.profile?.fitnessGoal },
]

export default function Users() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${apiBaseUrl}/api/users/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        return response.json()
      })
      .then((payload) => setRows(getCollection(payload, 'users')))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('Users could not be loaded. Check the API connection and try again.')
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  return <ResourceTable title="Users" description="Community members and their fitness goals." rows={rows} columns={columns} loading={loading} error={error} />
}