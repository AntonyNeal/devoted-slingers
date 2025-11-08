import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface SwipeCardProps {
  profile: {
    id: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    location?: {
      city?: string;
      country?: string;
    };
  };
  onSwipe: (id: string, direction: 'like' | 'pass') => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ profile, onSwipe }) => {
  const [gone, setGone] = useState(false);

  const [{ x, y, rotate }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
  }));

  const bind = useDrag(
    ({ down, movement: [mx, my], velocity: [vx], direction: [xDir] }) => {
      const trigger = vx > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) {
        setGone(true);
        onSwipe(profile.id, dir === 1 ? 'like' : 'pass');
      }

      api.start({
        x: down ? mx : gone ? (200 + window.innerWidth) * dir : 0,
        y: down ? my : 0,
        rotate: down ? mx / 100 : 0,
        config: { friction: 50, tension: down ? 800 : 500 },
      });
    }
  );

  if (gone) return null;

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        rotate,
        touchAction: 'none',
      }}
      className="absolute w-full max-w-sm cursor-grab active:cursor-grabbing"
    >
      <div className="card">
        <div className="relative h-96">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <span className="text-6xl text-white font-bold">
                {profile.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{profile.displayName}</h2>
          {profile.location && (
            <p className="text-gray-600 mb-3">
              {profile.location.city}
              {profile.location.city && profile.location.country && ', '}
              {profile.location.country}
            </p>
          )}
          {profile.bio && <p className="text-gray-700">{profile.bio}</p>}
        </div>
      </div>
    </animated.div>
  );
};
