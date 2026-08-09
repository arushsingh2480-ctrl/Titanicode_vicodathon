import React from 'react'

const STATUS_STYLE = {
  done: 'bg-mint border-mint/60',
  recovered: 'bg-flame border-flame/60',
  missed: 'bg-transparent border-coral/70 border-dashed',
  'in-progress': 'bg-flame-soft border-flame animate-pulse',
  upcoming: 'bg-ink-600 border-ink-500',
}

const STATUS_LABEL = {
  done: 'Shipped',
  recovered: 'Recovered with shield',
  missed: 'Missed — no submission',
  'in-progress': 'In progress',
  upcoming: 'Not yet reached',
}

/**
 * Commit-style streak log.
 * Handles the empty / "first day" edge case: if `log` has no completed
 * days yet, it renders an inviting placeholder row instead of a wall
 * of grey boxes.
 */
export default function StreakGraph({ log = [] }) {
  const hasAnyProgress = log.some((d) => d.status === 'done' || d.status === 'recovered')

  if (!hasAnyProgress) {
    return (
      <div className="rounded-xl border border-dashed border-mist/30 bg-ink-700/50 px-4 py-5 text-center">
        <p className="text-sm text-paper font-medium">No commits yet — day 1 starts your log.</p>
        <p className="text-xs text-mist mt-1">Every green cell here is a real day you showed up.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-1.5 overflow-x-auto pb-1" role="list" aria-label="Daily streak log">
        {log.map((d) => (
          <div
            key={d.day}
            role="listitem"
            title={`Day ${d.day} — ${STATUS_LABEL[d.status]}`}
            className={`w-6 h-6 shrink-0 rounded-[6px] border ${STATUS_STYLE[d.status]}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 mt-2.5 flex-wrap">
        <Legend swatchClass="bg-mint border-mint/60" label="Shipped" />
        <Legend swatchClass="bg-flame border-flame/60" label="Recovered" />
        <Legend swatchClass="bg-transparent border-coral/70 border-dashed" label="Missed" />
        <Legend swatchClass="bg-ink-600 border-ink-500" label="Upcoming" />
      </div>
    </div>
  )
}

function Legend({ swatchClass, label }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] text-mist">
      <span className={`w-2.5 h-2.5 rounded-[3px] border ${swatchClass}`} />
      {label}
    </span>
  )
}