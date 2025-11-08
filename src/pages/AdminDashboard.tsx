import { useState, useEffect } from 'react';
import { Trophy, ArrowUp, Swords, Shield, Users, TrendingUp } from 'lucide-react';
// CRITICAL: This MUST be a default import, NOT a named import
// ✅ CORRECT: import SDKTests from '../components/SDKTests';
// ❌ WRONG: import { SDKTests } from '../components/SDKTests';
import SDKTests from '../components/SDKTests';

// Mock tournament data - Admin dashboard for tournament platform
const mockTournaments = [
  {
    format: 'Commander',
    title: 'Wednesday Commander Night - Epic 4-player pods',
    registrations: 24,
    views: 342,
    icon: '🛡️',
  },
  {
    format: 'Standard',
    title: 'Friday Night Magic - Standard Showdown',
    registrations: 32,
    views: 487,
    icon: '⚔️',
  },
  {
    format: 'Draft',
    title: 'Saturday Booster Draft - Foundations set',
    registrations: 16,
    views: 289,
    icon: '🎯',
  },
];

export default function AdminDashboard() {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // Could update stats here
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-950 to-gray-900">
      {/* SECTION 1: HERO FEATURE - Tournament Analytics Dashboard */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto pt-12">
        <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-100 mb-4 uppercase">
              Track Your Tournament Success
            </h1>
            <p className="text-xl sm:text-2xl text-orange-200 mb-12">
              See which tournaments drive the most warrior registrations
            </p>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* LEFT SIDE: Tournament Feed Preview */}
              <div className="lg:col-span-3 space-y-4">
                <h3 className="text-lg font-semibold text-orange-200 mb-4 uppercase">
                  Upcoming Tournaments
                </h3>
                {mockTournaments.map((tournament, idx) => (
                  <div
                    key={idx}
                    className={`bg-white/10 backdrop-blur-md border ${
                      hoveredPost === idx ? 'border-orange-400' : 'border-white/20'
                    } rounded-lg p-4 transition-all duration-300 cursor-pointer hover:bg-white/15`}
                    onMouseEnter={() => setHoveredPost(idx)}
                    onMouseLeave={() => setHoveredPost(null)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{tournament.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-orange-600/50 rounded text-xs text-orange-200 font-semibold uppercase">
                            {tournament.format}
                          </span>
                        </div>
                        <p className="text-white text-sm mb-3">{tournament.title}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-orange-300">{tournament.views} views</span>
                          <div className="flex items-center gap-1 px-3 py-1 bg-orange-500/80 rounded-full">
                            <span className="text-white font-bold text-sm">
                              {tournament.registrations}
                            </span>
                            <span className="text-white text-xs">warriors</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE: Analytics Dashboard */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-orange-200 mb-4 uppercase">
                  Format Performance
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Swords className="w-4 h-4 text-orange-300" />
                        <span className="text-white font-medium">Standard</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">+24%</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white">32 warriors</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-300" />
                        <span className="text-white font-medium">Commander</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">+18%</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white">24 warriors</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-medium">Draft</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">+12%</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white">16 warriors</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-white font-medium">Modern</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">+8%</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white">12 warriors</p>
                  </div>
                </div>

                <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-600/50 uppercase">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: FEATURE GROUPS */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        {/* GROUP 1: TOURNAMENT MANAGEMENT */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-4 flex items-center gap-3 uppercase">
            <span>📊</span> TOURNAMENT MANAGEMENT
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Features that help you organize and track tournaments
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-orange-500/30 rounded-lg p-6 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-orange-400 mb-3">Registration Tracking</h3>
              <p className="text-gray-300 text-sm mb-4">
                See EXACTLY which formats attract the most warriors
              </p>
              <div className="mt-auto">
                <div className="bg-orange-900/30 rounded p-2">
                  <div className="text-xs text-orange-300">This week: 84 registrations</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-red-400 mb-3">Format Performance</h3>
              <p className="text-gray-300 text-sm mb-4">
                Compare Standard, Commander, Draft - see what works
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full w-4/5" />
                  </div>
                  <span className="text-xs text-gray-400">Standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-600 to-orange-500 h-2 rounded-full w-3/4" />
                  </div>
                  <span className="text-xs text-gray-400">Commander</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-yellow-500/30 rounded-lg p-6 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">Attendance Rates</h3>
              <p className="text-gray-300 text-sm mb-4">
                Track no-shows and optimize tournament scheduling
              </p>
              <div className="bg-yellow-900/30 rounded p-2">
                <div className="text-2xl font-bold text-yellow-300">94.2%</div>
                <div className="text-xs text-yellow-400">Avg attendance rate</div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-green-500/30 rounded-lg p-6 hover:border-green-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-green-400 mb-3">Prize Tracking</h3>
              <p className="text-gray-300 text-sm mb-4">
                Monitor prize pools and payouts automatically
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-green-900/30 rounded p-2 text-center">
                  <div className="text-xs text-green-300">This Week</div>
                  <div className="text-sm font-bold text-white">$840</div>
                </div>
                <div className="flex-1 bg-green-900/50 rounded p-2 text-center border border-green-400">
                  <div className="text-xs text-green-300">This Month</div>
                  <div className="text-sm font-bold text-white">$3,240</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GROUP 2: WARRIOR EXPERIENCE */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-4 flex items-center gap-3 uppercase">
            <span>⚡</span> WARRIOR EXPERIENCE
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Features that enhance the tournament registration experience
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="text-4xl mb-3">🔔</div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Notifications</h3>
              <p className="text-cyan-100 text-sm">Get notified when warriors register</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-500/30 rounded-lg p-6 hover:border-green-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-bold text-white mb-2">Real-Time Payments</h3>
              <p className="text-green-100 text-sm">See entry fee payments land in real-time</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-lg font-bold text-white mb-2">Calendar Sync</h3>
              <p className="text-blue-100 text-sm">Syncs with Google Calendar automatically</p>
            </div>

            <div className="bg-gradient-to-br from-teal-900/40 to-teal-800/20 border border-teal-500/30 rounded-lg p-6 hover:border-teal-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="text-lg font-bold text-white mb-2">Auto Reminders</h3>
              <p className="text-teal-100 text-sm">
                Send automatic reminders to warriors (reduce no-shows)
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 border border-indigo-500/30 rounded-lg p-6 hover:border-indigo-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile Management</h3>
              <p className="text-indigo-100 text-sm">Manage tournaments from your phone</p>
            </div>
          </div>
        </div>

        {/* GROUP 3: YOUR CONTROL */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-4 flex items-center gap-3 uppercase">
            <span>🎯</span> YOUR CONTROL
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Features that give you control over tournament schedules
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
              <div className="text-4xl mb-3">🚫</div>
              <h3 className="text-lg font-bold text-white mb-2">Event Capacity Control</h3>
              <p className="text-red-100 text-sm">Set max capacity per tournament format</p>
            </div>

            <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-lg font-bold text-white mb-2">Multi-Location Support</h3>
              <p className="text-orange-100 text-sm">Manage tournaments across different venues</p>
            </div>

            <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 border border-amber-500/30 rounded-lg p-6 hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="text-4xl mb-3">💵</div>
              <h3 className="text-lg font-bold text-white mb-2">Dynamic Pricing</h3>
              <p className="text-amber-100 text-sm">
                Set different entry fees for different formats
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: SDK DIAGNOSTICS */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <span>🧪</span> SDK DIAGNOSTICS
          </h2>
          <p className="text-gray-400 mb-8 text-lg">Test API connectivity and SDK functionality</p>
          <SDKTests />
        </div>

        {/* SECTION 5: CALL-TO-ACTION */}
        <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-2xl overflow-hidden shadow-2xl p-8 sm:p-12 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-orange-100 mb-4 uppercase">
            Ready to Level Up Your Tournaments?
          </h3>
          <p className="text-xl text-orange-200 mb-8 max-w-2xl mx-auto">
            Start tracking warrior registrations and optimize your tournament schedule
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-600/50 flex items-center justify-center gap-2 uppercase">
              <Swords className="w-5 h-5" />
              Start Managing Tournaments
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white font-bold text-lg rounded-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase">
              <Users className="w-5 h-5" />
              View Warrior Dashboard
            </button>
          </div>
          <div className="text-orange-300 text-sm">
            <a href="#" className="hover:text-white transition-colors underline">
              View Live Demo
            </a>
            <span className="mx-3">•</span>
            <span>Used by 50+ tournament organizers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
