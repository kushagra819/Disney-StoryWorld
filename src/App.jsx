import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MagicCursor from './components/ui/MagicCursor'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'
import StoriesPage from './pages/StoriesPage'
import ParksPage from './pages/ParksPage'
import ExperiencePage from './pages/ExperiencePage'
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
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/parks" element={<ParksPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
