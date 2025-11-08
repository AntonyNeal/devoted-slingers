import { useEffect, useState, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Prices from './pages/Prices';
import AdminDashboard from './pages/AdminDashboard';
import BookingModal from './components/BookingModal';
import MobileCTABar from './components/MobileCTABar';
import { initializeSession, registerSession, trackConversion } from './utils/utm.service';

function App() {
  const location = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle booking modal open
  const handleBookingOpen = () => {
    setIsBookingOpen(true);
    window.dispatchEvent(new CustomEvent('modalOpened'));
  };

  // Handle booking modal close
  const handleBookingClose = () => {
    setIsBookingOpen(false);
    window.dispatchEvent(new CustomEvent('modalClosed'));
  };

  useEffect(() => {
    // Initialize UTM tracking and session on app load
    const initTracking = async () => {
      try {
        // Initialize local session data (sync)
        const session = initializeSession();
        console.debug('Session initialized:', session.userId);

        // Register session with backend (async, non-blocking)
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
        await registerSession(apiBaseUrl);

        // Track page view
        await trackConversion('page_view', { page: 'home' }, apiBaseUrl);
      } catch (error) {
        console.debug('Error initializing tracking:', error);
        // Don't fail the app if tracking fails
      }
    };

    initTracking();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bosca&apos;s Slingers - Where Warriors Gather</title>
        <meta
          name="description"
          content="Assemble your party. Unite with fellow warriors. Epic Magic: The Gathering tournaments where friendships are forged and legends are born."
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.boscaslingers.ai/" />
        <meta property="og:title" content="Bosca's Slingers - Where Warriors Gather" />
        <meta
          property="og:description"
          content="Assemble your party. Unite with fellow warriors. Epic Magic: The Gathering tournaments where friendships are forged and legends are born."
        />
        <meta property="og:image" content="https://www.boscaslingers.ai/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.boscaslingers.ai/" />
        <meta property="twitter:title" content="Bosca's Slingers - Where Warriors Gather" />
        <meta
          property="twitter:description"
          content="Assemble your party. Unite with fellow warriors. Epic Magic: The Gathering tournaments where friendships are forged and legends are born."
        />
        <meta property="twitter:image" content="https://www.boscaslingers.ai/og-image.jpg" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-orange-950 to-gray-900">
        {/* Navigation Header */}
        <header
          className={`sticky top-0 z-50 ${location.pathname === '/' ? 'bg-transparent backdrop-blur-md border-b-0' : 'bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-orange-900'}`}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 xl:py-6">
            <nav className="max-w-7xl mx-auto">
              {/* Mobile Layout */}
              <div className="lg:hidden flex justify-between items-center">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    // If on admin page, go home on any click
                    if (location.pathname === '/admin') {
                      window.location.href = '/';
                      return;
                    }

                    // Otherwise, use triple-click to access admin
                    clickCountRef.current += 1;
                    const newCount = clickCountRef.current;

                    if (newCount === 3) {
                      clickCountRef.current = 0;
                      if (resetTimerRef.current) {
                        clearTimeout(resetTimerRef.current);
                        resetTimerRef.current = null;
                      }
                      window.location.href = '/admin';
                    } else {
                      // Clear existing timer
                      if (resetTimerRef.current) {
                        clearTimeout(resetTimerRef.current);
                      }

                      // Set new timer to reset counter after 500ms
                      resetTimerRef.current = setTimeout(() => {
                        clickCountRef.current = 0;
                        resetTimerRef.current = null;
                      }, 500);
                    }
                  }}
                  className={`text-xl sm:text-2xl font-bold ${location.pathname === '/' ? 'text-orange-500' : 'text-orange-400'} tracking-wide hover:text-orange-300 transition-colors whitespace-nowrap cursor-pointer select-none uppercase`}
                  style={
                    location.pathname === '/'
                      ? {
                          textShadow: '0 0 20px rgba(251, 146, 60, 0.8), 0 2px 8px rgba(0,0,0,0.8)',
                        }
                      : {}
                  }
                  title={
                    location.pathname === '/admin'
                      ? 'Click to return home'
                      : 'Triple-click for admin'
                  }
                >
                  Bosca&apos;s Slingers
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      handleBookingOpen();
                    }}
                    className="px-3 py-2 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm cursor-pointer"
                    aria-label="Join the warband"
                  >
                    Join the Warband
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                    className={`p-2 ${location.pathname === '/' ? 'text-orange-400' : 'text-orange-300'} hover:text-orange-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg`}
                    style={
                      location.pathname === '/'
                        ? { filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 0.6))' }
                        : {}
                    }
                    aria-label="Toggle mobile menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isMobileMenuOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex justify-between items-center">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    // If on admin page, go home on any click
                    if (location.pathname === '/admin') {
                      window.location.href = '/';
                      return;
                    }

                    // Otherwise, use triple-click to access admin
                    clickCountRef.current += 1;
                    const newCount = clickCountRef.current;

                    if (newCount === 3) {
                      clickCountRef.current = 0;
                      if (resetTimerRef.current) {
                        clearTimeout(resetTimerRef.current);
                        resetTimerRef.current = null;
                      }
                      window.location.href = '/admin';
                    } else {
                      // Clear existing timer
                      if (resetTimerRef.current) {
                        clearTimeout(resetTimerRef.current);
                      }

                      // Set new timer to reset counter after 500ms
                      resetTimerRef.current = setTimeout(() => {
                        clickCountRef.current = 0;
                        resetTimerRef.current = null;
                      }, 500);
                    }
                  }}
                  className={`text-3xl xl:text-4xl font-bold ${location.pathname === '/' ? 'text-orange-500' : 'text-orange-400'} tracking-wide hover:text-orange-300 transition-colors whitespace-nowrap cursor-pointer select-none uppercase`}
                  style={
                    location.pathname === '/'
                      ? {
                          textShadow: '0 0 20px rgba(251, 146, 60, 0.8), 0 2px 8px rgba(0,0,0,0.8)',
                        }
                      : {}
                  }
                  title={
                    location.pathname === '/admin'
                      ? 'Click to return home'
                      : 'Triple-click for admin'
                  }
                >
                  Bosca&apos;s Slingers
                </div>

                {/* Desktop Navigation */}
                <div className="flex space-x-6 xl:space-x-8 items-center">
                  <Link
                    to="/about"
                    className={`font-medium transition-colors duration-300 focus:outline-none focus:text-orange-400 ${
                      location.pathname === '/about'
                        ? 'text-orange-400'
                        : location.pathname === '/'
                          ? 'text-orange-300 hover:text-orange-200'
                          : 'text-orange-300 hover:text-orange-400'
                    }`}
                    style={
                      location.pathname === '/' ? { textShadow: '0 2px 4px rgba(0,0,0,0.8)' } : {}
                    }
                    aria-label="About page"
                  >
                    About
                  </Link>
                  <Link
                    to="/prices"
                    className={`font-medium transition-colors duration-300 focus:outline-none focus:text-orange-400 ${
                      location.pathname === '/prices'
                        ? 'text-orange-400'
                        : location.pathname === '/'
                          ? 'text-orange-300 hover:text-orange-200'
                          : 'text-orange-300 hover:text-orange-400'
                    }`}
                    style={
                      location.pathname === '/' ? { textShadow: '0 2px 4px rgba(0,0,0,0.8)' } : {}
                    }
                    aria-label="Prices page"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/services"
                    className={`font-medium transition-colors duration-300 focus:outline-none focus:text-orange-400 ${
                      location.pathname === '/services'
                        ? 'text-orange-400'
                        : location.pathname === '/'
                          ? 'text-orange-300 hover:text-orange-200'
                          : 'text-orange-300 hover:text-orange-400'
                    }`}
                    style={
                      location.pathname === '/' ? { textShadow: '0 2px 4px rgba(0,0,0,0.8)' } : {}
                    }
                    aria-label="Tournaments page"
                  >
                    Tournaments
                  </Link>
                  <button
                    onClick={() => {
                      handleBookingOpen();
                    }}
                    className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 whitespace-nowrap text-xs sm:text-sm lg:text-base cursor-pointer"
                    aria-label="Join the warband"
                  >
                    Join the Warband
                  </button>
                </div>
              </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md shadow-lg z-50 border-b border-orange-900">
                <div className="px-4 py-6 space-y-4">
                  <Link
                    to="/about"
                    className={`block font-medium transition-colors duration-300 focus:outline-none focus:text-orange-400 ${
                      location.pathname === '/about'
                        ? 'text-orange-400'
                        : 'text-orange-300 hover:text-orange-200'
                    }`}
                    aria-label="About page"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/prices"
                    className={`block font-medium transition-colors duration-300 focus:outline-none focus:text-orange-400 ${
                      location.pathname === '/prices'
                        ? 'text-orange-400'
                        : 'text-orange-300 hover:text-orange-200'
                    }`}
                    aria-label="Prices page"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/services"
                    className={`block font-medium transition-colors duration-300 focus:outline-none focus:text-orange-400 ${
                      location.pathname === '/services'
                        ? 'text-orange-400'
                        : 'text-orange-300 hover:text-orange-200'
                    }`}
                    aria-label="Tournaments page"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Tournaments
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        {/* Footer - Hidden on home page and admin page */}
        {location.pathname !== '/' && location.pathname !== '/admin' && (
          <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-900/50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-orange-400">
                      Bosca&apos;s Slingers
                    </h3>
                    <p className="text-gray-300 mb-4 sm:text-base lg:text-lg">
                      Where warriors gather. Where legends unite.
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Join fellow MTG warriors in epic tournaments. Find your party, forge
                      alliances, and claim victory together.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-orange-400">
                      Contact
                    </h3>
                    <div className="space-y-2 sm:space-y-3 text-gray-300 sm:text-base lg:text-lg">
                      <p>Email: alex@devotedslingers.ai</p>
                      <p>Email: julian@devotedslingers.ai</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-orange-400">
                      Battle Grounds
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <a
                        href="/services"
                        className="block text-gray-300 hover:text-orange-400 transition-colors sm:text-base lg:text-lg"
                      >
                        Standard Battles
                      </a>
                      <a
                        href="/services"
                        className="block text-gray-300 hover:text-orange-400 transition-colors sm:text-base lg:text-lg"
                      >
                        Commander Gatherings
                      </a>
                      <a
                        href="/services"
                        className="block text-gray-300 hover:text-orange-400 transition-colors sm:text-base lg:text-lg"
                      >
                        Draft Warbands
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-orange-900/50 pt-8 sm:pt-12 lg:pt-16 text-center">
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                    © 2025 Bosca&apos;s Slingers. All rights reserved. | United We Conquer
                  </p>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleBookingClose}
        provider={{
          id: 'default',
          name: 'Service Provider',
        }}
        hourlyRate={100}
        platformFeePercentage={0.1}
      />
      {location.pathname !== '/admin' && (
        <MobileCTABar ctaText="Join the Warband" ctaAction={handleBookingOpen} />
      )}
    </>
  );
}

export default App;
