const DEFAULT_API_PORT = 8000

export function getApiBaseUrl(port = DEFAULT_API_PORT) {
  const codespaceName = process.env.CODESPACE_NAME

  return codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`
}