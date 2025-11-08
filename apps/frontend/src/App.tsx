import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SwipePage } from './pages/SwipePage';
import { MatchesPage } from './pages/MatchesPage';
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
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<SwipePage />} />
          <Route path="/matches" element={<MatchesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
