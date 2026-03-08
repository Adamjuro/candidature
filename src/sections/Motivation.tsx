import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Gamepad2, Clock, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'ÂGE', value: 21, suffix: ' ANS', icon: User },
  { label: 'DISCORD', value: 'ADAMJURO', isText: true, icon: MessageCircle },
  { label: 'STEAM', value: 'ADAMJURO', isText: true, icon: Gamepad2 },
  { label: 'HEURES DE JEU', value: 1800, suffix: 'H', icon: Clock },
];

export default function Motivation() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Text animation
      gsap.from(textRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Image animation with glitch effect
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 100,
        filter: 'blur(20px)',
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Stats animation with counter
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          // Animate counters
          stats.forEach((stat, index) => {
            if (!stat.isText && typeof stat.value === 'number') {
              const target = stat.value;
              const duration = 2000;
              const startTime = Date.now();

              const updateCounter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeProgress);

                setCounters((prev) => {
                  const newCounters = [...prev];
                  newCounters[index] = current;
                  return newCounters;
                });

                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                }
              };

              setTimeout(() => updateCounter(), index * 200);
            }
          });
        },
        once: true,
      });

      gsap.from(statsRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Glitch effect on image hover
  const handleImageHover = (isHovering: boolean) => {
    if (!imageRef.current) return;

    const img = imageRef.current.querySelector('img');
    if (!img) return;

    if (isHovering) {
      gsap.to(img, {
        x: () => Math.random() * 4 - 2,
        y: () => Math.random() * 4 - 2,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'none',
        onComplete: () => {
          gsap.set(img, { x: 0, y: 0 });
        },
      });
    }
  };

  return (
    <section
      id="motivation"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d508d5]/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-['Orbitron'] text-4xl md:text-6xl font-black mb-4"
          >
            <span className="gradient-text">MOTIVATION</span>
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div ref={textRef} className="space-y-8">
            <div className="glass-card p-8 rounded-xl relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#d508d5]" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#00f2ff]" />

              <p className="font-['Rajdhani'] text-lg text-gray-300 leading-relaxed">
                Devenir <span className="text-[#d508d5] font-semibold">Akimichi</span> me permettrait de développer considérablement mon expérience RP générale. J'ai fais quelques personnages rp sur le Naruto de la Solve et après avoir joué énormément sur{' '}
                <span className="text-[#00f2ff] font-semibold">Josuke Morioh</span>, je sais gérer des scènes avec énormément de joueurs mais je veux pouvoir faire des scènes notamment avec les membres de mon Clan ainsi que les autres clans me ferait grandement progresser.
              </p>
              
              <p className="font-['Rajdhani'] text-lg text-gray-300 leading-relaxed mt-4">
                Par ailleurs je pense que mon RP et mon sérieux n'est plus à prouver. En les rejoignant je pourrai faire un RP encore plus poussé que mon ancien RP qui est déjà très poussé. J'ai hâte de faire un rp pour atteindre mes objectifs personnels et ceux du clan.
              </p>
            </div>

            {/* Stats Grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group glass-card p-4 rounded-lg hover:border-[#d508d5]/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-[#00f2ff]" />
                      <span className="font-['Orbitron'] text-xs text-gray-400 tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                    <p className="font-['Orbitron'] text-xl font-bold text-white">
                      {stat.isText ? (
                        stat.value
                      ) : (
                        <>
                          {counters[index].toLocaleString()}
                          <span className="text-[#d508d5]">{stat.suffix}</span>
                        </>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image with glitch effect */}
          <div
            ref={imageRef}
            className="relative group"
            onMouseEnter={() => handleImageHover(true)}
          >
            {/* Diagonal clip container */}
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d508d5]/30 to-[#00f2ff]/30 rounded-xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-xl border-2 border-[#d508d5]/30 group-hover:border-[#d508d5] transition-colors duration-300">
                <img
                  src="/motivation-josuke.jpg"
                  alt="Josuke Morioh - Personnage précédent"
                  className="w-full h-auto object-cover"
                />
                
                {/* Glitch overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d508d5]/20 to-[#00f2ff]/20 mix-blend-overlay" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#d508d5] animate-scanline" />
                </div>

                {/* Label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-card px-4 py-2 rounded-lg">
                    <p className="font-['Rajdhani'] text-sm text-gray-300">
                      Personnage précédent :
                    </p>
                    <p className="font-['Orbitron'] text-lg font-bold text-[#00f2ff]">
                      Josuke Morioh
                    </p>
                  </div>
                </div>
              </div>

              {/* RGB split effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 mix-blend-screen"
                  style={{
                    background: 'linear-gradient(45deg, rgba(213,8,213,0.1), transparent)',
                    transform: 'translateX(-5px)',
                  }}
                />
                <div
                  className="absolute inset-0 mix-blend-screen"
                  style={{
                    background: 'linear-gradient(-45deg, rgba(0,242,255,0.1), transparent)',
                    transform: 'translateX(5px)',
                  }}
                />
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 px-4 py-2 bg-[#d508d5] rounded-full font-['Orbitron'] text-xs font-bold text-white neon-box-magenta">
              1800H RP
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-[#00f2ff] rounded-full font-['Orbitron'] text-xs font-bold text-black neon-box-cyan">
              EXPÉRIMENTÉ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
