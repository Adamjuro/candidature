import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Eye, Utensils } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const relations = [
  {
    title: 'Avec les Genin',
    subtitle: 'Le pote généreux',
    icon: Users,
    image: '/relation-eating.jpg',
    description:
      "Il est le 'pote généreux'. Si un coéquipier a oublié son repas, Gobu partage le sien, mais attention : si le coéquipier laisse une miette, Gobu lui casse la gueule. Il ne juge pas par le sang, mais par l'appétit et le respect du plat.",
    color: '#d508d5',
  },
  {
    title: "L'ombre des Uchiwa",
    subtitle: 'Fascination',
    icon: Eye,
    image: '/relation-curious.jpg',
    description:
      "Il regarde les Uchiwa de loin avec fascination. Il pense sincèrement qu'ils sont grincheux parce qu'ils ne mangent pas assez de glucides. Il a déjà essayé d'offrir un onigiri à un Uchiwa, qui l'a rembarré. Gobu a noté dans son carnet : 'Sujet n°1 : Résistance aux saveurs. Nécessite un bouillon plus agressif.'",
    color: '#00f2ff',
  },
  {
    title: 'Avec tout le village',
    subtitle: "L'oreille sélective",
    icon: Utensils,
    image: '/relation-butterfly.jpg',
    description:
      "Gobu a développé une ouïe sélective redoutable. Sous ses airs de petit garçon concentré sur son bol de riz, il capte toutes les conversations aux tables voisines. Pour lui, chaque murmure est une 'actualité' potentielle.",
    color: '#d508d5',
  },
];

export default function Relations() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<SVGPathElement>(null);

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

      // Cards staggered animation
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // SVG line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="relations"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_#d508d5/10,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_#00f2ff/10,_transparent_50%)]" />
      </div>

      {/* Connection Lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M 100 200 Q 400 100 700 300 T 1300 200"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d508d5" />
            <stop offset="100%" stopColor="#00f2ff" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-['Orbitron'] text-4xl md:text-6xl font-black mb-4"
          >
            <span className="text-white">LES</span>{' '}
            <span className="neon-text-magenta">RELATIONS</span>
          </h2>
          <p className="font-['Rajdhani'] text-xl text-[#00f2ff] tracking-widest">
            LE RÉSEAU D'INFORMATIONS
          </p>
        </div>

        {/* Relations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {relations.map((relation, index) => {
            const Icon = relation.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full glass-card rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${relation.color}20, transparent 70%)`,
                    }}
                  />

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relation.image}
                      alt={relation.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    
                    {/* Icon badge */}
                    <div
                      className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${relation.color}40, transparent)`,
                        border: `2px solid ${relation.color}`,
                        boxShadow: `0 0 20px ${relation.color}50`,
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <h3
                      className="font-['Orbitron'] text-xl font-bold mb-1"
                      style={{ color: relation.color }}
                    >
                      {relation.title}
                    </h3>
                    <p className="font-['Rajdhani'] text-sm text-gray-400 mb-4">
                      {relation.subtitle}
                    </p>
                    <p className="font-['Rajdhani'] text-gray-300 leading-relaxed text-sm">
                      {relation.description}
                    </p>
                  </div>

                  {/* Bottom border glow */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${relation.color}, transparent)`,
                      boxShadow: `0 0 10px ${relation.color}`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
