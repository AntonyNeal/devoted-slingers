import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SwipePage } from './pages/SwipePage';
import { MatchesPage } from './pages/MatchesPage';
import { ChatPage } from './pages/ChatPage';
import { DeckBuilderPage } from './pages/DeckBuilderPage';
import { ProfilePage } from './pages/ProfilePage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-xl font-bold text-primary-600">
                Devoted Slingers
              </Link>
              <div className="flex gap-6">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  Discover
                </Link>
                <Link
                  to="/matches"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  Matches
                </Link>
                <Link
                  to="/decks"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  Decks
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<SwipePage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/chat/:matchId" element={<ChatPage />} />
          <Route path="/decks" element={<DeckBuilderPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
