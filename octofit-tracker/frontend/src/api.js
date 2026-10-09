const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getCollection(payload, resource) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload[resource])) return payload[resource]
  if (Array.isArray(payload.data)) return payload.data
  if (payload.data && Array.isArray(payload.data.results)) return payload.data.results

  return []
}