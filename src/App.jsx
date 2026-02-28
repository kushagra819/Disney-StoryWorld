import MagicalIntro from './components/intro/MagicalIntro'
import MagicCursor from './components/ui/MagicCursor'
import './App.css'

function App() {
  return (
    <div className="app">
      <MagicCursor />
      <MagicalIntro />
      {/* Future sections: Realms, Characters, Parks, Streaming, etc. */}
      <section id="realms" className="section" style={{ minHeight: '100vh' }}>
        <div className="section__container">
          <div className="section__header">
            <p className="section__subtitle">Choose Your Destiny</p>
            <h2 className="section__title">Explore the Realms</h2>
            <p className="section__desc">
              Journey into enchanted worlds where magic is real and every story awaits your discovery.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
