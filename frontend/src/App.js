import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend API URL - Change this to your deployed backend URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/facts';

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

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="title">🌟 Amazing Facts</h1>
          <p className="subtitle">Discover interesting facts about our world</p>
        </header>

        <main className="main-content">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading amazing facts...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>⚠️ Error: {error}</p>
              <button onClick={fetchFacts} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="facts-grid">
              {facts.map((fact) => (
                <div key={fact.id} className="fact-card">
                  <div className="fact-number">#{fact.id}</div>
                  <p className="fact-text">{fact.fact}</p>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && facts.length === 0 && (
            <div className="no-facts">
              <p>No facts available at the moment.</p>
            </div>
          )}
        </main>

        <footer className="footer">
          <p>Built with React & FastAPI</p>
        </footer>
      </div>
    </div>
  );
}

export default App;