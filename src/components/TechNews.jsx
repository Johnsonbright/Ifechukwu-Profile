

import React, { useState, useEffect, useCallback, useRef } from 'react';


const TechNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('technology');
  const [lastUpdated, setLastUpdated] = useState(null);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  
  
  // Ref to track if this is the initial load
  const isInitialLoadRef = useRef(true);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      padding: '2rem'
    },
    maxWidth: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '3rem',
      textAlign: 'center',
      color: 'white'
    },
    mainTitle: {
      fontSize: '3.5rem',
      fontWeight: 900,
      background: 'linear-gradient(45deg, #ff6b35, #f7931e, #ffd23f)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem',
      textShadow: '0 4px 20px rgba(0,0,0,0.3)'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: 'rgba(255,255,255,0.9)',
      marginBottom: '2rem',
      fontWeight: 500
    },
    searchContainer: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    searchInput: {
      padding: '0.75rem 1.5rem',
      borderRadius: '50px',
      border: 'none',
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      fontSize: '1rem',
      minWidth: '250px',
      backdropFilter: 'blur(10px)',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    searchButton: {
      padding: '0.75rem 2rem',
      borderRadius: '50px',
      border: 'none',
      background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    },
    statsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'rgba(255,255,255,0.8)',
      fontSize: '0.9rem'
    },
    liveIndicator: {
      width: '0.75rem',
      height: '0.75rem',
      backgroundColor: '#10b981',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2rem'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    imageContainer: {
      position: 'relative',
      height: '200px',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    badge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 700
    },
    content: {
      padding: '1.5rem'
    },
    metadata: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      fontSize: '0.8rem',
      color: '#666'
    },
    sourceTag: {
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '15px',
      fontWeight: 600
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#333',
      marginBottom: '0.75rem',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    description: {
      color: '#666',
      marginBottom: '1rem',
      lineHeight: '1.6',
      fontSize: '0.9rem',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    readMoreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5rem',
      color: 'white'
    },
    spinner: {
      width: '60px',
      height: '60px',
      border: '3px solid rgba(255,255,255,0.3)',
      borderRadius: '50%',
      borderTopColor: '#ff6b35',
      animation: 'spin 1s ease-in-out infinite',
      marginBottom: '2rem'
    },
    errorContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem'
    },
    errorBox: {
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '20px',
      padding: '2rem',
      textAlign: 'center',
      maxWidth: '400px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,0,0,0.2)'
    },
    errorTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#e74c3c',
      marginBottom: '1rem'
    },
    errorMessage: {
      color: '#666',
      marginBottom: '1.5rem'
    },
    retryButton: {
      background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'all 0.3s ease'
    }
  };

  const fetchNews = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const API_URL = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=20&apikey=${API_KEY}`;
      
      // Using a CORS proxy
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const fullUrl = proxyUrl + encodeURIComponent(API_URL);
      
      const response = await fetch(fullUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const newsData = JSON.parse(data.contents);
      
      if (newsData.articles && newsData.articles.length > 0) {
        setArticles(newsData.articles);
        setLastUpdated(new Date());
      } else {
        setArticles([]);
        throw new Error('No articles found for this search');
      }
      
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(`Failed to load news: ${err.message}`);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load effect
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      fetchNews(searchQuery);
    }
  }, [fetchNews, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchNews(searchQuery.trim());
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.maxWidth}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Loading News...</h2>
            <p style={{ opacity: 0.8 }}>Fetching the latest articles for you</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.maxWidth}>
          <div style={styles.errorContainer}>
            <div style={styles.errorBox}>
              <h2 style={styles.errorTitle}>Oops! Something went wrong</h2>
              <p style={styles.errorMessage}>{error}</p>
              <button
                onClick={() => fetchNews(searchQuery)}
                style={styles.retryButton}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>GNews Tech Hub</h1>
          <p style={styles.subtitle}>Discover the latest technology news from around the world</p>
          
          <div style={styles.searchContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search for tech news..."
              style={styles.searchInput}
              onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }
              }}
            />
            <button
              onClick={handleSearch}
              style={styles.searchButton}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Search
            </button>
          </div>

          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <div style={styles.liveIndicator}></div>
              <span>Live Updates</span>
            </div>
            <div style={styles.statItem}>
              <span>📰</span>
              <span>{articles.length} articles found</span>
            </div>
            {lastUpdated && (
              <div style={styles.statItem}>
                <span>🕒</span>
                <span>Updated {formatTimeAgo(lastUpdated)}</span>
              </div>
            )}
          </div>
        </div>

        <div style={styles.grid}>
          {articles.map((article, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.15)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {article.image && (
                <div style={styles.imageContainer}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={styles.image}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div style={styles.badge}>NEWS</div>
                </div>
              )}
              
              <div style={styles.content}>
                <div style={styles.metadata}>
                  <span style={styles.sourceTag}>
                    {article.source?.name || 'GNews'}
                  </span>
                  <span>{formatTimeAgo(article.publishedAt)}</span>
                </div>

                <h3 style={styles.title}>{article.title}</h3>

                <p style={styles.description}>
                  {article.description || 'No description available.'}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.readMoreButton}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                  }}
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && !loading && !error && (
          <div style={{ textAlign: 'center', color: 'white', padding: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No articles found</h3>
            <p>Try searching for different keywords</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          h1 { font-size: 2.5rem !important; }
          .search-container { flex-direction: column; align-items: center; }
          .search-input { min-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default TechNews;