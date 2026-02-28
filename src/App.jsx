import MagicalIntro from './components/intro/MagicalIntro'
import CastleTile from './components/intro/CastleTile'
import MagicCursor from './components/ui/MagicCursor'
import Header from './components/layout/Header'
import RealmSelection from './components/navigation/RealmSelection'
import './App.css'

function App() {
  return (
    <div className="app">
      <MagicCursor />
      <Header />
      {/* Tile 1 — Text Hero */}
      <MagicalIntro />
      {/* Tile 2 — 3D Castle */}
      <CastleTile />
      {/* Tile 3 — Realm Selection */}
      <RealmSelection />
    </div>
  )
}

export default App
