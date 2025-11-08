import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchmakingApi, userApi } from '../services/api';
import { Match } from '@devoted-slingers/matchmaking-sdk';

export const MatchesPage: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const { matches: matchData } = await matchmakingApi.getMatches('accepted');
      
      // Fetch profiles for matched users
      const enrichedMatches = await Promise.all(
        matchData.map(async (match: Match) => {
          const currentUserId = localStorage.getItem('userId');
          const otherUserId = match.userId1 === currentUserId ? match.userId2 : match.userId1;
          
          try {
            const { profile } = await userApi.getProfile(otherUserId);
            return { ...match, profile };
          } catch (error) {
            return match;
          }
        })
      );
      
      setMatches(enrichedMatches);
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="py-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Matches</h1>
          <p className="text-gray-600 mt-2">Start a conversation!</p>
        </header>

        {matches.length === 0 ? (
          <div className="card p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">No matches yet</h2>
            <p className="text-gray-600">
              Keep swiping to find your perfect MTG match!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((match) => (
              <div 
                key={match.id} 
                className="card p-4 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/chat/${match.id}`)}
              >
                <div className="flex items-center gap-4">
                  {match.profile?.avatarUrl ? (
                    <img
                      src={match.profile.avatarUrl}
                      alt={match.profile.displayName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-2xl text-white font-bold">
                        {match.profile?.displayName?.charAt(0).toUpperCase() || '?'}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{match.profile?.displayName || 'Unknown User'}</h3>
                    {match.profile?.location && (
                      <p className="text-sm text-gray-600">
                        {match.profile.location.city}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Matched {new Date(match.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
