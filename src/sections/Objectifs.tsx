import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Star, Rocket, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const objectifs = {
  courtTerme: {
    title: 'COURT TERME',
    icon: Target,
    color: '#00f2ff',
    items: [
      "Découvrir le clan Akimichi et la vie à Konoha plus en profondeur",
      "Débuter des relations avec les différents genins et créer un petit groupe d'informateurs",
      "Rejoindre la section diplomatique et le journal",
      "Débuter son carnet de cuisine afin de recenser les recettes / ingrédients inconnus",
      "Obtenir l'autorisation d'étudier les herbes célèbres des Nara dans les Bois du Cerf",
    ],
    image: '/obj-training.jpg',
  },
  moyenTerme: {
    title: 'MOYEN TERME',
    icon: Star,
    color: '#d508d5',
    items: [
      "Créer une division de ninja d'archéologues cherchant l'expansion culinaire appelé : les Cuisinologues",
      "Diplomatie par le Banquet : Organiser un sommet récurrent où chaque plat est préparé",
      "Avoir une renommée dans le journal et expandre son réseau dans les autres pays",
      "Unifier le clan sur une philosophie : Ne pas trop dépandre des pillules Akimichi",
      "Faire un tournoi culinaire entre Gourmets dans le village de Konoha",
    ],
    image: '/obj-hands.jpg',
  },
  longTerme: {
    title: 'LONG TERME',
    icon: Crown,
    color: '#00f2ff',
    items: [
      "Créer un plat remplaçant les pillules Akimichi et le démocratiser en créant un restaurant attitré au clan",
      "Devenir le chef de clan pour mettre en place 'Une entente entre les clans' afin de préserver notre statut de Pillier invisible mais indispensable",
      "Faire un tournoi inter-village culinaire entre fins gourmets",
    ],
    image: '/obj-adult.jpg',
  },
};

export default function Objectifs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

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

      // Quote animation
      gsap.from(quoteRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Cards animation
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          opacity: 0,
          y: 100,
          scale: 0.8,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const objectifsList = [objectifs.courtTerme, objectifs.moyenTerme, objectifs.longTerme];

  return (
    <section
      id="objectifs"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Deep space background */}
      <div className="absolute inset-0 bg-[#050505]">
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
        
        {/* Nebula effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d508d5]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            className="font-['Orbitron'] text-4xl md:text-6xl font-black mb-4"
          >
            <span className="neon-text-cyan">LES</span>{' '}
            <span className="text-white">OBJECTIFS</span>
          </h2>
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#d508d5]/20 to-[#00f2ff]/20 rounded-lg blur-xl" />
            <blockquote className="relative font-['Orbitron'] text-xl md:text-2xl italic text-white">
              <span className="text-[#d508d5]">"</span>
              Je suis gracieux, c'est à dire la graisse qui vient du ciel
              <span className="text-[#d508d5]">"</span>
            </blockquote>
          </div>
        </div>

        {/* Objectifs Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {objectifsList.map((obj, index) => {
            const Icon = obj.icon;
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="group relative"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Card */}
                <div
                  className={`relative h-full rounded-xl overflow-hidden transition-all duration-500 ${
                    isActive ? 'scale-105' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(180deg, rgba(26,26,26,0.9) 0%, rgba(10,10,10,0.9) 100%)',
                    border: `1px solid ${obj.color}40`,
                    boxShadow: isActive ? `0 0 40px ${obj.color}30` : 'none',
                  }}
                >
                  {/* Header with image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={obj.image}
                      alt={obj.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                    
                    {/* Title overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${obj.color}40, transparent)`,
                          border: `2px solid ${obj.color}`,
                        }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3
                        className="font-['Orbitron'] text-lg font-bold"
                        style={{ color: obj.color }}
                      >
                        {obj.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <ul className="space-y-4">
                      {obj.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Rocket
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: obj.color }}
                          />
                          <span className="font-['Rajdhani'] text-gray-300 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom glow */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${obj.color}, transparent)`,
                      opacity: isActive ? 1 : 0.3,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Connection constellation lines (decorative) */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-10 hidden lg:block"
          style={{ maxWidth: '1200px' }}
        >
          <line
            x1="20%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="#d508d5"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="50%"
            y1="50%"
            x2="80%"
            y2="50%"
            stroke="#00f2ff"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        </svg>
      </div>
    </section>
  );
}
