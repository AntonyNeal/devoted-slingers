import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Swords } from 'lucide-react';
import BookingModal from '../components/BookingModal';

export default function Prices() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Join the Warband - Bosca&apos;s Slingers</title>
        <meta
          name="description"
          content="Join the warband. Compete alongside fellow warriors. Transparent entry fees and legendary prize pools for MTG tournaments."
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
                Join the Warband
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 mx-auto mb-8 sm:mb-12" />
              <p className="text-xl sm:text-2xl md:text-3xl text-orange-200 leading-relaxed font-light">
                Every warrior pays their dues. Every victor claims their glory. Unite with legends
                and forge your path to greatness.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Tournament Entry */}
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-8 text-center uppercase">
                  Standard Tournament Entry
                </h2>
                <div className="bg-gradient-to-br from-orange-950/80 to-gray-900/80 border-2 border-orange-600/50 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-orange-300 mb-6">
                        Weekly Battles
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-orange-900/50">
                          <span className="text-lg text-gray-300">Friday Night Magic</span>
                          <span className="text-xl font-semibold text-orange-400">$15</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-orange-900/50">
                          <span className="text-lg text-gray-300">Commander Night</span>
                          <span className="text-xl font-semibold text-orange-400">$10</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-orange-900/50">
                          <span className="text-lg text-gray-300">Draft Tournament</span>
                          <span className="text-xl font-semibold text-orange-400">$25</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-lg text-gray-300">Modern Showdown</span>
                          <span className="text-xl font-semibold text-orange-400">$20</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-orange-300 mb-6">
                        Monthly Campaigns
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-orange-900/50">
                          <span className="text-lg text-gray-300">Standard Championship</span>
                          <span className="text-xl font-semibold text-orange-400">$35</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-orange-900/50">
                          <span className="text-lg text-gray-300">Pioneer Challenge</span>
                          <span className="text-xl font-semibold text-orange-400">$30</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-orange-900/50">
                          <span className="text-lg text-gray-300">Legacy Legends</span>
                          <span className="text-xl font-semibold text-orange-400">$40</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-lg text-gray-300">Commander Clash</span>
                          <span className="text-xl font-semibold text-orange-400">$25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prize Pools */}
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-8 text-center uppercase">
                  Spoils of Victory
                </h2>
                <div className="bg-gradient-to-br from-red-950/80 to-gray-900/80 border-2 border-red-600/50 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-b from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-600/30">
                      <div className="text-4xl mb-3">🥇</div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                        Champion&apos;s Glory
                      </h3>
                      <p className="text-2xl font-bold text-yellow-300">60% of Pool</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Plus store credit & bragging rights
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-b from-gray-700/40 to-gray-800/40 rounded-lg border border-gray-500/30">
                      <div className="text-4xl mb-3">🥈</div>
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">Runner-Up Honors</h3>
                      <p className="text-2xl font-bold text-gray-200">30% of Pool</p>
                      <p className="text-sm text-gray-400 mt-2">Plus participation packs</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-b from-orange-900/40 to-red-900/40 rounded-lg border border-orange-600/30">
                      <div className="text-4xl mb-3">🥉</div>
                      <h3 className="text-xl font-semibold text-orange-300 mb-2">
                        Warrior&apos;s Share
                      </h3>
                      <p className="text-2xl font-bold text-orange-200">10% of Pool</p>
                      <p className="text-sm text-gray-400 mt-2">Plus promo cards</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-6 text-center italic">
                    All warriors who join the battle receive participation rewards. Together we
                    rise!
                  </p>
                </div>
              </div>

              {/* Membership Tiers */}
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-8 text-center uppercase">
                  Warband Membership
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-2 border-gray-600 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-300 mb-4">Recruit</h3>
                    <div className="text-3xl font-bold text-gray-200 mb-4">Free</div>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">⚔️</span>
                        <span>Access to all tournaments</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">⚔️</span>
                        <span>Online event registration</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">⚔️</span>
                        <span>Community Discord access</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-b from-orange-900/80 to-red-900/80 border-2 border-orange-500 p-6 rounded-lg transform scale-105 shadow-2xl">
                    <div className="text-xs uppercase tracking-wide text-orange-300 mb-2">
                      Most Popular
                    </div>
                    <h3 className="text-2xl font-bold text-orange-300 mb-4">Veteran</h3>
                    <div className="text-3xl font-bold text-orange-200 mb-4">$25/month</div>
                    <ul className="space-y-3 text-orange-100">
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">⚔️</span>
                        <span>All Recruit benefits</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">⚔️</span>
                        <span>10% off all entry fees</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">⚔️</span>
                        <span>Priority event registration</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">⚔️</span>
                        <span>Monthly promo pack</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-b from-yellow-900/80 to-orange-900/80 border-2 border-yellow-600 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-4">Champion</h3>
                    <div className="text-3xl font-bold text-yellow-300 mb-4">$50/month</div>
                    <ul className="space-y-3 text-yellow-100">
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">👑</span>
                        <span>All Veteran benefits</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">👑</span>
                        <span>20% off all entry fees</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">👑</span>
                        <span>Free Commander Night entry</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">👑</span>
                        <span>Exclusive Champion events</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">👑</span>
                        <span>Premium foil promo packs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Battle Information */}
              <div className="bg-blue-950/60 border-l-4 border-blue-500 p-6 sm:p-8 rounded backdrop-blur-sm">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-300 mb-4 sm:mb-6">
                  Before You Join the Battle
                </h3>
                <ul className="space-y-3 sm:space-y-4 text-lg text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">⚔️</span>
                    <span>All warriors must register before the event starts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">⚔️</span>
                    <span>Deck lists required for competitive tournaments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">⚔️</span>
                    <span>Entry fees paid at the door or online in advance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">⚔️</span>
                    <span>Follow official MTG tournament rules and code of conduct</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">⚔️</span>
                    <span>Respect your fellow warriors - we rise together</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 sm:py-24 bg-gradient-to-b from-transparent to-black/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-orange-400 mb-6 sm:mb-8 uppercase">
                Ready to Join?
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-orange-200 leading-relaxed font-light mb-10 sm:mb-12">
                Assemble your deck. Rally your party. The battlefield awaits.
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-orange-600 to-red-700 text-white font-bold rounded-lg hover:from-orange-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 text-lg"
                aria-label="Join the warband"
              >
                <Swords className="w-6 h-6 mr-3" />
                Join the Warband
              </button>
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
