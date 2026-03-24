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

  const filteredData = useMemo(() => ({
    estates: listings.filter(l => l.type === 'estate'),
    properties: listings.filter(l => l.type === 'property'),
    lands: listings.filter(l => l.type === 'land'),
  }), []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP: Initial Page Animations
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, siteConfig.carousel?.autoPlaySpeed || 6000);

    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, [heroSlides.length]);

  // GSAP: Tab Switch Animation
  useEffect(() => {
    gsap.fromTo(".bento-item", 
      { opacity: 0, y: 30, scale: 0.98 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        stagger: 0.08, 
        duration: 0.8, 
        ease: "expo.out",
        clearProps: "all" 
      }
    );
  }, [activeTab]);

  return (
    <main ref={containerRef} className="bg-[#080808] text-white overflow-x-hidden">
      <Helmet>
        <title>{siteConfig.name} | Architectural Excellence</title>
      </Helmet>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[100svh] w-full flex items-end justify-center overflow-hidden bg-black">
        <div className="hero-bg-wrapper absolute inset-0 z-0 scale-105">
          {heroSlides.map((slide, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out brightness-[0.75] ${
                currentSlide === idx ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${isMobile ? slide.mobileImage : slide.desktopImage})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] px-6 sm:px-12 pb-16 md:pb-24">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
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

            <Link 
              to={heroSlides[currentSlide]?.ctaLink} 
              className="group relative px-14 py-7 bg-white text-black rounded-full font-black text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-all order-1 md:order-2"
            >
              <span className="relative z-10">{heroSlides[currentSlide]?.ctaText}</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section className="py-24 md:py-32 px-4 sm:px-12 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-baseline gap-10 mb-16 md:mb-24 border-b border-white/5 pb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-center lg:text-left">
            Our Portfolios
          </h2>
          
          <nav className="flex w-full md:w-auto p-1 bg-zinc-900/40 backdrop-blur-md rounded-full border border-white/5 overflow-x-auto no-scrollbar justify-center">
            <div className="flex gap-1">
              {['estates', 'properties', 'lands'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-7 md:px-10 py-3.5 md:py-4 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    activeTab === tab ? 'bg-white text-black shadow-2xl' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          {filteredData[activeTab].map((item, idx) => (
            <div
              key={`${activeTab}-${item.id}`}
              className={`bento-item rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#0a0a0a] border border-white/5 transition-all duration-700 hover:border-white/20 ${
                idx % 3 === 0 
                ? 'lg:col-span-8 aspect-[4/5] md:aspect-[16/10]' 
                : 'lg:col-span-4 aspect-[4/5]'
              }`}
            >
              <PropertyCard property={item} variant="ultra-luxury" />
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-40 text-center px-6">
        <h2 className="text-5xl md:text-9xl font-light tracking-tighter mb-16">
          Own the <span className="italic font-serif text-[#D4AF37]">Horizon.</span>
        </h2>
        <a 
          href={`https://wa.me/${siteConfig.contact.whatsappNumber}`} 
          className="inline-block px-12 md:px-16 py-7 md:py-8 bg-transparent border border-white/10 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all"
        >
          Request Private Briefing
        </a>
      </section>
    </main>
  );
};

export default HomePage;