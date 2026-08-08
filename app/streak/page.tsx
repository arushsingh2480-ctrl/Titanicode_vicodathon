"use client";
import { Flame } from "lucide-react";
import { studentData } from "../data";
import BottomNav from "@/components/BottomNav";

export default function StreakPage() {
  return (
    <main className="min-h-screen max-w-md mx-auto p-6 pb-24">
      <h1 className="text-2xl font-bold mb-8">Your Streak</h1>

      <div className="flex flex-col items-center bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8">
        <Flame size={48} className="text-orange-500 mb-3" />
        <p className="text-4xl font-extrabold">{studentData.currentStreak} days</p>
        <p className="text-slate-500 mt-1">Current streak</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-sm mb-1">Longest streak</p>
          <p className="text-2xl font-bold">{studentData.longestStreak}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-sm mb-1">Missed days</p>
          <p className="text-2xl font-bold">{studentData.missedDays.length}</p>
        </div>
      </div>

      <h2 className="font-bold text-lg mb-4">Achievements</h2>
      <div className="flex flex-wrap gap-2">
        {studentData.achievements.map((a) => (
          <span key={a} className="bg-orange-500/10 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-full text-sm">
            {a}
          </span>
        ))}
      </div>

      <BottomNav />
    </main>
  );
}