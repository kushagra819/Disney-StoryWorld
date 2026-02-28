import { create } from 'zustand';

interface AppState {
    kidMode: boolean;
    magicMeter: number;
    currentRealm: string | null;
    mood: string | null;
    setKidMode: (kidMode: boolean) => void;
    incrementMagicMeter: (amount: number) => void;
    setCurrentRealm: (realm: string | null) => void;
    setMood: (mood: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    kidMode: false,
    magicMeter: 0,
    currentRealm: null,
    mood: null,
    setKidMode: (kidMode) => set({ kidMode }),
    incrementMagicMeter: (amount) =>
        set((state) => ({ magicMeter: Math.min(100, state.magicMeter + amount) })),
    setCurrentRealm: (currentRealm) => set({ currentRealm }),
    setMood: (mood) => set({ mood }),
}));
