import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Portfolio', path: '/properties' },
    { name: 'Lands', path: '/lands' },
    { name: 'Estates', path: '/estates' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'py-3 md:py-4 bg-black/20 backdrop-blur-lg' : 'py-6 md:py-8 bg-transparent'
    }`}>
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 flex justify-between items-center">
        
        {/* --- LOGO: Scale text for small devices --- */}
        <Link to="/" className="relative z-[110] flex items-center gap-2 md:gap-3 group">
          <div className="h-6 md:h-8 w-10 md:w-12 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
             <img src={siteConfig.logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-sm md:text-lg font-medium uppercase tracking-[0.2em] md:tracking-[0.3em] text-white">
            {siteConfig.name}
          </span>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border transition-all duration-500 ${
          scrolled ? 'bg-black/40 backdrop-blur-2xl border-white/10' : 'bg-transparent border-transparent'
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

        {/* --- DESKTOP ENQUIRE --- */}
        <div className="hidden md:block">
          <a 
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            className="px-8 py-3 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
          >
            Enquire
          </a>
        </div>

        {/* --- MOBILE TOGGLE: Refined Hamburger --- */}
        <button 
          className="relative z-[110] md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY: Better spacing & text handling --- */}
      <div className={`fixed inset-0 bg-[#080808] z-[105] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center px-10">
          <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-60">Navigation</p>
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className={`text-3xl font-light tracking-tighter text-white transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className={`mt-10 transition-all duration-700 delay-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <a 
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              className="px-10 py-4 rounded-full bg-[#D4AF37] text-black font-black uppercase text-[10px] tracking-widest"
            >
              Contact Concierge
            </a>
          </div>
        </div>
        
        {/* Background Decorative Text */}
        <div className="absolute bottom-10 w-full text-center overflow-hidden pointer-events-none">
          <span className="text-[15vw] font-black text-white/[0.03] uppercase whitespace-nowrap">
            {siteConfig.name}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;