import MagicalIntro from '../components/intro/MagicalIntro'
import CastleTile from '../components/intro/CastleTile'
import RealmSelection from '../components/navigation/RealmSelection'

export default function HomePage() {
    return (
        <>
            {/* Tile 1 — Text Hero */}
            <MagicalIntro />
            {/* Tile 2 — 3D Castle */}
            <CastleTile />
            {/* Tile 3 — Realm Selection */}
            <RealmSelection />
        </>
    )
}
