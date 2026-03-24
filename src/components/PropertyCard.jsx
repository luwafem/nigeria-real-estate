import { Link } from 'react-router-dom';

const PropertyCard = ({ property, variant = "ultra-luxury" }) => {
  const formatPrice = (price) => {
    if (price >= 1000000000) return `₦${(price / 1000000000).toFixed(1)}B`;
    if (price >= 1000000) return `₦${(price / 1000000).toFixed(0)}M`;
    return `₦${price.toLocaleString()}`;
  };

  const isUltra = variant === "ultra-luxury";

  return (
    <Link 
      to={`/property/${property.id}`}
      className={`group relative flex flex-col w-full h-full overflow-hidden transition-all duration-700 ${
        isUltra ? 'bg-[#080808] lg:bg-transparent' : 'bg-white rounded-2xl shadow-sm border border-gray-100'
      }`}
    >
      {/* --- IMAGE CONTAINER: Responsive Aspect Ratios --- */}
      <div className={`relative w-full overflow-hidden ${
        isUltra 
          ? 'aspect-[16/10] sm:aspect-square lg:aspect-auto lg:h-full' 
          : 'h-64'
      }`}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Scrim: Only visible on Large screens where text is absolute */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity ${
          isUltra ? 'opacity-0 lg:opacity-90 group-hover:lg:opacity-100' : 'hidden'
        }`} />

        {/* Status & Category Badges */}
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex flex-col gap-2">
          <span className="backdrop-blur-xl bg-white/10 border border-white/20 text-white text-[8px] lg:text-[10px] font-black uppercase tracking-widest px-3 py-1 lg:px-4 lg:py-1.5 rounded-full">
            {property.category}
          </span>
          {property.status && (
            <span className="backdrop-blur-xl bg-[#D4AF37]/80 text-black text-[7px] lg:text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 lg:px-3 lg:py-1 rounded-full w-fit">
                {property.status}
            </span>
          )}
        </div>
      </div>

      {/* --- CONTENT SECTION: Smart Positioning --- */}
      <div className={`${
        isUltra 
        ? 'relative lg:absolute lg:bottom-0 lg:left-0 w-full p-6 lg:p-10 bg-[#080808] lg:bg-transparent' 
        : 'p-6 bg-white'
      }`}>
        <div className="flex flex-col gap-1 mb-4">
          <p className={`text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-bold ${isUltra ? 'text-[#D4AF37] lg:text-[#D4AF37]' : 'text-gray-400'}`}>
            {property.location}
          </p>
          <h3 className={`text-xl lg:text-3xl font-light tracking-tight leading-tight ${isUltra ? 'text-white' : 'text-gray-900'}`}>
            {property.title}
          </h3>
        </div>

        {/* Metadata: Dynamic based on property type */}
        <div className={`flex items-center gap-4 lg:gap-6 mb-6 text-[10px] lg:text-[11px] font-medium tracking-widest uppercase ${isUltra ? 'text-zinc-400 lg:text-white/80' : 'text-gray-500'}`}>
          <div className="flex flex-col">
            <span className="opacity-50 text-[8px] lg:text-[9px] mb-0.5">
                {property.type === 'estate' ? 'Units' : property.type === 'land' ? 'Type' : 'Beds'}
            </span>
            <span>
                {property.type === 'estate' ? property.units.split(' ')[0] : 
                 property.type === 'land' ? 'Plot' : 
                 (property.bedrooms || '--')}
            </span>
          </div>
          <div className="flex flex-col border-l border-white/10 lg:border-white/20 pl-4 lg:pl-6">
            <span className="opacity-50 text-[8px] lg:text-[9px] mb-0.5">Scale</span>
            <span className="whitespace-nowrap">{property.landSize}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className={`flex items-center justify-between pt-5 border-t ${isUltra ? 'border-white/5 lg:border-white/10' : 'border-gray-100'}`}>
          <span className={`text-lg lg:text-xl font-bold ${isUltra ? 'text-white' : 'text-zinc-900'}`}>
            {formatPrice(property.price)}
          </span>
          
          <div className={`flex items-center gap-2 text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all ${
            isUltra ? 'text-[#D4AF37] group-hover:translate-x-1' : 'text-gold-600'
          }`}>
            View <span className="text-lg">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;