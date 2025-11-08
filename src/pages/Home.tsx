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
              0%, 100% { text-shadow: 0 0 30px rgba(251, 146, 60, 1), 0 0 60px rgba(239, 68, 68, 0.6), 0 0 90px rgba(234, 88, 12, 0.4), 0 4px 20px rgba(0,0,0,1); }
              50% { text-shadow: 0 0 50px rgba(251, 146, 60, 1.2), 0 0 100px rgba(239, 68, 68, 0.8), 0 0 120px rgba(234, 88, 12, 0.6), 0 4px 20px rgba(0,0,0,1); }
            }

            @keyframes float {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-15px) scale(1.02); }
            }

            @keyframes drift {
              0%, 100% { transform: translate(0, 0); }
              33% { transform: translate(100px, -50px); }
              66% { transform: translate(-100px, 50px); }
            }

            @keyframes shimmer {
              0% { background-position: -1000px 0; }
              100% { background-position: 1000px 0; }
            }

            @keyframes pulse-glow {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.6; }
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
        {/* Hero Section with Epic Landscape */}
        <section className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
          {/* Multi-layered Background for Depth */}

          {/* Base Layer - Deep Background */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-110"
            style={{
              backgroundImage: 'url(/images/hero.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4) contrast(1.2)',
            }}
          />

          {/* Animated Gradient Overlay - Creates atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/40 to-black opacity-80" />
          <div
            className="absolute inset-0 bg-gradient-to-tr from-red-950/30 via-transparent to-orange-900/20"
            style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
          />

          {/* Radial gradient for dramatic center focus */}
          <div
            className="absolute inset-0 bg-radial-gradient"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
            }}
          />

          {/* Floating ember particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  background: `radial-gradient(circle, rgba(251, 146, 60, ${Math.random() * 0.8 + 0.2}), transparent)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `drift ${Math.random() * 20 + 15}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                  filter: 'blur(1px)',
                }}
              />
            ))}
          </div>

          {/* Epic Vignette with orange tint */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                'inset 0 0 200px 100px rgba(0,0,0,0.8), inset 0 0 100px 50px rgba(234, 88, 12, 0.2)',
            }}
          />

          {/* Content Overlay - Maximalist Typography */}
          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center h-full">
            {/* Epic Title with Shimmer Effect */}
            <div className="relative mb-8 sm:mb-12">
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black mb-6 sm:mb-8 uppercase tracking-widest leading-none"
                style={{
                  animation: 'ember-glow 3s ease-in-out infinite',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: 900,
                  color: '#fb923c',
                  letterSpacing: '0.15em',
                  WebkitTextStroke: '2px rgba(239, 68, 68, 0.5)',
                }}
              >
                Bosca&apos;s
                <br />
                Slingers
              </h1>
              {/* Duplicate text for layered glow effect */}
              <h1
                className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black uppercase tracking-widest leading-none pointer-events-none"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: 900,
                  color: 'transparent',
                  letterSpacing: '0.15em',
                  WebkitTextStroke: '1px rgba(251, 146, 60, 0.3)',
                  filter: 'blur(8px)',
                }}
                aria-hidden="true"
              >
                Bosca&apos;s
                <br />
                Slingers
              </h1>
            </div>

            {/* Ornamental Divider */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-orange-400 to-orange-600" />
              <span
                className="text-4xl sm:text-5xl md:text-6xl"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(251, 146, 60, 0.8))',
                  animation: 'float 4s ease-in-out infinite',
                }}
              >
                ⚔️
              </span>
              <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-orange-400 to-orange-600" />
            </div>

            <p
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 sm:mb-8 max-w-6xl mx-auto leading-tight font-bold tracking-wide uppercase"
              style={{
                textShadow:
                  '0 4px 20px rgba(0,0,0,1), 0 0 40px rgba(251, 146, 60, 0.6), 0 0 80px rgba(239, 68, 68, 0.3)',
                color: '#fed7aa',
                WebkitTextStroke: '1px rgba(234, 88, 12, 0.3)',
              }}
            >
              Assemble Your Party
            </p>
            <p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-10 sm:mb-14 md:mb-16 max-w-5xl mx-auto leading-relaxed font-medium tracking-wide"
              style={{
                textShadow: '0 2px 16px rgba(0,0,0,1), 0 0 20px rgba(251, 146, 60, 0.4)',
                color: '#fef3c7',
                letterSpacing: '0.05em',
              }}
            >
              Where MTG warriors unite across the battlefield, forge unbreakable bonds in fire and
              glory, and etch their names into eternal legend
            </p>
            <div className="flex gap-6 sm:gap-8 justify-center flex-wrap px-4 mb-12 sm:mb-16">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="group relative px-12 sm:px-16 md:px-20 lg:px-24 py-6 sm:py-7 md:py-8 bg-gradient-to-r from-orange-600 via-red-600 to-red-700 text-white rounded-xl text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-wider hover:shadow-2xl hover:shadow-orange-500/70 hover:from-orange-500 hover:via-red-500 hover:to-red-600 transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-4 focus:ring-offset-black backdrop-blur-sm border-4 border-orange-400/80 uppercase"
                style={{
                  animation: 'float 3s ease-in-out infinite',
                  boxShadow:
                    '0 12px 48px rgba(251, 146, 60, 0.6), 0 0 80px rgba(239, 68, 68, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.4)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)',
                }}
                aria-label="Join the warband"
              >
                <span className="relative z-10 flex items-center gap-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl">⚔️</span>
                  <span>Join the Warband</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl group-hover:rotate-12 transition-transform duration-300">
                    ⚔️
                  </span>
                </span>
                {/* Shimmer effect overlay */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    animation: 'shimmer 2s infinite',
                  }}
                />
              </button>
              <Link
                to="/services"
                className="group relative px-12 sm:px-16 md:px-20 lg:px-24 py-6 sm:py-7 md:py-8 border-4 border-orange-400 text-orange-200 rounded-xl text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-wider hover:bg-orange-500/30 hover:border-orange-300 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-4 focus:ring-offset-black backdrop-blur-sm uppercase"
                style={{
                  boxShadow:
                    '0 8px 32px rgba(251, 146, 60, 0.5), inset 0 1px 0 rgba(251, 146, 60, 0.4)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
                }}
                aria-label="View battle grounds"
              >
                <span className="flex items-center gap-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl">🛡️</span>
                  <span>Find Your Battle</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl group-hover:scale-125 transition-transform duration-300">
                    �
                  </span>
                </span>
              </Link>
            </div>

            {/* Epic Flavor Text with Ornamental Frame */}
            <div className="mt-12 max-w-4xl mx-auto">
              {/* Decorative top border */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                <span
                  className="text-2xl"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 0.8))' }}
                >
                  🗡️
                </span>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              </div>

              <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl italic font-serif leading-relaxed px-8"
                style={{
                  textShadow: '0 2px 12px rgba(0,0,0,1), 0 0 30px rgba(251, 146, 60, 0.5)',
                  color: '#fdba74',
                  letterSpacing: '0.05em',
                }}
              >
                &quot;Alone we are strong. Together, we are unstoppable.
                <br />
                <span
                  className="text-orange-300 font-bold"
                  style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.8)' }}
                >
                  The slingers stand as one.
                </span>
                &quot;
              </p>

              {/* Decorative bottom border */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                <span
                  className="text-2xl"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 0.8))' }}
                >
                  🔥
                </span>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              </div>
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
