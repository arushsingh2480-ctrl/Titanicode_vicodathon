export const studentData = {
  name: "Rahul",
  track: "Full Stack MERN",
  currentStreak: 11,
  longestStreak: 11,
  totalDaysCompleted: 11,
  totalChallenges: 60,
  missedDays: [8], // Edge case: Missed day 8
  githubUrl: "github.com/rahul-codes",
  linkedinUrl: "linkedin.com/in/rahul",
  achievements: ["First Commit", "7-Day Streak", "API Master"],
};

export const challengeData = [
  { id: 1, title: "Setup Dev Environment", description: "Install Node.js, VS Code, and create your first React app." },
  { id: 8, title: "Build a Timer", description: "Create a simple countdown timer using useEffect." },
  { id: 12, title: "Build a REST API", description: "Create a simple Express server with CRUD operations for a todo app." },
  { id: 13, title: "Connect React to Express", description: "Fetch data from your REST API and display it." }
];

export const getDayById = (id: number) => {
  return challengeData.find(day => day.id === parseInt(id.toString())) || challengeData[2];
};