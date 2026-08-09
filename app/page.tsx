"use client";

import Link from "next/link";
import { Flame, ArrowRight, CheckCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useStreak } from "@/components/StreakProvider";

// Custom Icons for GitHub and LinkedIn
const GithubIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function LandingPage() {
  const { currentStreak, longestStreak, completedDays } = useStreak();
  const totalDays = 60;
  const progressPercent = (completedDays / totalDays) * 100;

  return (
    <main className="flex min-h-screen flex-col items-center p-5 max-w-md mx-auto relative bg-slate-950 pb-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-600/10 blur-3xl rounded-full pointer-events-none"></div>

      {/* Header Section */}
      <div className="relative mt-16 text-center w-full z-10">
        <p className="text-orange-500 font-bold tracking-[0.2em] text-xs mb-3">BUILD · SHARE · GROW</p>
        <h1 className="text-3xl font-extrabold text-white leading-tight mb-6 px-4">
          60 Days. Build Your Developer Story.
        </h1>
      </div>

      {/* Mountain Illustration SVG */}
      <div className="relative w-full h-44 mb-8 flex justify-center items-center z-10">
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-2xl">
          {/* Base Mountain */}
          <path d="M10,100 L70,20 L100,50 L130,10 L190,100 Z" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
          {/* Snow Caps */}
          <path d="M70,20 L60,35 L75,35 L80,45 L90,30 Z" fill="#f1f5f9" opacity="0.8"/>
          <path d="M130,10 L120,30 L140,30 L145,20 Z" fill="#f1f5f9" opacity="0.8"/>
          {/* Flag on highest peak */}
          <line x1="130" y1="10" x2="130" y2="-5" stroke="#94a3b8" strokeWidth="2" />
          <path d="M130,-5 L145,-1 L130,3 Z" fill="#f97316" />
        </svg>
      </div>

      {/* Progress Section */}
      <div className="w-full z-10 mb-8 px-2">
        <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
          <span>Day {completedDays} / {totalDays}</span>
          <span>{Math.round(progressPercent)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* CTA Button */}
      <Link href="/dashboard" className="w-full z-10 mb-10 group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/30">
        Start My Journey 
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Today's Challenge Card */}
      <div className="w-full z-10 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl mb-4 backdrop-blur-sm">
        <p className="text-slate-500 text-xs font-medium mb-1">Today's Challenge</p>
        <h3 className="text-white font-bold text-lg mb-4">Responsive Pricing Card</h3>
        <div className="flex gap-6 text-sm font-medium">
          <span className="flex items-center gap-2 text-green-400">
            <CheckCircle size={16} /> GitHub
          </span>
          <span className="flex items-center gap-2 text-green-400">
            <CheckCircle size={16} /> LinkedIn
          </span>
        </div>
      </div>

      {/* Streak Overview Card */}
      <div className="w-full z-10 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl mb-8 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-white font-bold text-xl">{currentStreak} Days</p>
            <p className="text-slate-500 text-xs">Current Streak</p>
          </div>
        </div>
        <div className="text-right border-l border-slate-800 pl-4">
          <p className="text-slate-300 text-sm font-semibold">Longest: {longestStreak} Days</p>
        </div>
      </div>

      {/* Footer Quote */}
      <p className="text-slate-600 text-xs mt-4 text-center italic z-10">
        Consistency today. Recognition tomorrow.
      </p>

      {/* Bottom Navigation Bar */}
      <BottomNav />

    </main>
  );
}