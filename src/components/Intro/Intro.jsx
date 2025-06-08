import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import picture from '../../assets/intropic.jpeg'
import resumePDF from '../../assets/Ifechukwu_Resume.pdf'

export default function Intro() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const roles = [
    "Frontend Engineer", 
    "React Native Developer",
    "React Developer"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotating roles animation
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  // Function to handle PDF download
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Ifechukwu_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to open PDF in new tab
  const handleResumeView = () => {
    window.open(resumePDF, '_blank');
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.resume-button-group')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // Mobile detection with better debouncing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const styles = {
    // Main container styles
    introSection: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: isMobile ? '1rem 0.5rem 6rem' : '2rem 1rem', // Added bottom padding for mobile
    },

    introContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '2rem' : '4rem',
      alignItems: 'center',
      zIndex: 2,
      position: 'relative',
      width: '100%',
    },

    // Content styles
    introContent: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease-out',
      textAlign: isMobile ? 'center' : 'left',
      order: isMobile ? 2 : 1,
    },

    greetingWrapper: {
      marginBottom: '1rem',
    },

    greeting: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '500',
      display: 'inline-block',
    },

    nameWrapper: {
      marginBottom: '1rem',
    },

    introHeading: {
      fontSize: 'clamp(2rem, 6vw, 4rem)',
      fontWeight: '800',
      color: 'white',
      margin: '0',
      lineHeight: '1.1',
    },

    nameHighlight: {
      background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      position: 'relative',
    },

    roleWrapper: {
      marginBottom: '1.5rem',
      height: 'clamp(2.5rem, 5vw, 3rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
    },

    roleText: {
      fontSize: 'clamp(1.2rem, 4vw, 2.2rem)',
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.95)',
      margin: '0',
    },

    roleRotating: {
      display: 'inline-block',
      background: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'roleSlideIn 0.6s ease-out',
    },

    introDescription: {
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '2.5rem',
      maxWidth: '100%',
    },

    // CTA Button styles
    ctaWrapper: {
      display: 'flex',
      gap: '1rem',
      marginBottom: isMobile ? '3rem' : '2rem', // Increased margin for mobile
      flexWrap: 'wrap',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'stretch',
    },

    ctaLink: {
      textDecoration: 'none',
      flex: isMobile ? 'none' : '1',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '280px' : 'none',
      minWidth: isMobile ? 'auto' : '200px',
    },

    // Resume button group styles - FIXED for mobile
    resumeButtonGroup: {
      display: 'flex',
      gap: '0.5rem',
      flex: isMobile ? 'none' : '1',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '280px' : 'none',
      minWidth: isMobile ? 'auto' : '200px',
      position: 'relative', // Important for dropdown positioning
    },

    resumeButtonMain: {
      flex: '1',
      borderRadius: '50px 0 0 50px',
    },

    resumeButtonDropdown: {
      width: '50px',
      borderRadius: '0 50px 50px 0',
      borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
    },

    // FIXED dropdown menu positioning for mobile
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      right: isMobile ? '0' : '0',
      left: isMobile ? '0' : 'auto', // Full width on mobile
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '0.5rem 0',
      minWidth: isMobile ? '100%' : '160px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      marginTop: '0.5rem',
      // Ensure it doesn't go off-screen on mobile
      maxWidth: isMobile ? '100vw' : '200px',
      transform: isMobile ? 'translateX(0)' : 'none',
    },

    dropdownItem: {
      padding: '0.75rem 1rem',
      color: '#333',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: '500',
    },

    ctaButton: {
      padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
      border: 'none',
      borderRadius: '50px',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    },

    ctaButtonPrimary: {
      background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
      color: 'white',
      boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
    },

    ctaButtonSecondary: {
      background: 'transparent',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)',
    },

    arrowIcon: {
      width: '20px',
      height: '20px',
      transition: 'transform 0.3s ease',
    },

    downloadIcon: {
      width: '20px',
      height: '20px',
      transition: 'transform 0.3s ease',
    },

    // FIXED social links styles for mobile
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: isMobile ? '1rem' : '0', // Add margin for mobile spacing
    },

    socialLink: {
      width: 'clamp(40px, 8vw, 45px)',
      height: 'clamp(40px, 8vw, 45px)',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },

    socialLinkSvg: {
      width: 'clamp(16px, 3vw, 20px)',
      height: 'clamp(16px, 3vw, 20px)',
    },

    // Image styles
    introImageWrapper: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
      transition: 'all 1s ease-out 0.4s',
      display: 'flex',
      justifyContent: 'center',
      order: isMobile ? 1 : 2,
    },

    imageContainer: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    imageBackdrop: {
      position: 'absolute',
      width: '150%',
      height: '150%',
      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      borderRadius: '50%',
      backdropFilter: 'blur(20px)',
      animation: 'pulse 4s ease-in-out infinite',
    },

    profileImage: {
      width: isMobile ? 'clamp(180px, 50vw, 300px)' : 'clamp(200px, 60vw, 450px)',
      height: isMobile ? 'clamp(180px, 50vw, 300px)' : 'clamp(300px, 70vw, 500px)',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '4px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      zIndex: 1,
      transition: 'transform 0.3s ease',
    },

    // Floating elements
    floatingElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    },

    floatingElement: {
      position: 'absolute',
      fontSize: isMobile ? 'clamp(1rem, 2.5vw, 1.5rem)' : 'clamp(1.2rem, 3vw, 2rem)',
      animation: 'float 3s ease-in-out infinite',
    },

    element1: { 
      top: '10%', 
      right: isMobile ? '90%' : '100%', 
      animationDelay: '0s' 
    },
    element2: { 
      top: '5%', 
      left: isMobile ? '90%' : '100%', 
      animationDelay: '0.5s' 
    },
    element3: { 
      bottom: '1%', 
      right: isMobile ? '90%' : '105%', 
      animationDelay: '1s' 
    },
    element4: { 
      bottom: '1%', 
      left: isMobile ? '90%' : '100%', 
      animationDelay: '1.5s' 
    },

    // Background elements
    backgroundElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    },

    bgElement: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
      animation: 'backgroundFloat 6s ease-in-out infinite',
    },

    bg1: {
      width: 'clamp(100px, 20vw, 200px)',
      height: 'clamp(100px, 20vw, 200px)',
      top: '10%',
      left: '5%',
      animationDelay: '0s',
    },

    bg2: {
      width: 'clamp(75px, 15vw, 150px)',
      height: 'clamp(75px, 15vw, 150px)',
      top: '60%',
      right: '10%',
      animationDelay: '2s',
    },

    bg3: {
      width: 'clamp(50px, 10vw, 100px)',
      height: 'clamp(50px, 10vw, 100px)',
      bottom: '20%',
      left: '20%',
      animationDelay: '4s',
    },

    // FIXED scroll indicator positioning
    scrollIndicator: {
      position: 'absolute',
      bottom: isMobile ? '1rem' : '2rem', // Reduced bottom margin on mobile
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.7)',
      zIndex: 10, // Ensure it's above other elements
    },

    scrollIndicatorLink: {
      color: 'inherit',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
    },

    scrollMouse: {
      width: isMobile ? '20px' : '24px',
      height: isMobile ? '32px' : '40px',
      border: '2px solid currentColor',
      borderRadius: isMobile ? '10px' : '12px',
      position: 'relative',
      marginBottom: '0.5rem',
    },

    scrollWheel: {
      width: '3px',
      height: isMobile ? '8px' : '10px',
      background: 'currentColor',
      borderRadius: '2px',
      position: 'absolute',
      top: isMobile ? '6px' : '8px',
      left: '50%',
      transform: 'translateX(-50%)',
      animation: 'scrollWheel 2s ease-in-out infinite',
    },

    scrollText: {
      fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
      fontWeight: '500',
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes roleSlideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.3; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes backgroundFloat {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          
          @keyframes scrollWheel {
            0% { opacity: 1; transform: translateX(-50%) translateY(0); }
            50% { opacity: 0.5; transform: translateX(-50%) translateY(10px); }
            100% { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
          
          .cta-button:hover {
            transform: translateY(-3px);
          }
          
          .cta-button:hover .arrow-icon {
            transform: translateX(5px);
          }

          .cta-button:hover .download-icon {
            transform: translateY(-2px);
          }
          
          .social-link:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-3px);
          }
          
          .profile-image:hover {
            transform: scale(1.05);
          }
          
          .scroll-indicator:hover {
            color: white;
          }

          /* Mobile-specific styles */
          @media (max-width: 768px) {
            .resume-button-group {
              position: relative;
            }
            
            .dropdown-menu {
              left: 0 !important;
              right: 0 !important;
              width: 100% !important;
              min-width: 100% !important;
            }
            
            /* Ensure social links don't overlap scroll indicator */
            .social-links {
              margin-bottom: 2rem;
            }
          }
        `}
      </style>
      
      <section 
        id="intro" 
        style={styles.introSection}
      >
        <div style={styles.introContainer}>
          {/* Content Side */}
          <div style={styles.introContent}>
            <div style={styles.greetingWrapper}>
              <span style={styles.greeting}>Hello there! 👋</span>
            </div>
            
            <div style={styles.nameWrapper}>
              <h1 style={styles.introHeading}>
                I'm <span style={styles.nameHighlight}>Ifechukwu</span>
              </h1>
            </div>
            
            <div style={styles.roleWrapper}>
              <h2 style={styles.roleText}>
                <span style={styles.roleRotating} key={currentRole}>
                  {roles[currentRole]}
                </span>
              </h2>
            </div>
            
            <p style={styles.introDescription}>
              I craft intuitive, responsive websites that deliver exceptional user experiences. 
              With a passion for clean code and innovative design, I bring digital visions to life.
            </p>
            
            <div style={styles.ctaWrapper}>
              <Link 
                to="contact" 
                smooth={true} 
                duration={500}
                style={styles.ctaLink}
              >
                <button 
                  className="cta-button"
                  style={{...styles.ctaButton, ...styles.ctaButtonPrimary}}
                >
                  <span>Let's Work Together</span>
                  <svg 
                    className="arrow-icon"
                    style={styles.arrowIcon} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Link>
              
              {/* Fixed Resume Button with Dropdown */}
              <div 
                className="resume-button-group"
                style={styles.resumeButtonGroup}
              >
                <button 
                  className="cta-button"
                  style={{
                    ...styles.ctaButton, 
                    ...styles.ctaButtonSecondary,
                    ...styles.resumeButtonMain
                  }}
                  onClick={handleResumeDownload}
                >
                  <span>Download Resume</span>
                  <svg 
                    className="download-icon"
                    style={styles.downloadIcon} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>

                <button 
                  className="cta-button"
                  style={{
                    ...styles.ctaButton, 
                    ...styles.ctaButtonSecondary,
                    ...styles.resumeButtonDropdown
                  }}
                  onClick={toggleDropdown}
                >
                  <span>View</span>
                  <svg 
                    style={{
                      width: '16px',
                      height: '16px',
                      transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </button>

                {showDropdown && (
                  <div 
                    className="dropdown-menu"
                    style={styles.dropdownMenu}
                  >
                    <div 
                      style={styles.dropdownItem}
                      onClick={() => {
                        handleResumeDownload();
                        setShowDropdown(false);
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <svg 
                        style={{width: '16px', height: '16px'}} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download PDF
                    </div>
                    <div 
                      style={styles.dropdownItem}
                      onClick={() => {
                        handleResumeView();
                        setShowDropdown(false);
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <svg 
                        style={{width: '16px', height: '16px'}} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      View Online
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Fixed Social Links */}
            <div 
              className="social-links"
              style={styles.socialLinks}
            >
              <a href="#" className="social-link" style={styles.socialLink} aria-label="LinkedIn">
                <svg style={styles.socialLinkSvg} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="social-link" style={styles.socialLink} aria-label="GitHub">
                <svg style={styles.socialLinkSvg} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="social-link" style={styles.socialLink} aria-label="Twitter">
                <svg style={styles.socialLinkSvg} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Image Side */}
          <div 
            style={{
              ...styles.introImageWrapper,
              ...(isMobile ? styles.mobileImageWrapper : {})
            }}
          >
            <div style={styles.imageContainer}>
              <div style={styles.imageBackdrop}></div>
              <img 
                src={picture} 
                alt="Ifechukwu - Web Developer" 
                className="profile-image"
                style={styles.profileImage} 
              />
              <div style={styles.floatingElements}>
                <div style={{...styles.floatingElement, ...styles.element1}}>⚡</div>
                <div style={{...styles.floatingElement, ...styles.element2}}>🚀</div>
                <div style={{...styles.floatingElement, ...styles.element3}}>💻</div>
                <div style={{...styles.floatingElement, ...styles.element4}}>✨</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div style={styles.backgroundElements}>
          <div style={{...styles.bgElement, ...styles.bg1}}></div>
          <div style={{...styles.bgElement, ...styles.bg2}}></div>
          <div style={{...styles.bgElement, ...styles.bg3}}></div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator" style={styles.scrollIndicator}>
          <Link to="about" smooth={true} duration={500}>
            <div style={styles.scrollIndicatorLink}>
              <div style={styles.scrollMouse}>
                <div style={styles.scrollWheel}></div>
              </div>
              <span style={styles.scrollText}>Scroll to explore</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}