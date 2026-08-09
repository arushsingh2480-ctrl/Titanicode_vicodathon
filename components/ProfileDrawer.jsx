import React from 'react'
import { X, Github, Linkedin, PenLine, Flame, Rocket, Shield, Code2, Trophy, Star } from 'lucide-react'
import { useProfileDrawer } from '../context/ProfileContext.jsx'
import data from '../data/mockData.json'

const iconMap = { flame: Flame, rocket: Rocket, shield: Shield, code: Code2, trophy: Trophy, star: Star }

export default function ProfileDrawer() {
  const { open, setOpen } = useProfileDrawer()
  const { user, leaderboard, badges } = data

  if (!open) return null

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close profile"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-[380px] bg-ink-800 border-l border-ink-600/60 overflow-y-auto animate-[slideIn_.2s_ease-out]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-600/60 sticky top-0 bg-ink-800/95 backdrop-blur">
          <h2 className="font-mono text-sm text-mist tracking-wide">~/profile</h2>
          <button onClick={() => setOpen(false)} className="text-mist hover:text-paper p-1" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-6">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-ink-600 border border-dashed border-mist/50 flex items-center justify-center font-mono text-lg text-mist">
                {initials}
              </div>
            )}
            <div>
              <p className="font-semibold text-paper text-lg leading-tight">{user.name}</p>
              <p className="text-mist text-sm font-mono">{user.handle}</p>
            </div>
          </div>

          {!user.bio ? (
            <button className="mt-4 w-full flex items-center gap-2 justify-center rounded-xl border border-dashed border-mist/40 text-mist hover:text-paper hover:border-flame/60 py-3 text-sm transition-colors">
              <PenLine size={15} />
              Add a short bio so recruiters know your story
            </button>
          ) : (
            <p className="mt-4 text-sm text-mist">{user.bio}</p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-ink-700 border border-ink-600 px-3 py-3">
              <p className="text-[11px] text-mist uppercase tracking-wide">Track</p>
              <p className="text-sm text-paper mt-0.5">{user.track}</p>
            </div>
            <div className="rounded-xl bg-ink-700 border border-ink-600 px-3 py-3">
              <p className="text-[11px] text-mist uppercase tracking-wide">College</p>
              <p className="text-sm text-paper mt-0.5 truncate">{user.college}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-ink-700 border border-ink-600 px-4 py-3">
            <p className="text-[11px] text-mist uppercase tracking-wide mb-1">Standing</p>
            <p className="text-sm text-paper">
              Rank <span className="font-mono text-flame">#{leaderboard.rank}</span> of{' '}
              {leaderboard.totalStudents.toLocaleString('en-IN')} · top {100 - leaderboard.percentile}%
            </p>
          </div>

          <div className="mt-5 space-y-2">
            <p className="text-[11px] text-mist uppercase tracking-wide">Proof-of-work accounts</p>
            <div className="flex items-center justify-between rounded-xl bg-ink-700 border border-ink-600 px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-paper"><Github size={16} /> GitHub</span>
              <span className={user.githubConnected ? 'text-mint text-xs font-medium' : 'text-coral text-xs font-medium'}>
                {user.githubConnected ? 'Connected' : 'Not connected'}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-ink-700 border border-ink-600 px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-paper"><Linkedin size={16} /> LinkedIn</span>
              <span className={user.linkedinConnected ? 'text-mint text-xs font-medium' : 'text-coral text-xs font-medium'}>
                {user.linkedinConnected ? 'Connected' : 'Not connected'}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[11px] text-mist uppercase tracking-wide mb-2">Badges</p>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((b) => {
                const Icon = iconMap[b.icon] || Star
                return (
                  <div
                    key={b.id}
                    className={`rounded-xl border px-2 py-3 flex flex-col items-center gap-1.5 text-center ${
                      b.earned ? 'bg-flame-dim/40 border-flame/40 text-flame-soft' : 'bg-ink-700 border-ink-600 text-mist/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-[10px] leading-tight">{b.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}