import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Eye, Utensils, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const traits = [
  {
    title: 'BIENVEILLANT',
    icon: Heart,
    description:
      "Marqué par les moqueries de son enfance, Gobu a développé une empathie immense, mais elle est active. Il ne se contente pas de plaindre les gens, il veut les nourrir et les réparer.",
    color: '#d508d5',
  },
  {
    title: 'CURIEUX',
    icon: Eye,
    description:
      "Gobu ne vit pas dans le monde, il l'analyse. Il est dans un état de recherche constante. Il n'a aucun dégoût. Pour comprendre le secret d'une terre ou d'une ruine, il est prêt à croquer un morceau de bois ou à lécher une pierre.",
    color: '#00f2ff',
  },
  {
    title: 'GOURMAND',
    icon: Utensils,
    description:
      "Gobu n'est pas un glouton qui s'empiffre sans réfléchir. Sa gourmandise est passionnée et instruite. Il ne mange pas une brochette, il en étudie la cuisson, la provenance du sel et l'équilibre des graisses.",
    color: '#d508d5',
  },
  {
    title: 'IMPULSIF',
    icon: Zap,
    description:
      "Voir quelqu'un jeter un reste ou mépriser un ingrédient déclenche en lui une colère volcanique : il perd tout filtre, devenant un prédateur imprévisible capable d'une violence brutale pour 'venger' le produit.",
    color: '#00f2ff',
  },
];

export default function Caractere() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Columns animation with 3D rotation
      columnRefs.current.forEach((column, index) => {
        if (!column) return;

        gsap.from(column, {
          opacity: 0,
          rotateX: 45,
          y: 100,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: column,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        // Continuous icon rotation on scroll
        const icon = column.querySelector('.trait-icon');
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="caractere"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkNTA4ZDUiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-['Orbitron'] text-4xl md:text-6xl font-black mb-4"
          >
            <span className="text-white">LE</span>{' '}
            <span className="gradient-text">CARACTÈRE</span>
          </h2>
          <p className="font-['Rajdhani'] text-xl text-[#00f2ff] tracking-widest">
            LES QUATRE PILIERS
          </p>
        </div>

        {/* Traits Grid - 3D Perspective */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {traits.map((trait, index) => {
            const Icon = trait.icon;
            return (
              <div
                key={index}
                ref={(el) => { columnRefs.current[index] = el; }}
                className="group relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative h-full bg-gradient-to-b from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-sm rounded-xl p-6 border border-[#d508d5]/20 transition-all duration-500 hover:border-[#d508d5]/60 hover:scale-105 hover:-translate-y-2">
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: `radial-gradient(circle at center, ${trait.color}15, transparent 70%)`,
                    }}
                  />

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="trait-icon relative w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${trait.color}30, transparent)`,
                        border: `2px solid ${trait.color}`,
                        boxShadow: `0 0 30px ${trait.color}40`,
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                      
                      {/* Pulse ring */}
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-30"
                        style={{ border: `2px solid ${trait.color}` }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-['Orbitron'] text-xl font-bold text-center mb-4"
                    style={{ color: trait.color }}
                  >
                    {trait.title}
                  </h3>

                  {/* Description */}
                  <p className="font-['Rajdhani'] text-gray-400 text-center text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {trait.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-1/2 transition-all duration-500"
                    style={{ background: trait.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#d508d5] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-[#00f2ff] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
}
