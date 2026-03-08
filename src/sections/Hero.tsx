import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });
      gsap.set(characterRef.current, {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(20px)',
      });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(characterRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out',
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        );

      // Scroll parallax for character
      gsap.to(characterRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Title letter spacing on scroll
      gsap.to(titleRef.current, {
        letterSpacing: '0.3em',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse tilt effect for character
  useEffect(() => {
    const character = characterRef.current;
    if (!character) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = character.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateY = ((e.clientX - centerX) / window.innerWidth) * 10;
      const rotateX = ((e.clientY - centerY) / window.innerHeight) * -10;

      gsap.to(character, {
        rotateY,
        rotateX,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(character, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    character.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      character.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d508d5]/20 rounded-full blur-[120px] animate-pulse-neon" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f2ff]/20 rounded-full blur-[120px] animate-pulse-neon" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p
              ref={subtitleRef}
              className="font-['Rajdhani'] text-lg md:text-xl text-[#00f2ff] mb-4 tracking-widest"
            >
              CLAN DES AKIMICHI
            </p>
            
            <h1
              ref={titleRef}
              className="font-['Orbitron'] text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 glitch-effect"
              data-text="GOBU AKIMICHI"
            >
              <span className="neon-text-magenta">GOBU</span>
              <br />
              <span className="gradient-text">AKIMICHI</span>
            </h1>

            <p className="font-['Rajdhani'] text-xl md:text-2xl text-gray-300 mb-8">
              <span className="text-[#d508d5]">Le</span> Gracieux{' '}
              <span className="text-[#00f2ff]">//</span> L'Héritier de la Colline
            </p>

            <a
              ref={ctaRef}
              href="#histoire"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#histoire')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#d508d5] text-white font-['Orbitron'] font-bold text-lg rounded hover:bg-[#d508d5]/10 transition-all duration-300 group neon-border-magenta"
            >
              <span>DÉCOUVRIR L'HISTOIRE</span>
              <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Character Image */}
          <div
            ref={characterRef}
            className="relative order-1 lg:order-2"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow behind character */}
            <div className="absolute inset-0 bg-gradient-radial from-[#d508d5]/30 via-transparent to-transparent blur-3xl scale-150" />
            
            {/* Character image */}
            <img
              src="/hero-gobu.png"
              alt="Gobu Akimichi"
              className="relative z-10 w-64 md:w-80 lg:w-96 h-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(213, 8, 213, 0.5))',
              }}
            />

            {/* Floating particles around character */}
            <div className="absolute -top-10 -left-10 w-4 h-4 bg-[#00f2ff] rounded-full animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute -bottom-5 -right-5 w-3 h-3 bg-[#d508d5] rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 -right-10 w-2 h-2 bg-[#00f2ff] rounded-full animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
