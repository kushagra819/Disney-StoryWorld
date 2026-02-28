import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MagicCursor from './components/ui/MagicCursor'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'
import StoriesPage from './pages/StoriesPage'
import ParksAndExperiencePage from './pages/ParksAndExperiencePage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <MagicCursor />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/parks" element={<ParksAndExperiencePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
