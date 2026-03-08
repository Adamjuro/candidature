import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storyCards = [
  {
    image: '/gobu-young.jpg',
    text: "Gobu n'a pas toujours été le fier descendant d'esprits géants décrit dans les mythes de son clan. À l'académie, sa constitution physique exceptionnelle était mal comprise par ses camarades. Alors que les Akimichi voient dans leur corps un réservoir capable d'accumuler une énergie colossale, les autres enfants n'y voyaient qu'une cible facile.",
    side: 'left',
  },
  {
    image: '/gobu-reading.jpg',
    text: "Ce harcèlement constant a forgé chez Gobu une profonde tristesse, mais aussi une bonté du cœur inébranlable. Au lieu de rendre les coups, il se réfugiait dans les archives du clan, cherchant à comprendre pourquoi ses ancêtres, ces bâtisseurs de légende, étaient autrefois respectés comme les piliers de Konoha.",
    side: 'right',
  },
  {
    image: '/ramen.jpg',
    text: "Gobu est un érudit du goût. Pour lui, la cuisine est une forme d'art la plus pure et mérite d'être partagée. Ayant souffert du regard des autres étant petit, il a transformé sa différence en une expertise unique. Il connaît les bienfaits de chaque racine et le secret de chaque épice.",
    side: 'left',
  },
];

export default function Histoire() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Spine animation
      gsap.from(spineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Card animations
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const isLeft = storyCards[index].side === 'left';

        gsap.from(card, {
          opacity: 0,
          x: isLeft ? -100 : 100,
          scale: 0.9,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="histoire"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-['Orbitron'] text-4xl md:text-6xl font-black mb-4"
          >
            <span className="text-white">L'</span>
            <span className="gradient-text">HISTOIRE</span>
          </h2>
          <p className="font-['Rajdhani'] text-xl text-[#00f2ff] tracking-widest">
            DE L'OMBRE À LA LUMIÈRE
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Spine */}
          <div
            ref={spineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-[#d508d5] via-[#00f2ff] to-[#d508d5] neon-border-magenta"
          />

          {/* Story Cards */}
          <div className="space-y-16 md:space-y-24">
            {storyCards.map((card, index) => (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  card.side === 'right' ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#0a0a0a] border-4 border-[#d508d5] rounded-full z-10 hidden md:block neon-border-magenta" />

                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d508d5]/30 to-[#00f2ff]/30 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <img
                      src={card.image}
                      alt={`Histoire ${index + 1}`}
                      className="relative w-48 h-48 md:w-56 md:h-56 object-cover rounded-lg border-2 border-[#d508d5]/50 group-hover:border-[#d508d5] transition-all duration-300 neon-box-magenta"
                    />
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2ff]/10 to-transparent animate-scanline" />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <div className="glass-card p-6 rounded-lg hover:translate-z-20 transition-transform duration-300 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d508d5] to-[#00f2ff] rounded-lg opacity-0 group-hover:opacity-30 transition-opacity blur" />
                    <p className="relative font-['Rajdhani'] text-lg text-gray-300 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
