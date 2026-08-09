"use client";
import { Flame } from "lucide-react";
import { studentData } from "../data";
import BottomNav from "@/components/BottomNav";
import { useStreak } from "@/components/StreakProvider";

export default function StreakPage() {
  const { currentStreak, longestStreak, completedDays } = useStreak();
  const totalDays = 60;

  // Create an array of 60 days
  const days = Array.from({ length: totalDays }, (_, i) => {
    return {
      day: i + 1,
      status: i < completedDays ? "completed" : "future"
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-5 max-w-md mx-auto relative bg-slate-950 pb-24">
      <h1 className="text-2xl font-bold text-white mt-8 mb-6 self-start">Your 60-Day Journey</h1>

      {/* Grid Container */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col items-center">
        <p className="text-slate-400 text-sm mb-6 self-start">{completedDays} days complete - Day {totalDays} of {totalDays}</p>
        
        {/* The 60-Day Grid */}
        <div className="grid grid-cols-10 gap-1.5 sm:gap-2 mb-8">
          {days.map((d) => (
            <div
              key={d.day}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md transition-colors ${
                d.status === "completed" 
                  ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" 
                  : d.status === "missed"
                  ? "bg-red-500"
                  : "bg-slate-800"
              }`}
              title={`Day ${d.day}: ${d.status}`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400 w-full mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-green-500" />
            <span>On time</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-slate-800" />
            <span>Future</span>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col items-center">
          <Flame size={24} className="text-orange-500 mb-2" />
          <p className="text-2xl font-bold text-white">{currentStreak}</p>
          <p className="text-slate-500 text-xs text-center">Current Streak</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col items-center">
          <Flame size={24} className="text-slate-500 mb-2" />
          <p className="text-2xl font-bold text-white">{longestStreak}</p>
          <p className="text-slate-500 text-xs text-center">Longest Streak</p>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}