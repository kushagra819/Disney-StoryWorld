import MagicalIntro from './components/intro/MagicalIntro'
import MagicCursor from './components/ui/MagicCursor'
import Header from './components/layout/Header'
import RealmSelection from './components/navigation/RealmSelection'
import './App.css'

function App() {
  return (
    <div className="app">
      <MagicCursor />
      <Header />
      <MagicalIntro />
      <RealmSelection />
    </div>
  )
}

export default App
