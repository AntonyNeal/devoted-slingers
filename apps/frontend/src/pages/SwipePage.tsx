import React, { useState, useEffect } from 'react';
import { SwipeCard } from '../components/SwipeCard';
import { matchmakingApi, userApi } from '../services/api';
import { UserProfile } from '@devoted-slingers/matchmaking-sdk';

export const SwipePage: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const { userIds } = await matchmakingApi.getPotentialMatches(20);
      
      // Fetch full profiles for these users
      const profilePromises = userIds.map((id: string) => userApi.getProfile(id));
      const profileResults = await Promise.allSettled(profilePromises);
      
      const loadedProfiles = profileResults
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .map(result => result.value.profile);
      
      setProfiles(loadedProfiles);
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (userId: string, direction: 'like' | 'pass') => {
    try {
      const result = await matchmakingApi.swipe(userId, direction);
      
      if (result.match) {
        // Show match notification
        alert('It\'s a match! 🎉');
      }

      setCurrentIndex(prev => prev + 1);

      // Load more profiles if running low
      if (currentIndex >= profiles.length - 3) {
        loadProfiles();
      }
    } catch (error) {
      console.error('Error swiping:', error);
    }
  };

  if (loading && profiles.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading profiles...</div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold text-primary-700">Devoted Slingers</h1>
          <p className="text-gray-600 mt-2">Find your MTG match</p>
        </header>

        <div className="relative h-[600px] flex items-center justify-center">
          {currentProfile ? (
            <SwipeCard
              key={currentProfile.id}
              profile={currentProfile}
              onSwipe={handleSwipe}
            />
          ) : (
            <div className="card p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">No more profiles</h2>
              <p className="text-gray-600 mb-6">
                Check back later for more potential matches!
              </p>
              <button
                onClick={loadProfiles}
                className="btn-primary"
              >
                Refresh
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => currentProfile && handleSwipe(currentProfile.id, 'pass')}
            className="w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-2xl"
            disabled={!currentProfile}
          >
            ✕
          </button>
          <button
            onClick={() => currentProfile && handleSwipe(currentProfile.id, 'like')}
            className="w-16 h-16 rounded-full bg-primary-600 text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-2xl"
            disabled={!currentProfile}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};
