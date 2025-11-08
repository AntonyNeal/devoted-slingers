import React, { useState, useEffect } from 'react';
import { ScryfallDataSource } from '@devoted-slingers/matchmaking-sdk';

const scryfallApi = new ScryfallDataSource();

export const DeckBuilderPage: React.FC = () => {
  const [deckName, setDeckName] = useState('');
  const [format, setFormat] = useState('Commander');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [mainboard, setMainboard] = useState<any[]>([]);
  const [commander, setCommander] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    scryfallApi.initialize();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setSearching(true);
      const results = await scryfallApi.searchCards(searchQuery);
      setSearchResults(results.data);
    } catch (error) {
      console.error('Error searching cards:', error);
    } finally {
      setSearching(false);
    }
  };

  const addToMainboard = (card: any) => {
    const existingCard = mainboard.find((c) => c.id === card.id);
    if (existingCard) {
      setMainboard(
        mainboard.map((c) =>
          c.id === card.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setMainboard([...mainboard, { ...card, quantity: 1 }]);
    }
  };

  const setAsCommander = (card: any) => {
    setCommander(card);
  };

  const removeCard = (cardId: string) => {
    setMainboard(mainboard.filter((c) => c.id !== cardId));
  };

  const saveDeck = () => {
    // In a real app, this would call the API to save the deck
    const deck = {
      name: deckName,
      format,
      mainboard: mainboard.map((c) => ({
        scryfallId: c.id,
        name: c.name,
        quantity: c.quantity,
        imageUrl: c.image_uris?.small,
      })),
      commander: commander
        ? {
            scryfallId: commander.id,
            name: commander.name,
            quantity: 1,
            imageUrl: commander.image_uris?.small,
          }
        : undefined,
    };
    console.log('Saving deck:', deck);
    alert('Deck saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <header className="py-6">
          <h1 className="text-3xl font-bold text-gray-900">Deck Builder</h1>
          <p className="text-gray-600 mt-2">Create and share your MTG decks</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deck Info & Search */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Deck Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deck Name
                  </label>
                  <input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="My Awesome Deck"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  >
                    <option>Commander</option>
                    <option>Modern</option>
                    <option>Standard</option>
                    <option>Pioneer</option>
                    <option>Legacy</option>
                    <option>Vintage</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Card Search</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search for cards..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={searching}
                  className="btn-primary"
                >
                  {searching ? 'Searching...' : 'Search'}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {searchResults.map((card) => (
                  <div
                    key={card.id}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    {card.image_uris?.small && (
                      <img
                        src={card.image_uris.small}
                        alt={card.name}
                        className="w-full"
                      />
                    )}
                    <div className="p-2 bg-white">
                      <p className="text-xs font-semibold truncate">{card.name}</p>
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={() => addToMainboard(card)}
                          className="text-xs bg-primary-600 text-white px-2 py-1 rounded"
                        >
                          Add
                        </button>
                        {format === 'Commander' && (
                          <button
                            onClick={() => setAsCommander(card)}
                            className="text-xs bg-yellow-600 text-white px-2 py-1 rounded"
                          >
                            Cmdr
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deck List */}
          <div className="space-y-6">
            {format === 'Commander' && commander && (
              <div className="card p-4">
                <h3 className="font-bold mb-2">Commander</h3>
                <div className="flex items-center gap-2">
                  {commander.image_uris?.small && (
                    <img
                      src={commander.image_uris.small}
                      alt={commander.name}
                      className="w-16 h-auto rounded"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{commander.name}</p>
                    <button
                      onClick={() => setCommander(null)}
                      className="text-xs text-red-600 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="card p-4">
              <h3 className="font-bold mb-2">
                Mainboard ({mainboard.reduce((acc, c) => acc + c.quantity, 0)} cards)
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {mainboard.length === 0 ? (
                  <p className="text-sm text-gray-500">No cards added yet</p>
                ) : (
                  mainboard.map((card) => (
                    <div key={card.id} className="flex items-center gap-2 text-sm">
                      <span className="font-semibold w-8">{card.quantity}x</span>
                      <span className="flex-1">{card.name}</span>
                      <button
                        onClick={() => removeCard(card.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={saveDeck}
              disabled={!deckName.trim() || mainboard.length === 0}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
