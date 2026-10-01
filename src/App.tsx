import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ProductionPortfolio } from './components/ProductionPortfolio';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Project } from './data/projects';

export default function App() {
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState<Project | null>(null);

  // Initialize Lenis Smooth Momentum Scroll Engine (Award-Winning 60fps Scroll)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Make lenis globally accessible for smooth anchor scrolling
    (window as any).lenis = lenis;

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  const handleOpenCaseStudy = (project: Project) => {
    setActiveCaseStudyProject(project);
  };

  const handleCloseCaseStudy = () => {
    setActiveCaseStudyProject(null);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Production Portfolio: DESIGN A - Immersive Dark / Motion in Pure White Luminous Style */}
      <ProductionPortfolio onOpenCaseStudy={handleOpenCaseStudy} />

      {/* Case Study Modal */}
      {activeCaseStudyProject && (
        <CaseStudyModal
          project={activeCaseStudyProject}
          onClose={handleCloseCaseStudy}
        />
      )}
    </div>
  );
}
