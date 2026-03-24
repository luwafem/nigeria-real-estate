// 🎨 GLOBAL CONFIGURATION - VERAZ PROPERTIES (PORT HARCOURT)
export const siteConfig = {
  name: "Veraz Properties",
  shortName: "Veraz",
  location: "Port Harcourt",
  description: "Your premier gateway to luxury real estate in Port Harcourt. Specialized in secure estates, prime lands, and modern residential developments.",
  keywords: "real estate port harcourt, houses for sale in PH, Peter Odili road properties, GRA Port Harcourt lands, Veraz Properties Nigeria",
  author: "Veraz Properties & Investment Ltd",
  siteUrl: "https://verazproperties.com.ng",
  twitterHandle: "@verazproperties",
  
  // Brand Assets & Visual Identity
  logo: "https://www.verazadvocates.com.ng/property/wp-content/uploads/2024/06/logo-vera.png", 
  favicon: "https://www.verazadvocates.com.ng/property/wp-content/uploads/2024/06/logo-vera.png",
  
  // Theme & Aesthetic Control
  theme: {
    primary: "#FFFFFF",
    accent: "#D4AF37", // Gold accent for a premium feel
    background: "#080808", 
    cardBg: "#0A0A0A",     
    fontSerif: "'Playfair Display', serif", 
    fontSans: "'Inter', sans-serif",
  },

  // --- HERO SECTION (Updated for PH context) ---
  hero: {
    scrollText: "Explore",
    slides: [
      {
        desktopImage: "https://images.trvl-media.com/place/2782/1a136c99-0dfd-47ef-b072-927c49a788dc.jpg",
        mobileImage: "https://images.trvl-media.com/place/2782/1a136c99-0dfd-47ef-b072-927c49a788dc.jpg",
        ctaText: "Premium Residential Listings",
        ctaLink: "/properties" 
      },
      {
        desktopImage: "https://images.trvl-media.com/place/2782/ef3185f7-7f6f-4be0-be93-463084b5d257.jpg",
        mobileImage: "https://images.trvl-media.com/place/2782/ef3185f7-7f6f-4be0-be93-463084b5d257.jpg",
        ctaText: "Investment Lands in PH",
        ctaLink: "/lands"
      },
      {
        desktopImage: "https://images.trvl-media.com/place/2782/28b877b2-07a1-42fb-a919-02efb48b10c9.jpg",
        mobileImage: "https://images.trvl-media.com/place/2782/28b877b2-07a1-42fb-a919-02efb48b10c9.jpg",
        ctaText: "Partner with Us",
        ctaLink: "/contact"
      }
    ],
    fallbackBg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2070&q=80",
  },

  // Carousel Settings
  carousel: {
    autoPlaySpeed: 6000, 
    fadeDuration: 1500,  
    parallaxStrength: 15, 
  },
  
  // Contact Details (Ready for your specific PH data)
  contact: {
    phone: "+234 800 000 0000", // Update with your actual number
    whatsappNumber: "2348000000000", // Update (No '+' or spaces)
    email: "info@verazproperties.com.ng",
    address: "Port Harcourt, Rivers State, Nigeria",
  },
  
  // Social Ecosystem
  social: {
    instagram: "https://instagram.com/verazproperties",
    youtube: "https://youtube.com/@verazproperties" 
  },
  
  // Lead Generation
  formspreeEndpoint: "https://formspree.io/f/your_endpoint_here", 
  
  // Global Metadata for SEO
  ogImage: "https://verazproperties.com.ng/og-preview.jpg", 
};

/**
 * WhatsApp Message Generator
 */
export const whatsappMessage = (propertyTitle, propertyPrice, propertyUrl) => {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(propertyPrice);

  return `Hello Veraz Properties. I am interested in this listing:
  
Property: ${propertyTitle}
Value: ${formattedPrice}
Link: ${propertyUrl}

I would like to schedule a site inspection. Please let me know the availability.`;
};