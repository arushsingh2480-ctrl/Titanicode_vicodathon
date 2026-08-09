import { Outlet } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import ProfileDrawer from './components/ProfileDrawer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-ink-900 bg-noise text-paper">
      <div className="mx-auto max-w-[480px] min-h-screen relative pb-20 border-x border-ink-600/40">
        <Outlet />
        <BottomNav />
        <ProfileDrawer />
      </div>
    </div>
  )
}