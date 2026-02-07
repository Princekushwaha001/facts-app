
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFact, setSelectedFact] = useState(null);

  // Backend API URL - Change this to your deployed backend URL
  const API_URL = process.env.REACT_APP_API_URL || 'https://factscheck-gcedbya8eufsdkcd.southindia-01.azurewebsites.net/';

  useEffect(() => {
    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch facts');
      }

      const data = await response.json();
      setFacts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching facts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter facts based on search (by ID or fact text)
  const filteredFacts = facts.filter(fact => {
    const searchLower = searchTerm.toLowerCase().trim();

    // Solution: Detect if search is numeric
    const isNumericSearch = /^\d+$/.test(searchLower);

    if (isNumericSearch) {
    // Number typed → exact ID match only
    return fact.id.toString() === searchLower;
    } else {
    // Text typed → search in fact content
    return fact.fact.toLowerCase().includes(searchLower);
    }
  });

  return (
    <div className="App">
      {/* Animated Background */}
      <div className="background-animation"></div>

      <div className="container">
        {/* Header Section */}
        <header className="header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">✨</div>
              <div>
                <h1 className="title">Amazing Facts</h1>
                <p className="subtitle">Discover fascinating facts about our world</p>
              </div>
            </div>
            <div className="stats-badge">
              <span className="stats-number">{facts.length}</span>
              <span className="stats-label">Facts</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-wrapper">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by ID or fact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-btn" onClick={() => setSearchTerm('')}>
                  ✕
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {loading && (
            <div className="loading">
              <div className="spinner-container">
                <div className="spinner"></div>
                <div className="spinner-glow"></div>
              </div>
              <p className="loading-text">Loading amazing facts...</p>
            </div>
          )}

          {error && (
            <div className="error-card">
              <div className="error-icon">⚠️</div>
              <h3 className="error-title">Oops! Something went wrong</h3>
              <p className="error-message">{error}</p>
              <button onClick={fetchFacts} className="retry-btn">
                <svg className="retry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && filteredFacts.length === 0 && searchTerm && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No facts found</h3>
              <p>Try a different search term</p>
            </div>
          )}

          {!loading && !error && filteredFacts.length > 0 && (
            <>
              <div className="results-info">
                Showing {filteredFacts.length} {filteredFacts.length === 1 ? 'fact' : 'facts'}
              </div>
              <div className="facts-grid">
                {filteredFacts.map((fact, index) => (
                  <div
                    key={fact.id}
                    className={`fact-card ${selectedFact === fact.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFact(selectedFact === fact.id ? null : fact.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="fact-header">
                      <div className="fact-number">
                        <span className="hash">#</span>
                        <span className="number">{fact.id}</span>
                      </div>
                      <div className="fact-icon">💡</div>
                    </div>
                    <p className="fact-text">{fact.fact}</p>
                    <div className="fact-footer">
                      <button className="share-btn" onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(fact.fact);
                      }}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p className="footer-text">Built with ❤️ using React & FastAPI</p>
            <div className="footer-links">
              <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span className="footer-divider">•</span>
              <a href={API_URL} className="footer-link" target="_blank" rel="noopener noreferrer">
                API
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;