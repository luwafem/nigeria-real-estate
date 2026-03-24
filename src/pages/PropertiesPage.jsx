import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { listings } from '../data/listings';
import PropertyCard from '../components/PropertyCard';
import { siteConfig } from '../config';
import gsap from 'gsap';

const PropertiesPage = () => {
  // Filter for properties (apartments, villas, penthouses)
  const properties = listings.filter(l => l.type === 'property');
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(".page-header", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });

      // Staggered card entrance
      gsap.from(".property-grid-item", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-[#080808] min-h-screen text-white pb-32">
      <Helmet>
        <title>The Property Collection | {siteConfig.shortName} Reserve</title>
        <meta name="description" content="A curated selection of Nigeria's most prestigious architectural achievements." />
      </Helmet>

      {/* --- MINIMALIST HEADER --- */}
      <header className="pt-40 pb-20 px-6 lg:px-16 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto page-header">
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-none">
            Our <span className="italic font-serif opacity-80">Portfolio.</span>
          </h1>
          <p className="mt-8 max-w-xl text-zinc-400 text-sm md:text-lg font-light leading-relaxed">
           
          </p>
        </div>
      </header>

      {/* --- GRID SECTION --- */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {properties.map(property => (
                <div key={property.id} className="property-grid-item">
                  {/* Using 'standard' variant here but it will look premium 
                      because of the surrounding dark aesthetic */}
                  <PropertyCard property={property} variant="standard" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-600">
                The collection is currently private.
              </p>
              <p className="text-zinc-800 italic font-serif mt-2">Check back shortly for new acquisitions.</p>
            </div>
          )}

        </div>
      </section>

      {/* --- INQUIRY BAR --- */}
      <section className="mt-20 px-6">
        <div className="max-w-[1400px] mx-auto py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <h2 className="text-2xl font-light tracking-tight text-zinc-400">
             Looking for something <span className="text-white italic font-serif">off-market?</span>
           </h2>
           <a 
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
           >
             Private Briefing
           </a>
        </div>
      </section>
    </main>
  );
};

export default PropertiesPage;