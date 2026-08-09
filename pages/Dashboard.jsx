import React from 'react'
import { Link } from 'react-router-dom'
import { Flame, ShieldCheck, Clock, ArrowRight, Trophy, Github, Linkedin, CheckCircle2, ZapOff } from 'lucide-react'
import StreakGraph from '../components/StreakGraph.jsx'
import data from '../data/mockData.json'

export default function Dashboard() {
  const { user, challenge, streak, badges, leaderboard, days, submission } = data
  const today = days[String(challenge.currentDay)]
  const todaySubmission = submission[String(challenge.currentDay)]

  const bothVerified = todaySubmission?.github?.status === 'verified' && todaySubmission?.linkedin?.status === 'verified'
  const completedDays = streak.log.filter((d) => d.status === 'done' || d.status === 'recovered').length
  const overallPct = Math.round((completedDays / challenge.totalDays) * 100)
  const dayPct = Math.round((challenge.currentDay / challenge.totalDays) * 100)

  return (
    <div className="pb-4">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <div>
          <p className="text-mist text-xs font-mono">welcome back,</p>
          <h1 className="text-xl font-bold text-paper leading-tight">{user.name.split(' ')[0]}</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center font-mono text-sm text-mist">
          {user.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
        </div>
      </header>

      {/* Comeback banner — thoughtful idea: recovery task instead of guilt-tripping */}
      {streak.missedYesterday && (
        <section className="px-5 mb-4">
          <div className="rounded-xl bg-coral-dim/50 border border-coral/40 px-4 py-3.5 flex items-start gap-3">
            <ZapOff size={18} className="text-coral shrink-0 mt-0.5" />
            <div>
              <p className="text-paper text-sm font-medium">Missed yesterday — that's okay.</p>
              <p className="text-mist text-xs mt-1 leading-relaxed">
                Do a {today.recoveryTask.minutes}-min catch-up task to protect your streak. No full build required.
              </p>
              <Link to={`/day/${challenge.currentDay}`} className="inline-block mt-2 text-xs font-semibold text-flame">
                Start catch-up →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Streak + shield */}
      <section className="px-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl2 bg-ink-700 border border-ink-600 px-4 py-4">
          <p className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-mist">
            <Flame size={13} className="text-flame" /> streak
          </p>
          {streak.current > 0 ? (
            <>
              <p className="text-3xl font-extrabold text-paper mt-1.5 font-mono">
                {streak.current}
                <span className="text-sm font-medium text-mist ml-1">days</span>
              </p>
              <p className="text-mint text-[11px] mt-1">Keep going — you're on fire 🔥</p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-paper mt-2 leading-snug">Start your streak today</p>
              <p className="text-mist text-[11px] mt-1">Day 1 is the only hard one.</p>
            </>
          )}
        </div>
        <div className="rounded-xl2 bg-ink-700 border border-ink-600 px-4 py-4">
          <p className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-mist">
            <ShieldCheck size={13} className="text-mint" /> streak shield
          </p>
          <p className="text-3xl font-extrabold text-paper mt-1.5 font-mono">{streak.shieldAvailable}</p>
          <p className="text-mist text-[11px] mt-1">Protects your streak when life happens.</p>
        </div>
      </section>

      {/* Journey progress */}
      <section className="px-5 mt-4">
        <div className="rounded-xl2 bg-ink-700 border border-ink-600 px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[11px] uppercase tracking-wide text-mist">your 60-day journey</p>
            <span className="text-[11px] font-mono text-flame">day {challenge.currentDay} of {challenge.totalDays}</span>
          </div>
          <div className="h-2 rounded-full bg-ink-600 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-flame to-mint rounded-full" style={{ width: `${dayPct}%` }} />
          </div>
          <div className="flex justify-between mt-3">
            {data.milestones.map((m) => (
              <div key={m.day} className="flex flex-col items-center gap-1">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono border ${
                    challenge.currentDay >= m.day
                      ? 'bg-flame border-flame text-ink-900 font-bold'
                      : 'bg-ink-600 border-ink-500 text-mist'
                  }`}
                >
                  {m.day}
                </span>
                <span className="text-[9px] text-mist text-center max-w-[46px] leading-tight">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Streak log */}
      <section className="px-5 mt-4">
        <div className="rounded-xl2 bg-ink-700 border border-ink-600 px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[11px] uppercase tracking-wide text-mist">streak overview</p>
            <span className="text-[11px] text-mist">best: {streak.best} days</span>
          </div>
          <StreakGraph log={streak.log} />
        </div>
      </section>

      {/* Today's task */}
      <section className="px-5 mt-4">
        <div className="rounded-xl2 bg-flame-dim/40 border border-flame/40 px-4 py-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-wide text-flame-soft">today's challenge · day {today.day}</p>
            <span className="flex items-center gap-1 text-[11px] text-mist"><Clock size={12} />{today.estMinutes} min</span>
          </div>
          <h3 className="text-paper font-semibold text-[17px] mt-1.5">{today.title}</h3>
          <p className="text-mist text-xs mt-1.5 leading-relaxed line-clamp-2">{today.brief}</p>
          <Link
            to={`/day/${today.day}`}
            className="mt-3.5 w-full flex items-center justify-center gap-1.5 rounded-xl bg-flame text-ink-900 font-semibold py-3 text-sm"
          >
            View Task Details
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Proof of work status */}
      <section className="px-5 mt-4">
        <div className="rounded-xl2 bg-ink-700 border border-ink-600 px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[11px] uppercase tracking-wide text-mist">today's proof of work</p>
            {bothVerified && (
              <span className="flex items-center gap-1 text-[11px] text-mint font-medium">
                <CheckCircle2 size={13} /> complete
              </span>
            )}
          </div>
          <ProofRow icon={Github} label="GitHub" status={todaySubmission?.github?.status} url={todaySubmission?.github?.url} />
          <div className="h-2" />
          <ProofRow icon={Linkedin} label="LinkedIn" status={todaySubmission?.linkedin?.status} url={todaySubmission?.linkedin?.url} />
        </div>
      </section>

      {/* Standing */}
      <section className="px-5 mt-4 mb-2">
        <div className="rounded-xl2 bg-ink-700 border border-ink-600 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-mist flex items-center gap-1.5">
                <Trophy size={13} className="text-flame" /> your standing
              </p>
              <p className="text-paper text-sm mt-1.5">
                Rank <span className="font-mono text-flame">#{leaderboard.rank}</span> of {leaderboard.totalStudents.toLocaleString('en-IN')}
              </p>
              <p className="text-mist text-xs mt-0.5">Top {100 - leaderboard.percentile}% · {overallPct}% of challenge complete</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {badges.filter((b) => b.earned).slice(0, 3).map((b) => (
              <div key={b.id} className="rounded-lg bg-flame-dim/30 border border-flame/30 px-2 py-2.5 text-center">
                <p className="text-[10px] text-flame-soft leading-tight">{b.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function ProofRow({ icon: Icon, label, status, url }) {
  const verified = status === 'verified'
  return (
    <div className="flex items-center justify-between rounded-lg bg-ink-800 border border-ink-600 px-3.5 py-3">
      <div className="flex items-center gap-2.5">
        <Icon size={16} className="text-paper" />
        <div>
          <p className="text-paper text-sm leading-tight">{label}</p>
          {url && <p className="text-mist text-[11px] mt-0.5">{url}</p>}
        </div>
      </div>
      <span className={`text-[11px] font-medium flex items-center gap-1 ${verified ? 'text-mint' : 'text-mist'}`}>
        {verified ? <CheckCircle2 size={13} /> : null}
        {verified ? 'Verified' : 'Pending'}
      </span>
    </div>
  )
}