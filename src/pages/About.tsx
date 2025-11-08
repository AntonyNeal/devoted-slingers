import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import BookingModal from '../components/BookingModal';

export default function About() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>About Bosca&apos;s Slingers - Where Warriors Gather</title>
        <meta
          name="description"
          content="Learn about Bosca's Slingers - a gathering place for MTG warriors where legends are forged through epic tournament battles and lasting friendships."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-orange-950 to-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-24 md:py-32 bg-gradient-to-b from-black/60 to-transparent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-orange-400 mb-6 sm:mb-8 tracking-wide uppercase"
                style={{
                  textShadow: '0 0 20px rgba(251, 146, 60, 0.8), 0 0 40px rgba(239, 68, 68, 0.4)',
                }}
              >
                About the Slingers
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 mx-auto mb-8 sm:mb-12" />
              <p className="text-xl sm:text-2xl md:text-3xl text-orange-200 leading-relaxed font-light mb-6">
                Where MTG warriors forge bonds through epic battles and legendary camaraderie.
              </p>
              <p className="text-lg sm:text-xl text-orange-300 leading-relaxed italic">
                Alone we are strong. Together, we are unstoppable. The slingers stand as one.
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
          name: 'Tournament Registration',
        }}
        hourlyRate={25}
        platformFeePercentage={0.05}
      />
    </>
  );
}
