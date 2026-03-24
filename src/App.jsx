import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { siteConfig } from './config';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import EstatesPage from './pages/EstatesPage';
import LandsPage from './pages/LandsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';

function App() {
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen bg-black">
        {/* --- GLOBAL SEO & HEAD TAGS --- */}
        <Helmet>
          <title>{`${siteConfig.name} | ${siteConfig.location}`}</title>
          <meta name="description" content={siteConfig.description} />
          <meta name="keywords" content={siteConfig.keywords} />
          <meta name="author" content={siteConfig.author} />
          
          {/* Favicon from Config */}
          <link rel="icon" type="image/svg+xml" href={siteConfig.favicon} />

          {/* Open Graph / Social Media Meta Tags */}
          <meta property="og:title" content={siteConfig.name} />
          <meta property="og:description" content={siteConfig.description} />
          <meta property="og:image" content={siteConfig.ogImage} />
          <meta property="og:url" content={siteConfig.siteUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={siteConfig.twitterHandle} />
        </Helmet>

        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/estates" element={<EstatesPage />} />
            <Route path="/lands" element={<LandsPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;