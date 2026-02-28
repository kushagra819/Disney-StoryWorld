import { useAppStore } from '../../store/useAppStore';

export const Header = () => {
    const { kidMode, setKidMode, magicMeter } = useAppStore();

    return (
        <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center p-6 pointer-events-none">

            {/* Kid Mode Toggle */}
            <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className={`text-sm ${kidMode ? 'text-yellow-400 font-bold tracking-widest text-lg' : 'text-slate-300'}`}>
                    Kid Mode
                </span>
                <button
                    onClick={() => setKidMode(!kidMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${kidMode ? 'bg-yellow-400' : 'bg-slate-700'}`}
                >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${kidMode ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
            </div>

            {/* Magic Meter */}
            <div className="pointer-events-auto flex flex-col items-end gap-2 bg-slate-900/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                <span className="text-xs uppercase tracking-[0.2em] text-blue-300 font-semibold">
                    Magic Meter
                </span>
                <div className="flex items-center gap-3">
                    {/* Progress Bar Container */}
                    <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-blue-900/50">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                            style={{ width: `${magicMeter}%` }}
                        />
                    </div>
                    <span className="text-sm font-mono text-purple-200 w-8 text-right">
                        {magicMeter}%
                    </span>
                </div>
                {magicMeter >= 100 && (
                    <span className="text-xs text-yellow-300 animate-pulse mt-1">
                        ✨ Secret Unlocked! ✨
                    </span>
                )}
            </div>

        </header>
    );
};
