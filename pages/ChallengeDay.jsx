import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Clock, BarChart3, CheckCircle2, Circle, Github, Linkedin,
  ExternalLink, Zap,
} from 'lucide-react'
import data from '../data/mockData.json'

export default function ChallengeDay() {
  const { dayId } = useParams()
  const day = data.days[dayId]
  const savedSubmission = data.submission[dayId]
  const [checked, setChecked] = useState(() => new Set())
  const [useRecovery, setUseRecovery] = useState(false)

  const [github, setGithub] = useState(savedSubmission?.github?.url ?? '')
  const [linkedin, setLinkedin] = useState(savedSubmission?.linkedin?.url ?? '')
  const [status, setStatus] = useState(
    savedSubmission?.github?.status === 'verified' && savedSubmission?.linkedin?.status === 'verified'
      ? 'verified'
      : 'idle'
  )

  if (!day) {
    return (
      <div className="min-h-screen bg-ink-900 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-paper font-semibold">This day isn't live yet.</p>
        <p className="text-mist text-sm mt-2 leading-relaxed">
          Challenge days unlock one at a time, in order.
        </p>
        <Link to="/" className="text-flame text-sm font-medium mt-5">
          Back to dashboard →
        </Link>
      </div>
    )
  }

  const githubValid = /github\.com\/.+/i.test(github.trim())
  const linkedinValid = /linkedin\.com\/.+/i.test(linkedin.trim())
  const canSubmit = githubValid && linkedinValid && status !== 'submitting'

  function toggle(i) {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('submitting')
    setTimeout(() => setStatus('verified'), 700)
  }

  return (
    <div className="min-h-screen bg-ink-900 pb-10">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="text-mist">
          <ArrowLeft size={20} />
        </Link>
        <span className="font-mono text-xs text-mist">
          Day {day.day} of {data.challenge.totalDays}
        </span>
      </header>

      <section className="px-5 mt-2">
        <p className="text-flame font-mono text-xs">{day.track}</p>
        <h1 className="text-2xl font-extrabold text-paper mt-1 leading-tight">{day.title}</h1>
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-xs text-mist">
            <Clock size={13} /> {day.estMinutes} min
          </span>
          <span className="flex items-center gap-1.5 text-xs text-mist">
            <BarChart3 size={13} /> {day.difficulty}
          </span>
        </div>
        <p className="text-paper/90 text-sm mt-4 leading-relaxed">{day.brief}</p>
      </section>

      {/* Recovery toggle — shown because yesterday was missed */}
      {data.streak.missedYesterday && day.recoveryTask && (
        <section className="px-5 mt-5">
          <button
            onClick={() => setUseRecovery((v) => !v)}
            className={`w-full text-left rounded-xl border px-4 py-3.5 transition-colors ${
              useRecovery ? 'bg-flame-dim/40 border-flame/50' : 'bg-ink-700 border-ink-600'
            }`}
          >
            <p className="flex items-center gap-2 text-sm font-medium text-paper">
              <Zap size={15} className="text-flame" />
              Use {day.recoveryTask.minutes}-min catch-up instead
            </p>
            <p className="text-mist text-xs mt-1 leading-relaxed">{day.recoveryTask.description}</p>
          </button>
        </section>
      )}

      {/* Objectives */}
      <section className="px-5 mt-6">
        <h2 className="font-mono text-xs uppercase tracking-wide text-mist mb-3">
          {useRecovery ? 'catch-up checklist' : 'what to build'}
        </h2>
        <ul className="space-y-2">
          {(useRecovery ? [day.recoveryTask.title] : day.objectives).map((obj, i) => (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start gap-2.5 text-left rounded-lg bg-ink-700 border border-ink-600 px-3.5 py-3"
              >
                {checked.has(i) ? (
                  <CheckCircle2 size={17} className="text-mint shrink-0 mt-0.5" />
                ) : (
                  <Circle size={17} className="text-mist shrink-0 mt-0.5" />
                )}
                <span
  className={`text-sm leading-snug ${
    checked.has(i)
      ? 'text-mist line-through'
      : 'text-paper'
  }`}
>
  {obj}
</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Resources */}
      {!useRecovery && (
        <section className="px-5 mt-6">
          <h2 className="font-mono text-xs uppercase tracking-wide text-mist mb-3">hints &amp; resources</h2>
          <div className="space-y-2">
            {day.resources.map((r) => (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg bg-ink-700 border border-ink-600 px-3.5 py-3 text-sm text-paper"
              >
                {r.label}
                <ExternalLink size={14} className="text-mist" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Submission */}
      <section className="px-5 mt-7">
        <h2 className="font-mono text-xs uppercase tracking-wide text-mist mb-3">submit proof of work</h2>
        <form onSubmit={handleSubmit} className="rounded-xl2 bg-ink-700 border border-ink-600 px-4 py-4 space-y-4">
          <Field
            icon={Github}
            label="GitHub repository or commit"
            placeholder="github.com/you/project"
            value={github}
            onChange={setGithub}
            valid={github.length === 0 || githubValid}
          />
          <Field
            icon={Linkedin}
            label="LinkedIn post URL"
            placeholder="linkedin.com/posts/you-day12"
            value={linkedin}
            onChange={setLinkedin}
            valid={linkedin.length === 0 || linkedinValid}
          />

          {status === 'verified' ? (
            <div className="flex items-center gap-2 rounded-xl bg-mint-dim/50 border border-mint/40 px-4 py-3 text-mint text-sm font-medium">
              <CheckCircle2 size={16} />
              Challenge completed — streak extended by 1 day
            </div>
          ) : (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl bg-flame text-ink-900 font-semibold py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              {status === 'submitting' ? 'Verifying…' : 'Submit Day ' + day.day}
            </button>
          )}
          <p className="text-mist text-[11px] text-center leading-relaxed">
            We check that both links are live and dated today. No screenshots needed.
          </p>
        </form>
      </section>
    </div>
  )
}

function Field({ icon: Icon, label, placeholder, value, onChange, valid }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs text-mist mb-1.5">
        <Icon size={13} /> {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg bg-ink-800 border px-3.5 py-3 text-sm text-paper placeholder:text-mist/50 outline-none ${
          valid ? 'border-ink-600 focus:border-flame' : 'border-coral/70'
        }`}
      />
      {!valid && (
        <span className="text-coral text-[11px] mt-1 block">Enter a valid link so we can verify it.</span>
      )}
    </label>
  )
}