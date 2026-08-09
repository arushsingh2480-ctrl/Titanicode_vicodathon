import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StreakProvider } from "@/components/StreakProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABTalks - 60 Day Coding Challenge",
  description: "Build something every day, maintain your streak, and get noticed by recruiters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <StreakProvider>
            {/* Top Navigation / Header */}
            <div className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full pt-5 px-5 flex justify-between items-center z-50 pointer-events-none">
              <span className="font-extrabold text-xl italic tracking-wider text-white pointer-events-auto">AB TALKS</span>
              <div className="pointer-events-auto">
                <ThemeToggle />
              </div>
            </div>
            
            {children}
          </StreakProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}