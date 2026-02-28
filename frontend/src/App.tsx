import { MagicCursor } from './components/ui/MagicCursor';
import { Header } from './components/layout/Header';
import { MagicalIntro } from './components/intro/MagicalIntro';
import { RealmSelection } from './components/navigation/RealmSelection';
import { RealmView } from './components/realm/RealmView';
import { AIStoryGenerator } from './components/features/AIStoryGenerator';
import { useAppStore } from './store/useAppStore';

function App() {
  const { currentRealm } = useAppStore();

  return (
    <>
      <MagicCursor />
      <Header />
      <main>
        {!currentRealm ? (
          <>
            <MagicalIntro />
            <RealmSelection />
          </>
        ) : (
          <RealmView />
        )}
        <AIStoryGenerator />
      </main>
    </>
  );
}

export default App;
