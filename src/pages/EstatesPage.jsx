import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { listings } from '../data/listings';
import PropertyCard from '../components/PropertyCard';
import { siteConfig } from '../config';
import gsap from 'gsap';

const EstatesPage = () => {
  const estates = listings.filter(l => l.type === 'estate');
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Cinematic Hero Entrance
      gsap.from(".estate-hero-content", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      });

      // Card Stagger
      gsap.from(".estate-grid-item", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        delay: 0.4
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-[#080808] min-h-screen text-white pb-32">
      <Helmet>
        <title>Gated Communities & Estates | {siteConfig.shortName} Reserve</title>
        <meta name="description" content="Secure, master-planned luxury estates across Nigeria's most prestigious districts." />
      </Helmet>

      {/* --- CINEMATIC HERO --- */}
      <section className="relative h-[80vh] w-full flex items-end pb-24 px-6 lg:px-16 overflow-hidden">
        {/* Background Overlay Image - Suggest using a high-end architectural shot */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.3] grayscale-[0.4] scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40" />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full estate-hero-content">
         
          <h1 className="text-6xl md:text-[10vw] font-light tracking-tighter leading-[0.8] mb-10">
            Private <br />
            <span className="italic font-serif">Estates</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-end">
            <p className="max-w-md text-zinc-400 text-xs md:text-sm font-light leading-relaxed tracking-wide">
              We curate access to Nigeria's most secure and architecturally significant gated communities. 
              Infrastructure, security, and lifestyle.
            </p>
            <a 
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:invert transition-all"
            >
              Consult an Advisor
            </a>
          </div>
        </div>
      </section>

      {/* --- THE COLLECTION GRID --- */}
      <section className="py-32 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-20 opacity-30">
            <span className="text-[10px] uppercase tracking-[1em]">Available Acquisitions</span>
            <div className="flex-1 h-[1px] bg-white/20" />
          </div>

          {estates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
              {estates.map((estate, idx) => (
                <div 
                  key={estate.id} 
                  className={`estate-grid-item ${
                    idx % 3 === 0 ? 'lg:col-span-8' : 'lg:col-span-4'
                  }`}
                >
                  {/* variant="ultra-luxury" fits perfectly for Estates */}
                  <PropertyCard property={estate} variant="ultra-luxury" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center border border-white/5 rounded-[3rem]">
              <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-600">
                All Enclaves are currently fully committed.
              </p>
              <p className="text-zinc-400 italic font-serif mt-4 text-xl">Join the waitlist for Q4 developments.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- ESTATE FEATURES CALLOUT --- */}
      <section className="py-20 px-6 lg:px-16 bg-zinc-900/30">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          {[
            { label: "Security", desc: "Biometric access & 24/7 tactical surveillance." },
            { label: "Infrastructure", desc: "Underground cabling & fiber-optic readiness." },
            { label: "Wellness", desc: "Private clubhouses, spas, and curated greenery." }
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-black">{item.label}</h4>
              <p className="text-zinc-500 text-xs font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default EstatesPage;