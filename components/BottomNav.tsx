"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks, Flame, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard", label: "Tasks", icon: ListChecks }, // tasks bhi dashboard pe hi list hoti hai
  { href: "/streak", label: "Streak", icon: Flame },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur border-t border-slate-800 max-w-md mx-auto">
      <div className="flex justify-around py-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center gap-1 text-xs ${
                isActive ? "text-orange-500" : "text-slate-500"
              }`}
            >
              <Icon size={22} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}