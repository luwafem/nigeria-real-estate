import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { listings } from '../data/listings';
import PropertyCard from '../components/PropertyCard';
import { siteConfig } from '../config';
import gsap from 'gsap';

const LandsPage = () => {
  const lands = listings.filter(l => l.type === 'land');
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.from(".land-header", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out"
      });

      // Grid Entrance
      gsap.from(".land-grid-item", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-[#080808] min-h-screen text-white pb-32">
      <Helmet>
        <title>Prime Terrain & Land Assets | {siteConfig.shortName} Reserve</title>
        <meta name="description" content="Strategic land acquisitions across Nigeria's most promising corridors." />
      </Helmet>

      {/* --- HERO HEADER --- */}
      <header className="pt-40 pb-20 px-6 lg:px-16 relative overflow-hidden">
        {/* Subtle background element for land context */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto land-header relative z-10">
          <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-[0.85]">
            Land 
            <span className="italic font-serif opacity-80"> Portfolio</span>
          </h1>
          <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex gap-4 text-[10px] font-bold tracking-[0.2em] text-zinc-400">
              <span className="px-4 py-2 border border-white/10 rounded-full">COMMERCIAL</span>
              <span className="px-4 py-2 border border-white/10 rounded-full">RESIDENTIAL</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- ASSET GRID --- */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          
          {lands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {lands.map(land => (
                <div key={land.id} className="land-grid-item">
                  {/* variant="standard" works best here to maintain the clean grid 
                      while the surrounding black background keeps it 'ultra' */}
                  <PropertyCard property={land} variant="standard" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center border-y border-white/5">
              <h3 className="text-xl font-serif italic text-zinc-500">Currently mapping new opportunities.</h3>
              <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-700 mt-4">Join our private registry for early access.</p>
            </div>
          )}

        </div>
      </section>

      {/* --- INVESTMENT CALL --- */}
      <section className="mt-20 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto p-12 lg:p-20 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
           <div>
             <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
               Secure your <span className="italic font-serif">Future.</span>
             </h2>
             <p className="text-zinc-500 text-sm font-light max-w-sm">
               Speak with our land acquisition specialists regarding C of O verification and portfolio expansion.
             </p>
           </div>
           <a 
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            className="group flex items-center gap-6 px-12 py-6 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:pr-16"
           >
             Contact Land Bureau <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
           </a>
        </div>
      </section>
    </main>
  );
};

export default LandsPage;