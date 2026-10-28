import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingNavbar, type NavTab } from "@/components/navigation/FloatingNavbar";
import { HomePage } from "@/components/pages/HomePage";
import { MachinePage } from "@/components/pages/MachinePage";
import { StudioPage } from "@/components/pages/StudioPage";
import { ExplorePage } from "@/components/pages/ExplorePage";
import { FlightsPage } from "@/components/pages/FlightsPage";
import { WeatherPage } from "@/components/pages/WeatherPage";
import { ProfilePage } from "@/components/pages/ProfilePage";

export default function App() {
  const [activeTab, setActiveTab] = React.useState<NavTab>("home");
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return false;
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* Floating Pill Navigation Bar */}
      <FloatingNavbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Multi-Page Screen Switcher */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <HomePage onNavigate={setActiveTab} />
            </motion.div>
          )}

          {activeTab === "machine" && (
            <motion.div
              key="machine"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <MachinePage />
            </motion.div>
          )}

          {activeTab === "studio" && (
            <motion.div
              key="studio"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <StudioPage />
            </motion.div>
          )}

          {activeTab === "explore" && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <ExplorePage />
            </motion.div>
          )}

          {activeTab === "flights" && (
            <motion.div
              key="flights"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <FlightsPage />
            </motion.div>
          )}

          {activeTab === "weather" && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <WeatherPage />
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <ProfilePage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
