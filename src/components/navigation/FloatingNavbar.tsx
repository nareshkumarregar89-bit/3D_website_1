import * as React from "react";
import { motion } from "framer-motion";
import { Home, Cpu, Sparkles, Globe, Send, Droplets, User, Sun, Moon } from "lucide-react";

export type NavTab = "home" | "machine" | "studio" | "explore" | "flights" | "weather" | "profile";

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "machine", label: "Machine", icon: Cpu },
  { id: "studio", label: "Naresh", icon: Sparkles },
  { id: "explore", label: "Explore", icon: Globe },
  { id: "flights", label: "Flights", icon: Send },
  { id: "weather", label: "Weather", icon: Droplets },
  { id: "profile", label: "Profile", icon: User },
];

interface FloatingNavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  activeTab,
  onTabChange,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="fixed top-5 inset-x-0 z-50 flex items-center justify-center px-3 sm:px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 max-w-full overflow-x-auto no-scrollbar py-1">
        {/* Main Pill Navbar matching Image 1 */}
        <nav
          aria-label="Main Navigation"
          className="relative flex items-center rounded-full p-1.5 transition-all duration-300
                     bg-[#ebf4f8]/90 dark:bg-[#0c121e]/90 backdrop-blur-xl
                     border border-white/80 dark:border-white/10
                     shadow-[0_12px_40px_-8px_rgba(30,58,138,0.12),0_4px_16px_rgba(0,0,0,0.04)]
                     dark:shadow-[0_16px_45px_rgba(0,0,0,0.5)]"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 outline-none select-none rounded-full whitespace-nowrap
                  ${
                    isActive
                      ? "text-[#0f172a] dark:text-white"
                      : "text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white"
                  }`}
              >
                {/* Active Iridescent Glowing Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                    className="absolute inset-0 rounded-full -z-10 p-[1.5px]"
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg, rgba(56,189,248,0.9), rgba(168,85,247,0.8), rgba(52,211,153,0.9))"
                        : "linear-gradient(135deg, rgba(56,189,248,0.85), rgba(147,197,253,0.7), rgba(110,231,183,0.8))",
                      boxShadow: isDark
                        ? "0 0 16px rgba(56,189,248,0.35), inset 0 1px 1px rgba(255,255,255,0.2)"
                        : "0 0 18px rgba(56,189,248,0.4), inset 0 1px 2px rgba(255,255,255,0.9)",
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full transition-colors duration-200"
                      style={{
                        background: isDark
                          ? "linear-gradient(180deg, #131c2e 0%, #0c121e 100%)"
                          : "linear-gradient(180deg, #ffffff 0%, #f0f7fb 100%)",
                        boxShadow: isDark
                          ? "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.4)"
                          : "inset 0 1px 2px #ffffff, inset 0 -1px 2px rgba(186,230,253,0.5)",
                      }}
                    />
                  </motion.div>
                )}

                <Icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-200 ${isActive ? "scale-105 stroke-[2.2]" : "stroke-[1.8]"}`} />
                <span className="tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
          className="flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-full transition-all duration-300 shrink-0
                     bg-[#ebf4f8]/90 dark:bg-[#0c121e]/90 backdrop-blur-xl
                     border border-white/80 dark:border-white/10
                     text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white
                     shadow-[0_8px_24px_-4px_rgba(30,58,138,0.1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                     hover:scale-105 active:scale-95 outline-none"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
        </button>
      </div>
    </header>
  );
};
