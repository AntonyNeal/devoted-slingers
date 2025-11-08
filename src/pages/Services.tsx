import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Swords } from 'lucide-react';
import BookingModal from '../components/BookingModal';

export default function Services() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Battle Grounds - Bosca&apos;s Slingers</title>
        <meta
          name="description"
          content="Explore the battlegrounds where MTG warriors gather. From Friday Night Magic to Commander tournaments, find your perfect battlefield and test your skills."
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
                Battle Grounds
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 mx-auto mb-8 sm:mb-12" />
              <p className="text-xl sm:text-2xl md:text-3xl text-orange-200 leading-relaxed font-light mb-6">
                Where legends are forged and warriors prove their worth. Every battlefield offers a
                unique test of skill, strategy, and spirit. Find your arena and rise to glory.
              </p>
              <p className="text-xl sm:text-2xl md:text-2xl text-orange-300 leading-relaxed font-light italic">
                Alone we are strong. Together, we are unstoppable. Choose your battle and join the
                warband.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
                {/* Standard Battles */}
                <div className="group relative bg-gradient-to-br from-orange-950/80 to-gray-900/80 border-2 border-orange-600/50 p-8 sm:p-10 rounded-lg hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:border-orange-500 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-orange-400 to-transparent" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-4 sm:mb-6 tracking-tight uppercase">
                    Standard Battles
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                    Fast-paced, strategic combat where warriors deploy their finest decks in the
                    current Standard format. Perfect for honing your skills, testing new strategies,
                    and earning your place among the elite. Every Friday night, the arena awakens.
                  </p>
                  <h4 className="text-lg font-semibold text-orange-300 mb-3">Battle Features:</h4>
                  <ul className="space-y-2 text-gray-400 mb-6">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">⚔️</span>
                      <span>Friday Night Magic weekly tournaments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">⚔️</span>
                      <span>Current Standard format decks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">⚔️</span>
                      <span>Swiss rounds followed by top 8 playoffs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">⚔️</span>
                      <span>Prize pool based on entry fees</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">⚔️</span>
                      <span>Participation promos for all warriors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">⚔️</span>
                      <span>Casual and competitive pods available</span>
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center text-orange-400 text-base sm:text-lg font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Enter the standard arena</span>
                    <span className="ml-2">⚔️</span>
                  </div>
                </div>

                {/* Commander Gatherings */}
                <div className="group relative bg-gradient-to-br from-red-950/80 to-gray-900/80 border-2 border-red-600/50 p-8 sm:p-10 rounded-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-500 hover:border-red-500 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-red-400 to-transparent" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-400 mb-4 sm:mb-6 tracking-tight uppercase">
                    Commander Gatherings
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                    The heart of the warband. Four warriors gather around the table, legendary
                    commanders leading armies of 100. Epic multiplayer battles where alliances form,
                    betrayals sting, and legends are born. This is where friendships are forged in
                    fire.
                  </p>
                  <h4 className="text-lg font-semibold text-red-300 mb-3">Battle Features:</h4>
                  <ul className="space-y-2 text-gray-400 mb-6">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">⚔️</span>
                      <span>Weekly Commander nights every Wednesday</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">⚔️</span>
                      <span>Casual 4-player pods with power level matching</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">⚔️</span>
                      <span>Themed events and league play</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">⚔️</span>
                      <span>Respect-based gameplay and Rule 0 discussions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">⚔️</span>
                      <span>Monthly Commander tournaments with prizes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">⚔️</span>
                      <span>Free entry for Champion members</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">⚔️</span>
                      <span>Build-your-legend achievement system</span>
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center text-red-400 text-base sm:text-lg font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Join the commander table</span>
                    <span className="ml-2">🛡️</span>
                  </div>
                </div>

                {/* Draft Warbands */}
                <div className="group relative bg-gradient-to-br from-blue-950/80 to-gray-900/80 border-2 border-blue-600/50 p-8 sm:p-10 rounded-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:border-blue-500 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-blue-400 to-transparent" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-4 sm:mb-6 tracking-tight uppercase">
                    Draft Warbands
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                    True warriors adapt to any battlefield. With only sealed packs and your wits,
                    construct an army on the fly. Limited formats test your raw skill and knowledge
                    like nothing else. Will you rise to the challenge?
                  </p>
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Battle Features:</h4>
                  <ul className="space-y-2 text-gray-400 mb-6">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">⚔️</span>
                      <span>Draft tournaments with latest set releases</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">⚔️</span>
                      <span>Booster draft and sealed deck formats</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">⚔️</span>
                      <span>Cube drafts with powered and pauper cubes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">⚔️</span>
                      <span>Keep what you draft - build your collection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">⚔️</span>
                      <span>Competitive and casual draft pods</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">⚔️</span>
                      <span>Pre-release sealed events for new sets</span>
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center text-blue-400 text-base sm:text-lg font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Test your drafting prowess</span>
                    <span className="ml-2">🎯</span>
                  </div>
                </div>

                {/* Modern Showdowns */}
                <div className="group relative bg-gradient-to-br from-purple-950/80 to-gray-900/80 border-2 border-purple-600/50 p-8 sm:p-10 rounded-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:border-purple-500 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-purple-400 to-transparent" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 mb-4 sm:mb-6 tracking-tight uppercase">
                    Modern Showdowns
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                    Where the best decks from Magic&apos;s history clash in eternal combat. Fast,
                    powerful, and unforgiving - Modern rewards deep knowledge and precise play.
                    Bring your A-game or fall to the legends of the format.
                  </p>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">Battle Features:</h4>
                  <ul className="space-y-2 text-gray-400 mb-6">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">⚔️</span>
                      <span>Monthly Modern tournaments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">⚔️</span>
                      <span>Pioneer, Legacy, and Vintage events</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">⚔️</span>
                      <span>Competitive REL with judge support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">⚔️</span>
                      <span>Deck list registration required</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">⚔️</span>
                      <span>Top prize pools for format specialists</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">⚔️</span>
                      <span>Proxy-friendly practice events</span>
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center text-purple-400 text-base sm:text-lg font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Face the eternal formats</span>
                    <span className="ml-2">⚡</span>
                  </div>
                </div>
              </div>

              {/* Community Features */}
              <div className="mt-12 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-2 border-yellow-600/50 p-8 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6 text-center uppercase">
                  Why Warriors Choose Us
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🤝</div>
                    <h4 className="text-lg font-semibold text-yellow-300 mb-2">
                      Welcoming Community
                    </h4>
                    <p className="text-gray-400">
                      New to MTG or a seasoned veteran? All skill levels welcome. We help each other
                      grow.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-3">🏆</div>
                    <h4 className="text-lg font-semibold text-yellow-300 mb-2">Fair Competition</h4>
                    <p className="text-gray-400">
                      Respectful play, clear rules, and experienced judges. Victory earned, not
                      stolen.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-3">🎁</div>
                    <h4 className="text-lg font-semibold text-yellow-300 mb-2">Generous Prizes</h4>
                    <p className="text-gray-400">
                      Store credit, booster packs, promos, and exclusive playmats. Every warrior is
                      rewarded.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 sm:py-24 bg-gradient-to-b from-transparent to-black/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-orange-400 mb-6 sm:mb-8 uppercase">
                Ready to Battle?
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-orange-200 leading-relaxed font-light mb-10 sm:mb-12">
                Choose your battlefield, gather your deck, and join the warband. Glory awaits those
                brave enough to answer the call.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="inline-flex items-center px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-orange-600 to-red-700 text-white font-bold rounded-lg hover:from-orange-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 text-lg"
                  aria-label="Register for tournament"
                >
                  <Swords className="w-6 h-6 mr-3" />
                  Register Now
                </button>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="inline-flex items-center px-10 sm:px-12 py-4 sm:py-5 border-2 border-orange-500 text-orange-400 font-bold rounded-lg hover:bg-orange-950/50 hover:border-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  aria-label="View schedule"
                >
                  View Schedule
                </button>
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
          name: 'Tournament Registration',
        }}
        hourlyRate={25}
        platformFeePercentage={0.05}
      />
    </>
  );
}
