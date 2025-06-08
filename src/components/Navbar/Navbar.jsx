import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';
import logo from '../../assets/myLogo.jpeg';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Navigation items configuration with responsive offsets
  const navItems = [
    { 
      id: 'intro', 
      label: 'Home', 
      offset: { mobile: -80, tablet: -90, desktop: -100 }
    },
    { 
      id: 'skill', 
      label: 'About', 
      offset: { mobile: -40, tablet: -50, desktop: -60 }
    },
    { 
      id: 'works', 
      label: 'Portfolio', 
      offset: { mobile: -80, tablet: -90, desktop: -100 }
    },
    { 
      id: 'clients', 
      label: 'Clients', 
      offset: { mobile: -80, tablet: -90, desktop: -100 }
    },
  ];

  // Responsive breakpoint detection
  const updateDeviceType = useCallback(() => {
    const width = window.innerWidth;
    setIsMobile(width < 768);
    setIsTablet(width >= 768 && width < 1024);
  }, []);

  // Enhanced scroll handler with direction detection
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Update scroll state
    setIsScrolled(currentScrollY > 50);
    
    // Detect scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Initialize responsive behavior
  useEffect(() => {
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', updateDeviceType);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateDeviceType, handleScroll]);

  // Enhanced outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.navbar') && !event.target.closest('.mobile-nav-overlay')) {
        setShowMenu(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && showMenu) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showMenu]);

  // Get responsive offset based on device type
  const getResponsiveOffset = (item) => {
    if (isMobile) return item.offset.mobile;
    if (isTablet) return item.offset.tablet;
    return item.offset.desktop;
  };

  // Handle mobile menu toggle with haptic feedback
  const toggleMobileMenu = () => {
    setShowMenu(!showMenu);
    
    // Add haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  // Enhanced contact handler with smooth scrolling
  const handleContactClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      const offset = isMobile ? -60 : -80;
      const elementPosition = contactElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth'
      });
    }
    setShowMenu(false);
  };

  // Handle nav item click with analytics
  const handleNavClick = (itemId) => {
    setShowMenu(false);
    setActiveSection(itemId);
    
    // Optional: Add analytics tracking
    // analytics.track('Navigation Click', { section: itemId, device: isMobile ? 'mobile' : 'desktop' });
  };

  // Touch handlers for better mobile interaction
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Close menu on left swipe, open on right swipe (when closed)
    if (isLeftSwipe && showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <>
      <nav 
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${
          scrollDirection === 'down' && isScrolled ? 'navbar-hidden' : ''
        } ${isMobile ? 'navbar-mobile' : ''} ${isTablet ? 'navbar-tablet' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-brand">
            <Link
              to="intro"
              smooth={true}
              duration={500}
              className="logo-link"
              onClick={() => handleNavClick('intro')}
              aria-label="Go to home section"
            >
              <img 
                src={logo} 
                alt="Ifechukwu Logo" 
                className="navbar-logo"
                loading="eager"
                width="40"
                height="40"
              />
              <span className="brand-text">Ifechukwu</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav" role="menubar">
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <li key={item.id} className="nav-item" role="none">
                  <Link
                    activeClass="active"
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={getResponsiveOffset(item)}
                    duration={500}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onSetActive={() => setActiveSection(item.id)}
                    onClick={() => handleNavClick(item.id)}
                    role="menuitem"
                    tabIndex={0}
                    aria-label={`Go to ${item.label} section`}
                  >
                    {item.label}
                    <span className="nav-indicator"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <button 
            className="cta-button desktop-cta" 
            onClick={handleContactClick}
            aria-label="Contact me"
            type="button"
          >
            <span>Contact Me</span>
            <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${showMenu ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={showMenu ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={showMenu}
            aria-controls="mobile-navigation"
            type="button"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`mobile-nav-overlay ${showMenu ? 'active' : ''}`}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <img 
              src={logo} 
              alt="Logo" 
              className="mobile-logo"
              width="32"
              height="32"
            />
            <h3 id="mobile-nav-title">Navigation</h3>
            <button
              className="mobile-close-btn"
              onClick={() => setShowMenu(false)}
              aria-label="Close navigation menu"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <ul className="mobile-nav-list" role="menu">
            {navItems.map((item, index) => (
              <li 
                key={item.id} 
                className="mobile-nav-item" 
                style={{ '--delay': `${index * 0.1}s` }}
                role="none"
              >
                <Link
                  activeClass="active"
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={getResponsiveOffset(item)}
                  duration={500}
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  role="menuitem"
                  tabIndex={showMenu ? 0 : -1}
                  aria-label={`Go to ${item.label} section`}
                >
                  <span className="mobile-nav-number">0{index + 1}</span>
                  <span className="mobile-nav-text">{item.label}</span>
                  <svg className="mobile-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </li>
            ))}
            <li 
              className="mobile-nav-item mobile-cta-item" 
              style={{ '--delay': `${navItems.length * 0.1}s` }}
              role="none"
            >
              <button 
                className="mobile-cta-button" 
                onClick={handleContactClick}
                role="menuitem"
                tabIndex={showMenu ? 0 : -1}
                aria-label="Contact me"
                type="button"
              >
                <span className="mobile-nav-number">0{navItems.length + 1}</span>
                <span className="mobile-nav-text">Contact</span>
                <svg className="mobile-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </button>
            </li>
          </ul>

          {/* Mobile Social Links */}
          <div className="mobile-social">
            <p>Let's connect</p>
            <div className="mobile-social-links" role="list">
              <a 
                href="#" 
                className="mobile-social-link" 
                aria-label="Connect on LinkedIn"
                role="listitem"
                tabIndex={showMenu ? 0 : -1}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="mobile-social-link" 
                aria-label="View GitHub profile"
                role="listitem"
                tabIndex={showMenu ? 0 : -1}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="mobile-social-link" 
                aria-label="Follow on Twitter"
                role="listitem"
                tabIndex={showMenu ? 0 : -1}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {showMenu && (
        <div 
          className="mobile-backdrop" 
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
