import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import { BookOpen, Map as MapIcon } from 'lucide-react'
import { MapScreen } from './screens/MapScreen'
import { CarnetScreen } from './screens/CarnetScreen'

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<MapScreen />} />
            <Route path="/carnet" element={<CarnetScreen />} />
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
        </nav>
      </div>
    </HashRouter>
  )
}
