"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { CheckCircle, Link as LinkIcon, Send } from "lucide-react";
import { useStreak } from "@/components/StreakProvider";

export default function TasksPage() {
  const [url, setUrl] = useState("");
  const { hasSubmittedToday, incrementStreak } = useStreak();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      incrementStreak();
      // In a real app, you would send this to your backend
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-5 max-w-md mx-auto relative bg-slate-950 pb-24">
      <h1 className="text-2xl font-bold text-white mt-8 mb-6 self-start">Today's Task</h1>

      {/* Task Description Card */}
      <div className="w-full bg-slate-900/60 border border-slate-800 p-6 rounded-2xl mb-8 backdrop-blur-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 shrink-0">
            <CheckCircle size={20} />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight mb-2">
              Build Productivity App & Share
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Build a productivity management app. Upload it on LinkedIn and commit it to GitHub. 
              Share your project URL below to maintain your streak!
            </p>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="w-full">
        {hasSubmittedToday ? (
          <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <h3 className="text-green-400 font-bold text-lg mb-2">
              Successfully committed!
            </h3>
            <p className="text-green-500/80 text-sm">
              Your streak has been maintained successfully. See you tomorrow!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon size={16} className="text-slate-500" />
              </div>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your GitHub/LinkedIn URL"
                className="block w-full pl-10 pr-3 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
            >
              <Send size={18} />
              Submit Proof of Work
            </button>
          </form>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
