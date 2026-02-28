import { useState } from 'react';
import { MagicCursor } from './components/ui/MagicCursor';
import { MagicalIntro } from './components/intro/MagicalIntro';

function App() {
  return (
    <>
      <MagicCursor />
      <main>
        <MagicalIntro />

        {/* Placeholder for Person A's Realm Selection */}
        <section className="h-screen flex items-center justify-center bg-slate-900 border-t border-purple-500/20">
          <h2 className="text-3xl text-purple-300">Realm Selection Coming Soon</h2>
        </section>
      </main>
    </>
  );
}

export default App;
