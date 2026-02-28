import { MagicCursor } from './components/ui/MagicCursor';
import { Header } from './components/layout/Header';
import { MagicalIntro } from './components/intro/MagicalIntro';
import { RealmSelection } from './components/navigation/RealmSelection';
import { AIStoryGenerator } from './components/features/AIStoryGenerator';

function App() {
  return (
    <>
      <MagicCursor />
      <Header />
      <main>
        <MagicalIntro />

        {/* Placeholder for Person A's Realm Selection */}
        <RealmSelection />
        <AIStoryGenerator />
      </main>
    </>
  );
}

export default App;
