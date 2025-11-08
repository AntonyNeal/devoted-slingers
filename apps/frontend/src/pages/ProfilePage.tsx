import React, { useState } from 'react';
import { userApi } from '../services/api';

export const ProfilePage: React.FC = () => {
  const currentUserId = localStorage.getItem('userId') || 'demo-user';
  
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    location: {
      city: '',
      country: '',
    },
  });

  const [mtgProfile, setMtgProfile] = useState({
    favoriteFormats: [] as string[],
    favoriteColors: [] as string[],
    experienceLevel: 'intermediate',
    playStyle: [] as string[],
    lookingFor: [] as string[],
  });

  const formats = ['Standard', 'Modern', 'Commander', 'Legacy', 'Vintage', 'Pioneer', 'Pauper'];
  const colors = [
    { code: 'W', name: 'White', color: 'bg-yellow-100' },
    { code: 'U', name: 'Blue', color: 'bg-blue-500' },
    { code: 'B', name: 'Black', color: 'bg-gray-800' },
    { code: 'R', name: 'Red', color: 'bg-red-600' },
    { code: 'G', name: 'Green', color: 'bg-green-600' },
  ];
  const playStyles = ['casual', 'competitive', 'social', 'tournament'];
  const lookingForOptions = [
    'playgroup',
    'tournament_partner',
    'casual_games',
    'deck_building',
    'trading',
    'friendship',
  ];

  const toggleArrayItem = (array: string[], item: string, setter: (val: any) => void) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await userApi.updateProfile(currentUserId, {
        ...profile,
        // MTG profile would be updated separately in a real app
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="py-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600 mt-2">Customize your matchmaking preferences</p>
        </header>

        <div className="space-y-6">
          {/* Basic Profile */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell others about yourself..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={profile.location.city}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        location: { ...profile.location, city: e.target.value },
                      })
                    }
                    placeholder="Your city"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={profile.location.country}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        location: { ...profile.location, country: e.target.value },
                      })
                    }
                    placeholder="Your country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MTG Preferences */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">MTG Preferences</h2>

            {/* Favorite Formats */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favorite Formats
              </label>
              <div className="flex flex-wrap gap-2">
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() =>
                      toggleArrayItem(
                        mtgProfile.favoriteFormats,
                        format,
                        (val) => setMtgProfile({ ...mtgProfile, favoriteFormats: val })
                      )
                    }
                    className={`px-4 py-2 rounded-lg border ${
                      mtgProfile.favoriteFormats.includes(format)
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite Colors */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favorite Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.code}
                    onClick={() =>
                      toggleArrayItem(
                        mtgProfile.favoriteColors,
                        color.code,
                        (val) => setMtgProfile({ ...mtgProfile, favoriteColors: val })
                      )
                    }
                    className={`w-16 h-16 rounded-full ${color.color} flex items-center justify-center font-bold text-lg ${
                      mtgProfile.favoriteColors.includes(color.code)
                        ? 'ring-4 ring-primary-600 ring-offset-2'
                        : 'opacity-50 hover:opacity-100'
                    } ${color.code === 'W' ? 'text-gray-800' : 'text-white'}`}
                  >
                    {color.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={mtgProfile.experienceLevel}
                onChange={(e) =>
                  setMtgProfile({ ...mtgProfile, experienceLevel: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="competitive">Competitive</option>
              </select>
            </div>

            {/* Play Style */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Play Style
              </label>
              <div className="flex flex-wrap gap-2">
                {playStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() =>
                      toggleArrayItem(
                        mtgProfile.playStyle,
                        style,
                        (val) => setMtgProfile({ ...mtgProfile, playStyle: val })
                      )
                    }
                    className={`px-4 py-2 rounded-lg border capitalize ${
                      mtgProfile.playStyle.includes(style)
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Looking For */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Looking For
              </label>
              <div className="flex flex-wrap gap-2">
                {lookingForOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      toggleArrayItem(
                        mtgProfile.lookingFor,
                        option,
                        (val) => setMtgProfile({ ...mtgProfile, lookingFor: val })
                      )
                    }
                    className={`px-4 py-2 rounded-lg border ${
                      mtgProfile.lookingFor.includes(option)
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                    }`}
                  >
                    {option.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleSaveProfile} className="w-full btn-primary">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
