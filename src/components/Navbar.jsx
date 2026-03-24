import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glass background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', path: '/properties' },
    { name: 'Lands', path: '/lands' },
    { name: 'Estates', path: '/estates' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center">
        
        {/* --- LOGO --- */}
        <Link to="/" className="relative z-[110] flex items-center gap-3 group">
          <div className="h-8 w-12  flex items-center justify-center overflow-hidden  transition-transform duration-700">
             <img src={siteConfig.logo} alt="Logo" className="w-12 h-8 " />
          </div>
          <span className="text-lg font-md uppercase tracking-[0.3em] text-white">
            {siteConfig.name}
          </span>
        </Link>

        {/* --- DESKTOP MENU (Floating Pill) --- */}
        <div className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border transition-all duration-500 ${
          scrolled 
          ? 'bg-black/40 backdrop-blur-2xl border-white/10' 
          : 'bg-transparent border-transparent'
        }`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                ${isActive ? 'bg-white text-black' : 'text-white/60 hover:text-white'}
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* --- ACTION BUTTON --- */}
        <div className="hidden md:block">
          <a 
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            className="px-8 py-3 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Enquire
          </a>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          className="relative z-[110] md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset-0 bg-black z-[105] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-light tracking-tighter text-white hover:italic transition-all"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            className="mt-8 px-12 py-5 rounded-full border border-white/20 text-white uppercase text-xs tracking-widest"
          >
            WhatsApp Concierge
          </a>
        </div>
        
        {/* Subtle background text for mobile menu */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10vw] font-black text-white/5 whitespace-nowrap pointer-events-none uppercase">
          {siteConfig.name} 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;