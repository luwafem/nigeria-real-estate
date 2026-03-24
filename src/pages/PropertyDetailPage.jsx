import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getListingById } from '../data/listings';
import { siteConfig, whatsappMessage } from '../config';
import ContactForm from '../components/ContactForm';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const property = getListingById(id);
  const detailRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (property) {
      const ctx = gsap.context(() => {
        gsap.from(".reveal", { 
          y: 40, 
          opacity: 0, 
          stagger: 0.1, 
          duration: 1, 
          ease: "expo.out" 
        });
      }, detailRef);
      return () => ctx.revert();
    }
  }, [property]);

  if (!property) return (
    <div className="h-screen flex items-center justify-center bg-[#080808] text-white">
      <p className="tracking-[0.5em] uppercase text-xs opacity-50">Property Not Found</p>
    </div>
  );

  const formatPrice = (price) => `₦${price.toLocaleString()}`;
  const waLink = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage(property.title, property.price, window.location.href))}`;

  return (
    <main ref={detailRef} className="bg-[#080808] text-white min-h-screen pb-20">
      <Helmet>
        <title>{property.title} | {siteConfig.shortName} Reserve</title>
        <meta name="description" content={property.description.substring(0, 160)} />
      </Helmet>

      {/* --- HERO GALLERY --- */}
      <section className="relative h-[75vh] w-full overflow-hidden bg-zinc-900">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />
        
        <div className="absolute bottom-12 left-0 w-full px-6 lg:px-16">
          <div className="reveal mb-6">
            <Link to="/properties" className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] hover:text-white transition-colors inline-block">
              ← Return to Collection
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="reveal text-4xl md:text-7xl font-light tracking-tighter leading-none max-w-4xl">
              {property.title}
            </h1>
            {property.status && (
              <span className="reveal backdrop-blur-md bg-white/10 border border-white/20 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] text-white font-bold w-fit">
                {property.status}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- LEFT: THE STORY --- */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Essential Stats (Dynamic Logic) */}
            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">Investment</p>
                <p className="text-xl font-bold text-white tracking-tight">{formatPrice(property.price)}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">Location</p>
                <p className="text-sm font-medium">{property.location}</p>
              </div>

              {/* Conditional Rendering for Property Type */}
              {property.type === 'estate' ? (
                 <div>
                    <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">Development</p>
                    <p className="text-sm font-medium">{property.units}</p>
                 </div>
              ) : property.type === 'property' ? (
                <div>
                   <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">Accommodates</p>
                   <p className="text-sm font-medium">{property.bedrooms} Bedrooms</p>
                </div>
              ) : (
                <div>
                   <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">Usage</p>
                   <p className="text-sm font-medium">{property.category}</p>
                </div>
              )}

              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">Surface Area</p>
                <p className="text-sm font-medium">{property.landSize}</p>
              </div>
            </div>

            {/* Narrative Description */}
            <div className="reveal max-w-3xl">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-8 font-bold">The Narrative</h2>
              <p className="text-xl lg:text-3xl font-light leading-snug text-zinc-200">
                {property.description}
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4">
               {property.images.slice(1, 3).map((img, idx) => (
                 <div key={idx} className="overflow-hidden rounded-3xl aspect-[4/5] bg-zinc-900">
                   <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="" />
                 </div>
               ))}
            </div>

            {/* Refinements / Features */}
            <div className="reveal border-t border-white/10 pt-16">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-12">Distinguishing Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {property.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-light text-zinc-400 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] group-hover:scale-150 transition-transform" /> 
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Map (Luxury Styled) */}
            {property.mapLocation && (
              <div className="reveal border-t border-white/10 pt-16">
                 <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-8">Position</h3>
                 <div className="rounded-[2.5rem] overflow-hidden grayscale contrast-125 brightness-75 border border-white/5 bg-zinc-900">
                    <iframe src={property.mapLocation} width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" />
                 </div>
              </div>
            )}
          </div>

          {/* --- RIGHT: THE CONCIERGE (Sticky) --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-zinc-900 border border-white/5 p-8 lg:p-10 rounded-[2.5rem]">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-8 font-bold">Inquire</h4>
                <ContactForm propertyTitle={property.title} />
              </div>
              
              <a 
                href={waLink} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-6 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] transition-colors"
              >
                Instant WhatsApp Access
              </a>

              <div className="p-8 border border-white/10 rounded-[2.5rem] flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-lg font-serif italic text-[#D4AF37] border border-white/5">
                    {property.agent?.charAt(0) || 'A'}
                 </div>
                 <div>
                    <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">Portfolio Manager</p>
                    <p className="text-md font-medium text-white">{property.agent || 'Lead Advisor'}</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default PropertyDetailPage;