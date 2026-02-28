import { useAppStore } from '../../store/useAppStore';

const REALMS = [
    { id: 'fantasy', name: 'Fantasy Realm', icon: '🧚', color: 'from-pink-500 to-purple-500' },
    { id: 'ocean', name: 'Ocean Realm', icon: '🌊', color: 'from-blue-400 to-cyan-500' },
    { id: 'space', name: 'Space Realm', icon: '🚀', color: 'from-indigo-600 to-purple-800' },
    { id: 'adventure', name: 'Adventure Realm', icon: '🗺️', color: 'from-green-500 to-emerald-700' },
];

export const RealmSelection = () => {
    const { setCurrentRealm, incrementMagicMeter, kidMode } = useAppStore();

    const handleRealmEnter = (realmId: string) => {
        // Person B logic: Update state and increment meter on interaction
        setCurrentRealm(realmId);
        incrementMagicMeter(25); // Gives magic points for exploring

        // Person A will add the Three.js portal transition trigger here later
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center p-8 z-20">
            <h2 className={`mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300 font-bold text-center ${kidMode ? 'text-5xl tracking-wide uppercase' : 'text-4xl tracking-[0.2em]'}`}>
                {kidMode ? 'CHOOSE A WORLD!' : 'Choose Your Realm'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {REALMS.map((realm) => (
                    <button
                        key={realm.id}
                        onClick={() => handleRealmEnter(realm.id)}
                        className="group relative h-96 rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-white/30"
                    >
                        {/* Background Glow (UI for Person A to polish) */}
                        <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-br ${realm.color}`} />

                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6">
                            <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                                {realm.icon}
                            </span>
                            <h3 className={`font-semibold text-center text-slate-200 group-hover:text-white transition-colors ${kidMode ? 'text-2xl' : 'text-xl tracking-wider'}`}>
                                {realm.name}
                            </h3>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};
