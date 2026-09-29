import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import { BookOpen, Map as MapIcon, UserRound } from 'lucide-react'
import { MapScreen } from './screens/MapScreen'
import { CarnetScreen } from './screens/CarnetScreen'
import { AccountScreen } from './screens/AccountScreen'

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<MapScreen />} />
            <Route path="/carnet" element={<CarnetScreen />} />
            <Route path="/compte" element={<AccountScreen />} />
          </Routes>
        </main>
        <nav className="tabbar">
          <NavLink to="/" end>
            <MapIcon size={22} aria-hidden />
            Carte
          </NavLink>
          <NavLink to="/carnet">
            <BookOpen size={22} aria-hidden />
            Carnet
          </NavLink>
          <NavLink to="/compte">
            <UserRound size={22} aria-hidden />
            Compte
          </NavLink>
        </nav>
      </div>
    </HashRouter>
  )
}
