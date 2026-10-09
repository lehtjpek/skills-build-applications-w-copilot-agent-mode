import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const pages = [
  ['Activities', '/activities'],
  ['Leaderboard', '/leaderboard'],
  ['Teams', '/teams'],
  ['Users', '/users'],
  ['Workouts', '/workouts'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/activities" aria-label="OctoFit home">
          <img className="brand-logo" src={logo} alt="" />
          <span>OctoFit</span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {pages.map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App