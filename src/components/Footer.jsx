import { Link } from 'react-router-dom';
import { siteConfig } from '../config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    curation: [
      { name: 'Private Estates', path: '/estates' },
      { name: 'Urban Residencies', path: '/properties' },
      { name: 'Prime Land', path: '/lands' },
    ],
    company: [
      { name: 'Our Vision', path: '/about' },
      { name: 'Advisory', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
    ]
  };

  return (
    <footer className="bg-[#050505] text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">
          
          {/* --- BRAND COLUMN --- */}
          <div className="lg:col-span-5">
            <h3 className="text-lg font-black uppercase tracking-[0.3em] text-white mb-8">
              {siteConfig.name} 
            </h3>
            
            <div className="flex items-center gap-8">
              {Object.entries(siteConfig.social).map(([key, url]) => (
                <a 
                  key={key} 
                  href={url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-white transition-colors"
                >
                  {key}
                </a>
              ))}
            </div>
          </div>

          {/* --- LINKS COLUMNS --- */}
          <div className="lg:col-span-2">
            <h4 className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.5em] mb-8">The Curation</h4>
            <ul className="space-y-4">
              {footerLinks.curation.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-light text-zinc-400 hover:text-white transition-all hover:pl-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.5em] mb-8">The Studio</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-light text-zinc-400 hover:text-white transition-all hover:pl-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- CONCIERGE / NEWSLETTER --- */}
          <div className="lg:col-span-3">
            <h4 className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.5em] mb-8">Newsletter</h4>
            <p className="text-zinc-500 text-xs font-light mb-6">Receive curated investment opportunities directly.</p>
            
            <form action={siteConfig.formspreeEndpoint} method="POST" className="relative group">
              <input 
                type="email" 
                name="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-widest outline-none focus:border-white transition-colors" 
                required 
              />
              <button type="submit" className="absolute right-0 bottom-4 text-xs group-hover:translate-x-2 transition-transform opacity-50 hover:opacity-100">
                SUBMIT →
              </button>
            </form>
          </div>
        </div>

        {/* --- BOTTOM SECTION & MASSIVE LOGO --- */}
        <div className="relative pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-10 text-[9px] font-medium text-zinc-600 uppercase tracking-widest">
            <span>© {currentYear} {siteConfig.name}</span>
            <span>Based in {siteConfig.location || 'Lagos, NG'}</span>
          </div>

          <div className="text-[9px] font-medium text-zinc-600 uppercase tracking-widest">
            Design by <span className="text-zinc-400">Swift90</span>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;