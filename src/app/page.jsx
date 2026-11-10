"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import DemosSection from "@/components/DemosSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  const [selectedDemo, setSelectedDemo] = useState("java");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Global shortcut to open command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectDemo = (demoId) => {
    if (demoId) {
      setSelectedDemo(demoId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-main)] antialiased">
      <Navbar onOpenCommandPalette={() => setIsPaletteOpen(true)} />

      <main className="flex-1">
        <Hero />
        <ProjectsSection onSelectDemo={handleSelectDemo} />
        <DemosSection selectedTab={selectedDemo} onTabChange={setSelectedDemo} />
        <SkillsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Global Spotlight / Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectDemo={handleSelectDemo}
      />
    </div>
  );
}
