import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, LayoutGrid, CalendarDays, CircleUserRound } from 'lucide-react'
import { useProfileDrawer } from '../context/ProfileContext.jsx'

const linkBase =
  'flex flex-col items-center justify-center gap-1 flex-1 py-2.5 text-[11px] font-medium tap-highlight-none transition-colors'

export default function BottomNav() {
  const { setOpen } = useProfileDrawer()

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] border-t border-ink-600/60 bg-ink-800/95 backdrop-blur z-40"
      aria-label="Primary"
    >
      <div className="flex items-stretch">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'text-flame' : 'text-mist hover:text-paper'}`
          }
        >
          <Home size={20} strokeWidth={2} />
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'text-flame' : 'text-mist hover:text-paper'}`
          }
        >
          <LayoutGrid size={20} strokeWidth={2} />
          Dashboard
        </NavLink>
        <NavLink
          to="/day/12"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'text-flame' : 'text-mist hover:text-paper'}`
          }
        >
          <CalendarDays size={20} strokeWidth={2} />
          Today
        </NavLink>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`${linkBase} text-mist hover:text-paper`}
        >
          <CircleUserRound size={20} strokeWidth={2} />
          Profile
        </button>
      </div>
    </nav>
  )
}