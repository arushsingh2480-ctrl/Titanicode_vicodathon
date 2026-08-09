"use client";

import Link from "next/link";
import { studentData, challengeData } from "../data";
import { Flame, Trophy, CheckCircle, AlertCircle, ArrowRight, Home, ListChecks, User } from "lucide-react";
import { useStreak } from "@/components/StreakProvider";

export default function DashboardPage() {
  const { currentStreak, longestStreak, completedDays } = useStreak();
  const todayTask = challengeData.find(d => d.id === completedDays) || challengeData[0];
  const missedDay = studentData.missedDays[0]; 
  const progress = (completedDays / studentData.totalChallenges) * 100;

  return (
    <main className="flex min-h-screen flex-col items-center p-5 max-w-md mx-auto relative bg-slate-950 pb-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-600/10 blur-3xl rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="relative flex items-center justify-between w-full mt-8 mb-8 z-10">
        <div>
          <p className="text-slate-500 text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold text-white">{studentData.name} 👋</h1>
        </div>
        <div className="bg-slate-900 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-800 text-orange-400">
          {studentData.track}
        </div>
      </div>

      {/* Missed Day Recovery (Edge Case) */}
      <div className="relative z-10 w-full bg-red-950/40 border border-red-800/50 rounded-xl p-4 mb-6 flex items-start gap-3 backdrop-blur-sm">
        <AlertCircle className="text-red-400 shrink-0" size={20} />
        <div className="flex-1">
          <p className="font-semibold text-red-300 text-sm">Missed Day {missedDay}</p>
          <p className="text-red-400/80 text-xs mt-1">Your streak broke, but you can get back on track. Don&apos;t give up!</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="relative z-10 w-full mb-6">
        <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
          <span>Overall Progress</span>
          <span>{completedDays}/{studentData.totalChallenges} Days</span>
        </div>
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Streak & Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-4 w-full mb-6">
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center backdrop-blur-sm">
          <Flame className="text-orange-500 mb-2" size={28} />
          <p className="text-3xl font-bold text-white">{currentStreak}</p>
          <p className="text-slate-500 text-xs">Current Streak</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center backdrop-blur-sm">
          <Trophy className="text-yellow-500 mb-2" size={28} />
          <p className="text-3xl font-bold text-white">{longestStreak}</p>
          <p className="text-slate-500 text-xs">Longest Streak</p>
        </div>
      </div>

      {/* Today's Task */}
      <h2 className="relative z-10 text-lg font-bold text-white mb-4 self-start">Today&apos;s Challenge</h2>
      <Link href={`/day/${todayTask.id}`} className="relative z-10 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all text-white p-5 rounded-2xl shadow-lg shadow-orange-500/20 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80 mb-1">Day {todayTask.id}</p>
            <h3 className="font-bold text-lg">{todayTask.title}</h3>
          </div>
          <ArrowRight size={24} />
        </div>
      </Link>

      {/* Achievements */}
      <h2 className="relative z-10 text-lg font-bold text-white mb-4 self-start">Achievements</h2>
      <div className="relative z-10 flex flex-wrap gap-3 w-full mb-8">
        {studentData.achievements.length > 0 ? (
          studentData.achievements.map((ach, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 px-3 py-2 rounded-full text-xs flex items-center gap-2 text-slate-300 backdrop-blur-sm">
              <CheckCircle size={14} className="text-green-500" /> {ach}
            </div>
          ))
        ) : (
          <p className="text-slate-500 text-sm">Complete Day 1 to unlock your first badge!</p>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 flex justify-around items-center z-20">
        <Link href="/" className="flex flex-col items-center text-slate-500 hover:text-orange-500 transition-colors">
          <Home size={22} />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center text-orange-500">
          <ListChecks size={22} />
          <span className="text-[10px] mt-1 font-medium">Tasks</span>
        </Link>
        <button className="flex flex-col items-center text-slate-500">
          <Flame size={22} />
          <span className="text-[10px] mt-1 font-medium">Streak</span>
        </button>
        <button className="flex flex-col items-center text-slate-500">
          <User size={22} />
          <span className="text-[10px] mt-1 font-medium">Profile</span>
        </button>
      </div>

    </main>
  );
}