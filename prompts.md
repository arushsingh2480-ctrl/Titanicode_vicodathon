# AI Usage Log — ABTalks (60 Day Coding Challenge)

**AI Tool Used:** Claude (Anthropic)

This project was built with Claude's help across the full development cycle — from
UI review and debugging to file structure setup, deployment, and documentation.
Below is a summary of how Claude was used.

---

## 1. UI/UX Review & Improvement Suggestions
- Shared a screenshot of the existing "Day Challenge" UI (GitHub commit + LinkedIn
  proof submission screen) and asked for improvement ideas for a hackathon build.
- Claude suggested: a progress bar for day tracking, micro-interactions on the
  Complete button, input validation feedback on the GitHub URL field, copy-to-clipboard
  confirmation toasts, disabled states for the submit button until proof is added,
  and an inline streak badge for motivation.

## 2. Fixing Broken Navigation (Streak & Profile pages)
- Reported that the Streak and Profile tabs in the bottom navigation were not working.
- Shared the project's folder structure; Claude identified that the `streak/` and
  `profile/` route folders did not exist yet in the Next.js app directory.
- Claude generated the missing pages and components:
  - `components/BottomNav.tsx` — shared bottom navigation bar
  - `app/streak/page.tsx` — streak tracking page (current streak, longest streak,
    missed days, achievements)
  - `app/profile/page.tsx` — student profile page (name, track, GitHub/LinkedIn links,
    total progress)
  - `app/dashboard/page.tsx` — dashboard listing all challenge days
  - `app/day/[id]/page.tsx` — individual day page with GitHub/LinkedIn proof submission
  - `app/globals.css` — Tailwind base styles

## 3. Debugging Import & Path Errors
- Ran into a "Cannot find module '@/components/BottomNav'" TypeScript error.
- Claude walked through checking the `components/` folder location (had to be at
  project root, not inside `app/`), verifying the `tsconfig.json` path alias
  (`"@/*": ["./*"]`), restarting the TypeScript server, and clearing a stray nested
  `.git` folder inside `components/` that was blocking `git add`.

## 4. Git & GitHub Workflow
- Guided through initializing git, adding a remote, creating a `frontend` branch,
  resolving a rejected push (`fetch first` error) via
  `git pull origin frontend --allow-unrelated-histories`, and resolving merge
  conflicts.
- Helped write a `.gitignore` and a project `README.md` covering the problem
  statement, tech stack, features, and setup instructions.

## 5. Deployment (Vercel)
- Step-by-step guidance on deploying the Next.js/Vite frontend to Vercel: importing
  the GitHub repo, selecting the correct branch (`main` vs `frontend`), fixing an
  invalid lowercase project-naming error, resolving a "No Next.js version detected"
  build failure caused by deploying from the wrong branch, and deleting a duplicate/
  failed Vercel project via Settings → General → Delete Project.
- Also discussed alternative deployment options (Netlify, GitHub Pages) as backups.

## 6. Hackathon Submission Prep
- Asked what else was needed before submission; Claude outlined a checklist:
  functional testing, deployment, README polish, screenshots, and demo prep.
- Generated this AI usage log itself.

---

**Note:** All final code was reviewed, tested locally (`npm run dev`), and pushed by
the developer before deployment. Claude was used as a pair-programming and debugging
assistant throughout, not as a fully autonomous code generator.
