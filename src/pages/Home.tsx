import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BookingModal from '../components/BookingModal';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Bosca&apos;s Slingers - Assemble Your Party</title>
        <meta
          name="description"
          content="Assemble your party. Unite with warriors. Epic Magic: The Gathering tournaments where friendships are forged and legends are born."
        />
        <style>
          {`
            @keyframes ember-glow {
              0%, 100% { text-shadow: 0 0 20px rgba(251, 146, 60, 0.8), 0 0 40px rgba(239, 68, 68, 0.4), 0 2px 8px rgba(0,0,0,0.9); }
              50% { text-shadow: 0 0 30px rgba(251, 146, 60, 1), 0 0 60px rgba(239, 68, 68, 0.6), 0 2px 8px rgba(0,0,0,0.9); }
            }

            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }

            html, body {
              overflow: hidden;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </Helmet>

      <div className="fixed inset-0 overflow-hidden">
        {/* Hero Section with Background Image */}
        <section className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
          {/* Background Image - Add your Bosca's Slingers image here */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/hero.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Fallback gradient if image not loaded */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-orange-950 to-black opacity-70" />

          {/* Epic Dark Overlay with Mana Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-orange-900/30 to-black/80" />

          {/* Content Overlay */}
          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center h-full">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 sm:mb-8 uppercase tracking-wider leading-none"
              style={{
                animation: 'ember-glow 3s ease-in-out infinite',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 900,
                color: '#fb923c',
              }}
            >
              Bosca&apos;s Slingers
            </h1>
            <p
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 max-w-5xl mx-auto leading-relaxed font-semibold tracking-wide"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(251, 146, 60, 0.5)',
                color: '#fed7aa',
              }}
            >
              Assemble Your Party
            </p>
            <p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light opacity-90"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                color: '#fef3c7',
              }}
            >
              Where MTG warriors unite for epic battles, forge lasting bonds, and write their names
              in legend
            </p>
            <div className="flex gap-4 sm:gap-6 justify-center flex-wrap px-4 mb-8 sm:mb-12">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="group relative px-8 sm:px-10 md:px-12 lg:px-14 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-orange-600 via-red-600 to-red-700 text-white rounded-lg text-lg sm:text-xl md:text-2xl font-bold tracking-wide hover:shadow-2xl hover:shadow-orange-500/50 hover:from-orange-500 hover:via-red-500 hover:to-red-600 transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2 backdrop-blur-sm border-2 border-orange-400/50"
                style={{
                  animation: 'float 3s ease-in-out infinite',
                  boxShadow:
                    '0 8px 32px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}
                aria-label="Join the warband"
              >
                <span className="relative z-10">Join the Warband</span>
                <span className="ml-3 inline-block group-hover:translate-x-2 transition-transform duration-300 text-2xl">
                  ⚔️
                </span>
              </button>
              <Link
                to="/services"
                className="group px-8 sm:px-10 md:px-12 lg:px-14 py-4 sm:py-5 md:py-6 border-3 border-orange-400/80 text-orange-200 rounded-lg text-lg sm:text-xl md:text-2xl font-bold tracking-wide hover:bg-orange-500/20 hover:border-orange-300 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 backdrop-blur-sm"
                style={{
                  boxShadow: '0 4px 16px rgba(251, 146, 60, 0.3)',
                }}
                aria-label="View battle grounds"
              >
                Find Your Battle
                <span className="ml-3 inline-block group-hover:translate-x-2 transition-transform text-2xl">
                  🛡️
                </span>
              </Link>
            </div>

            {/* Flavor Text */}
            <div className="mt-8 max-w-2xl mx-auto">
              <p
                className="text-sm sm:text-base md:text-lg italic opacity-75"
                style={{
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                  color: '#fdba74',
                }}
              >
                &quot;Alone we are strong. Together, we are unstoppable. The slingers stand as
                one.&quot;
              </p>
            </div>
          </div>
        </section>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        provider={{
          id: 'default',
          name: 'Join the Warband',
        }}
        hourlyRate={25}
        platformFeePercentage={0.05}
      />
    </>
  );
}
