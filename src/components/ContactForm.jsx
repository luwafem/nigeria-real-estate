import { useForm, ValidationError } from '@formspree/react';
import { siteConfig } from '../config';

const ContactForm = ({ propertyTitle = "General Inquiry" }) => {
  const [state, handleSubmit] = useForm(siteConfig.formspreeEndpoint);
  
  if (state.succeeded) {
    return (
      <div className="py-12 px-6 text-center animate-in fade-in zoom-in duration-700">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
           <span className="text-black text-xl">✓</span>
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white">Inquiry Received</p>
        <p className="text-zinc-500 text-xs mt-2 font-light italic font-serif">A portfolio manager will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 bg-transparent">
      {/* Hidden field to let the agent know which property is being discussed */}
      <input type="hidden" name="Inquiry_Subject" value={propertyTitle} />
      
      <div className="space-y-8">
        {/* Name Field */}
        <div className="relative group">
          <label className="block text-[9px] uppercase tracking-[0.4em] text-zinc-600 mb-1 transition-colors group-focus-within:text-white">
            Legal Name
          </label>
          <input 
            type="text" 
            name="name" 
            required 
            placeholder="Identity"
            className="w-full bg-transparent border-b border-white/10 py-3 text-xs tracking-widest outline-none focus:border-white transition-all placeholder:text-zinc-800" 
          />
        </div>

        {/* Email Field */}
        <div className="relative group">
          <label className="block text-[9px] uppercase tracking-[0.4em] text-zinc-600 mb-1 transition-colors group-focus-within:text-white">
            Digital Address
          </label>
          <input 
            type="email" 
            name="email" 
            required 
            placeholder="Email"
            className="w-full bg-transparent border-b border-white/10 py-3 text-xs tracking-widest outline-none focus:border-white transition-all placeholder:text-zinc-800" 
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-[9px] text-red-500 mt-2 uppercase tracking-tighter" />
        </div>

        {/* Phone Field */}
        <div className="relative group">
          <label className="block text-[9px] uppercase tracking-[0.4em] text-zinc-600 mb-1 transition-colors group-focus-within:text-white">
            Mobile
          </label>
          <input 
            type="tel" 
            name="phone" 
            placeholder="+234"
            className="w-full bg-transparent border-b border-white/10 py-3 text-xs tracking-widest outline-none focus:border-white transition-all placeholder:text-zinc-800" 
          />
        </div>

        {/* Message Field */}
        <div className="relative group">
          <label className="block text-[9px] uppercase tracking-[0.4em] text-zinc-600 mb-1 transition-colors group-focus-within:text-white">
            Particulars
          </label>
          <textarea 
            name="message" 
            rows="2" 
            placeholder={`Express interest in ${propertyTitle}...`} 
            className="w-full bg-transparent border-b border-white/10 py-3 text-xs tracking-widest outline-none focus:border-white transition-all placeholder:text-zinc-800 resize-none"
          ></textarea>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={state.submitting} 
        className="group relative w-full py-6 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] overflow-hidden transition-all hover:invert disabled:opacity-50"
      >
        <span className="relative z-10">
          {state.submitting ? 'Transmitting...' : 'Register Interest'}
        </span>
      </button>
      
      <p className="text-center text-[8px] uppercase tracking-[0.3em] text-zinc-700">
        {siteConfig.shortName}
      </p>
    </form>
  );
};

export default ContactForm;