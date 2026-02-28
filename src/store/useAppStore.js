// App Store (placeholder — Zustand or context-based state management)
// Will manage: current realm, user preferences, story state, etc.

import { useState } from 'react';

export function useAppStore() {
    const [currentRealm, setCurrentRealm] = useState(null);
    const [isPortalOpen, setIsPortalOpen] = useState(false);

    return {
        currentRealm,
        setCurrentRealm,
        isPortalOpen,
        setIsPortalOpen,
    };
}
