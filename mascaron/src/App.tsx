import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import { BookOpen, Map as MapIcon, PenLine } from 'lucide-react'
import { MapScreen } from './screens/MapScreen'
import { CarnetScreen } from './screens/CarnetScreen'
import { CreatorListScreen } from './screens/CreatorListScreen'
import { CreatorEditScreen } from './screens/CreatorEditScreen'

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<MapScreen />} />
            <Route path="/carnet" element={<CarnetScreen />} />
            <Route path="/creer" element={<CreatorListScreen />} />
            <Route path="/creer/:id" element={<CreatorEditScreen />} />
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
          <NavLink to="/creer">
            <PenLine size={22} aria-hidden />
            Créer
          </NavLink>
        </nav>
      </div>
    </HashRouter>
  )
}
