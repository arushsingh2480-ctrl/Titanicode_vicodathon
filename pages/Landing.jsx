import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Github, Linkedin, Code2, ShieldCheck, Trophy, Sparkles } from 'lucide-react'
import StreakGraph from '../components/StreakGraph.jsx'
import data from '../data/mockData.json'

const sampleLog = [
  { day: 1, status: 'done' }, { day: 2, status: 'done' }, { day: 3, status: 'done' },
  { day: 4, status: 'missed' }, { day: 5, status: 'recovered' }, { day: 6, status: 'done' },
  { day: 7, status: 'done' }, { day: 8, status: 'done' }, { day: 9, status: 'done' },
  { day: 10, status: 'done' }, { day: 11, status: 'done' }, { day: 12, status: 'in-progress' },
  { day: 13, status: 'upcoming' }, { day: 14, status: 'upcoming' },
]

export default function Landing() {
  return (
    <div>
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-flame/15 border border-flame/40 flex items-center justify-center font-mono text-flame text-sm">
            {'</>'}
          </div>
          <span className="font-semibold tracking-tight">
            AB<span className="text-flame">Talks</span>
          </span>
        </div>
        <span className="text-[11px] font-mono text-mist border border-ink-600 rounded-full px-3 py-1">
          60-day challenge
        </span>
      </header>

      {/* Hero */}
      <section className="px-5 pt-6">
        <p className="font-mono text-xs text-mint mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-mint inline-block" />
          for Indian college students · free
        </p>
        <h1 className="text-[2.15rem] leading-[1.08] font-extrabold tracking-tight text-paper">
          Your code speaks.
          <br />
          Make sure <span className="text-flame">someone's listening.</span>
        </h1>
        <p className="text-mist text-[15px] mt-4 leading-relaxed">
          One real task a day for 60 days. Ship it, prove it with a GitHub commit
          and a LinkedIn post, and build a public log recruiters can actually see.
        </p>

        {/* Terminal card — signature element */}
        <div className="mt-6 rounded-xl2 bg-ink-700 border border-ink-600 overflow-hidden shadow-glow">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-ink-600 bg-ink-800/60">
            <span className="w-2.5 h-2.5 rounded-full bg-coral/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-flame-soft/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-mint/70" />
            <span className="ml-2 font-mono text-[11px] text-mist">day-1.sh</span>
          </div>
          <pre className="font-mono text-[12.5px] leading-6 px-4 py-4 text-mist overflow-x-auto">
<span className="text-mint">$</span> abtalks init --student{'\n'}
<span className="text-mist/70">›</span> track: full-stack-web{'\n'}
<span className="text-mist/70">›</span> commitment: 15–60 min / day{'\n'}
<span className="text-mist/70">›</span> proof_required: [github, linkedin]{'\n'}
<span className="text-flame">›</span> status: <span className="text-paper">ready to start</span>
<span className="blink-cursor text-flame">▌</span>
          </pre>
        </div>

        <Link
          to="/dashboard"
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-flame text-ink-900 font-semibold py-3.5 text-[15px] active:scale-[0.98] transition-transform"
        >
          Start My Journey
          <ArrowRight size={18} />
        </Link>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex -space-x-2">
            {['A', 'R', 'P'].map((l) => (
              <span
                key={l}
                className="w-7 h-7 rounded-full bg-ink-600 border-2 border-ink-900 flex items-center justify-center text-[11px] font-mono text-paper"
              >
                {l}
              </span>
            ))}
          </div>
          <p className="text-xs text-mist">
            <span className="text-paper font-medium">2,547 students</span> logging commits tonight
          </p>
        </div>
      </section>

      {/* Sample streak preview */}
      <section className="px-5 mt-9">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-mist">what a log looks like</h2>
          <span className="text-[11px] font-mono text-mist">day 12 / 60</span>
        </div>
        <div className="rounded-xl2 bg-ink-700 border border-ink-600 px-4 py-4">
          <StreakGraph log={sampleLog} />
          <p className="text-xs text-mist mt-3 leading-relaxed">
            Miss a day and it's marked, not hidden — a <span className="text-flame">Streak Shield</span> lets
            you recover with a shorter catch-up task instead of losing your streak entirely.
          </p>
        </div>
      </section>

      {/* Milestone path */}
      <section className="px-5 mt-9">
        <h2 className="font-mono text-xs uppercase tracking-wider text-mist mb-3">the 60-day path</h2>
        <ol className="space-y-0">
          {data.milestones.map((m, i) => (
            <li key={m.day} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full bg-ink-700 border border-ink-500 flex items-center justify-center font-mono text-[11px] text-mist">
                  {m.day}
                </span>
                {i < data.milestones.length - 1 && <span className="w-px flex-1 bg-ink-600 my-1" />}
              </div>
              <div className="pb-6">
                <p className="text-paper text-sm font-medium">{m.label}</p>
                <p className="text-mist text-xs mt-0.5">Day {m.day} of 60</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* What's inside */}
      <section className="px-5 mt-3">
        <h2 className="font-mono text-xs uppercase tracking-wider text-mist mb-3">what's inside</h2>
        <div className="grid grid-cols-2 gap-3">
          <Feature icon={Code2} title="One task a day" desc="Real, scoped builds — not tutorials." />
          <Feature icon={ShieldCheck} title="Streak Shield" desc="A missed day doesn't end your run." />
          <Feature icon={Github} title="GitHub proof" desc="Every day ends in a real commit." />
          <Feature icon={Linkedin} title="LinkedIn proof" desc="Build a public log recruiters see." />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 mt-9 mb-8">
        <div className="rounded-xl2 bg-mint-dim/50 border border-mint/30 px-5 py-6 text-center">
          <Sparkles className="mx-auto text-mint mb-2" size={20} />
          <p className="text-paper font-semibold text-[15px]">Consistency today. Recognition tomorrow.</p>
          <p className="text-mist text-xs mt-1">Your future self is watching. Make it proud.</p>
          <Link
            to="/dashboard"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-paper text-ink-900 font-semibold px-6 py-3 text-sm"
          >
            <Trophy size={16} />
            Let's get started
          </Link>
        </div>
      </section>
    </div>
  )
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-xl bg-ink-700 border border-ink-600 px-3.5 py-4">
      <Icon size={18} className="text-flame mb-2.5" />
      <p className="text-paper text-sm font-medium leading-tight">{title}</p>
      <p className="text-mist text-xs mt-1 leading-snug">{desc}</p>
    </div>
  )
}