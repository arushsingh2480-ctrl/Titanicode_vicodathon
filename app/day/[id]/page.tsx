"use client";

import { useState, use } from "react";
import Link from "next/link";
import { getDayById, studentData } from "../../data";
import { ArrowLeft, Copy, Check, Moon, Home, ListChecks, User, Flame } from "lucide-react";

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

export default function ChallengeDayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const day = getDayById(Number(id));
  
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const [copiedGit, setCopiedGit] = useState(false);
  const [copiedLi, setCopiedLi] = useState(false);

  const gitCommitMsg = `feat: complete day ${day.id} - ${day.title}`;
  const linkedinTemplate = `🚀 Day ${day.id} of the 60-day ABTalks challenge!\n\nToday I built: ${day.title}\n\nTask: ${day.description}\n\n#ABTalks #CodingChallenge #MERN #Developer`;

  const handleCopy = (type: 'git' | 'li') => {
    if (type === 'git') {
      navigator.clipboard.writeText(gitCommitMsg);
      setCopiedGit(true);
      setTimeout(() => setCopiedGit(false), 2000);
    } else {
      navigator.clipboard.writeText(linkedinTemplate);
      setCopiedLi(true);
      setTimeout(() => setCopiedLi(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubLink && linkedinLink) {
      setSubmitted(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-5 max-w-md mx-auto relative bg-slate-950 pb-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between w-full mt-8 mb-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back
        </Link>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
          <Moon size={14} /> Focus Mode
        </div>
      </div>

      {/* Task Card */}
      <div className="relative z-10 w-full bg-slate-900/60 p-6 rounded-2xl border border-slate-800 mb-6 backdrop-blur-sm">
        <p className="text-orange-500 text-sm font-bold mb-2 tracking-wider">DAY {day.id} / 60</p>
        <h1 className="text-2xl font-bold text-white mb-3">{day.title}</h1>
        <p className="text-slate-400 leading-relaxed">{day.description}</p>
      </div>

      {/* Submission Form */}
      {submitted ? (
        <div className="relative z-10 w-full bg-green-950/40 border border-green-800/50 rounded-2xl p-8 text-center backdrop-blur-sm mt-4">
          <Check className="text-green-400 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-green-300 mb-2">Proof Submitted!</h2>
          <p className="text-green-400/80 text-sm">Your streak is safe for today. Get some rest and see you tomorrow!</p>
          <Link href="/dashboard" className="mt-6 inline-block bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 w-full space-y-6">
          <h2 className="text-lg font-bold text-white">Submit Proof of Work</h2>

          {/* GitHub Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <GithubIcon width={18} height={18} /> GitHub Commit
            </div>
            
            {/* 1 AM Toolkit */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-sm">
              <code className="text-slate-400 truncate">{gitCommitMsg}</code>
              <button type="button" onClick={() => handleCopy('git')} className="text-slate-400 hover:text-white ml-2 shrink-0">
                {copiedGit ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            
            <input
              type="url"
              required
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="Paste GitHub commit URL"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* LinkedIn Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <LinkedinIcon width={18} height={18} className="text-blue-500" /> LinkedIn Post
            </div>
            
            {/* 1 AM Toolkit */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-sm">
              <span className="text-slate-400 truncate">Auto-post template ready</span>
              <button type="button" onClick={() => handleCopy('li')} className="text-slate-400 hover:text-white ml-2 shrink-0">
                {copiedLi ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>

            <input
              type="url"
              required
              value={linkedinLink}
              onChange={(e) => setLinkedinLink(e.target.value)}
              placeholder="Paste LinkedIn post URL"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/30"
          >
            Complete Day {day.id}
          </button>
        </form>
      )}

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