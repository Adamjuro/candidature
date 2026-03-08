import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Histoire from './sections/Histoire';
import Relations from './sections/Relations';
import Caractere from './sections/Caractere';
import Objectifs from './sections/Objectifs';
import Motivation from './sections/Motivation';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scroll behavior
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger after all content loads
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Histoire />
        <Relations />
        <Caractere />
        <Objectifs />
        <Motivation />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 bg-[#050505] border-t border-[#d508d5]/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 font-['Rajdhani']">
            <span className="text-[#d508d5]">©</span> 2024{' '}
            <span className="gradient-text font-semibold">Gobu Akimichi</span> - Candidature RP
          </p>
          <p className="text-gray-600 text-sm mt-2 font-['Rajdhani']">
            Créé avec <span className="text-[#00f2ff]">♥</span> pour le clan Akimichi
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
