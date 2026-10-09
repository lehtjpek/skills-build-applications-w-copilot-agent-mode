function displayValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object') {
    return value.name || value.username || value.email || value.title || value._id || '—'
  }
  return String(value)
}

export default function ResourceTable({ title, description, rows, columns, loading, error }) {
  return (
    <section aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <span className="record-count" aria-live="polite">{loading ? 'Loading' : `${rows.length} records`}</span>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="table-responsive data-table-wrap">
        <table className="table data-table">
          <thead>
            <tr>{columns.map((column) => <th scope="col" key={column.label}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} className="table-message">Loading {title.toLowerCase()}...</td></tr>
            ) : rows.length ? rows.map((row, index) => (
              <tr key={row._id || row.id || `${title}-${index}`}>
                {columns.map((column) => (
                  <td key={column.label}>{displayValue(column.value(row))}</td>
                ))}
              </tr>
            )) : (
              <tr><td colSpan={columns.length} className="table-message">No {title.toLowerCase()} to show.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}