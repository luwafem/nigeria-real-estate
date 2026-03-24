import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config';
import { listings } from '../data/listings';
import PropertyCard from '../components/PropertyCard';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('estates');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const heroSlides = siteConfig.hero.slides;

  // Optimized filtered data
  const filteredData = useMemo(() => ({
    estates: listings.filter(l => l.type === 'estate'),
    properties: listings.filter(l => l.type === 'property'),
    lands: listings.filter(l => l.type === 'land'),
  }), []);

  // Handle Responsiveness for Images
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Carousel Auto-play
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, siteConfig.carousel?.autoPlaySpeed || 6000);

    const ctx = gsap.context(() => {
      // Parallax Hero Effect
      gsap.to(".hero-bg-wrapper", {
        yPercent: siteConfig.carousel?.parallaxStrength || 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Bento Reveal Animation
      gsap.utils.toArray(".bento-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            toggleActions: "play none none reverse",
          }
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, [heroSlides.length]);

  return (
    <main ref={containerRef} className="bg-[#080808] text-white overflow-x-hidden">
      <Helmet>
        <title>{siteConfig.name} | Architectural Excellence</title>
      </Helmet>

      {/* --- CINEMATIC GRAPHIC HERO --- */}
      <section className="relative h-[100svh] w-full flex items-end justify-center overflow-hidden bg-black">
        
        <div className="hero-bg-wrapper absolute inset-0 z-0 scale-105">
          {heroSlides.map((slide, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out brightness-[0.75] ${
                currentSlide === idx ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                // Uses mobileImage if screen is small, otherwise desktopImage
                backgroundImage: `url(${isMobile ? slide.mobileImage : slide.desktopImage})` 
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] px-6 sm:px-12 pb-16 md:pb-24">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
            
            {/* Slide Indicators */}
            <div className="flex gap-4 order-2 md:order-1">
              {heroSlides.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-[2px] transition-all duration-500 ${
                    currentSlide === i ? 'w-16 bg-[#D4AF37]' : 'w-6 bg-white/20'
                  }`} 
                />
              ))}
            </div>

            {/* Dynamic Slide CTA */}
            <Link 
              to={heroSlides[currentSlide]?.ctaLink} 
              className="group relative px-14 py-7 bg-white text-black rounded-full font-black text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-all order-1 md:order-2"
            >
              <span className="relative z-10">{heroSlides[currentSlide]?.ctaText}</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 hidden md:flex">
           <span className="text-[7px] uppercase tracking-[0.4em] mb-2">{siteConfig.hero.scrollText}</span>
           <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section className="py-32 px-4 sm:px-12 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-baseline gap-8 mb-24 border-b border-white/5 pb-12">
          <h2 className="text-4xl font-light tracking-tight mb-2">Our Portfolios</h2>
          
          <nav className="flex p-1 bg-zinc-900/40 backdrop-blur-md rounded-full border border-white/5">
            {['estates', 'properties', 'lands'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab ? 'bg-white text-black shadow-2xl' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {filteredData[activeTab].map((item, idx) => (
            <div
              key={item.id}
              className={`bento-item rounded-[3rem] overflow-hidden bg-[#0a0a0a] border border-white/5 transition-transform duration-700 hover:border-white/10 ${
                idx % 3 === 0 
                ? 'lg:col-span-8 aspect-[16/10] lg:aspect-auto' 
                : 'lg:col-span-4 aspect-[4/5] lg:aspect-auto'
              }`}
            >
              <PropertyCard property={item} variant="ultra-luxury" />
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-40 text-center px-6">
        <h2 className="text-6xl md:text-9xl font-light tracking-tighter mb-16">
          Own the <span className="italic font-serif text-[#D4AF37]">Horizon.</span>
        </h2>
        <a 
          href={`https://wa.me/${siteConfig.contact.whatsappNumber}`} 
          className="inline-block px-16 py-8 bg-transparent border border-white/10 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all"
        >
          Request Private Briefing
        </a>
      </section>
    </main>
  );
};

export default HomePage;