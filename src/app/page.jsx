"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import DemosSection from "@/components/DemosSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedDemo, setSelectedDemo] = useState("java");

  const handleSelectDemo = (demoId) => {
    if (demoId) {
      setSelectedDemo(demoId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text antialiased selection:bg-accent selection:text-accent-fg">
      <Navbar />
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
    </div>
  );
}
