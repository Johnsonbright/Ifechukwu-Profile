// import React, {useState} from 'react';
// import './Navbar.css'
// import logo from '../../assets/logo.jpg'
// import {Link} from 'react-scroll'
// import dropmenu from '../../assets/dropmenu.png'

// export default function Navbar() {
//   const[showMenu, setShowMenu] = useState(false)
//   return (
//     <nav className="Navbar">
//      <img src={logo} alt="logo" className='logo' />
//      <div className = "desktopmenu" >
//  <Link className="desktopmenulistitem" activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500}>Home</Link>
//  <Link activeClass='active' to='skill' spy={true} smooth={true} duration={500} offset={-60} className="desktopmenulistitem">About</Link>
//  <Link activeClass="active" to='works' spy={true} smooth={true} duration={500} offset={-100} className="desktopmenulistitem">Porfolio</Link>
//  <Link activeClass='active' to='clients' spy={true} smooth={true} duration={500} offset={-100} className="desktopmenulistitem">Client</Link>
//      </div>
//      <button className="desktopmenubutton" onClick={()=>{
//       document.getElementById('contact').scrollIntoView({behaviour:'smooth'})
//      }}>
//       <div className="desktopmenutext">Contact me </div>
//      </button>

//      <img src={dropmenu} alt="menu" className='mobMenu' onClick={()=>{setShowMenu(!showMenu)}}/>
//      <div className = "navMenu" style={{display: showMenu? 'flex':'none'}}>
//  <Link className="listItem" activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} onClick={()=>{setShowMenu(false)}} >Home</Link>
//  <Link activeClass='active' to='skill' spy={true} smooth={true} duration={500} offset={-60} className="listItem" onClick={()=>{setShowMenu(false)}}>About</Link>
//  <Link activeClass="active" to='works' spy={true} smooth={true} duration={500} offset={-100} className="listItem" onClick={()=>{setShowMenu(false)}} >Porfolio</Link>
//  <Link activeClass='active' to='clients' spy={true} smooth={true} duration={500} offset={-100} className="listItem" onClick={()=>{setShowMenu(false)}}>Client</Link>
//  <Link activeClass='active' to='clients' spy={true} smooth={true} duration={500} offset={-100} className="listItem" onClick={()=>{setShowMenu(false)}}>Contact</Link>
//      </div>
//     </nav>
//   )
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';
import logo from '../../assets/logo.jpg';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  // Navigation items configuration
  const navItems = [
    { id: 'intro', label: 'Home', offset: -100 },
    { id: 'skill', label: 'About', offset: -60 },
    { id: 'works', label: 'Portfolio', offset: -100 },
    { id: 'clients', label: 'Clients', offset: -100 },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.navbar')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setShowMenu(!showMenu);
  };

  // Handle contact button click
  const handleContactClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setShowMenu(false);
  };

  // Handle nav item click
  const handleNavClick = () => {
    setShowMenu(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-brand">
            <Link
              to="intro"
              smooth={true}
              duration={500}
              className="logo-link"
            >
              <img src={logo} alt="Ifechukwu Logo" className="navbar-logo" />
              <span className="brand-text">Ifechukwu</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <Link
                    activeClass="active"
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={item.offset}
                    duration={500}
                    className="nav-link"
                    onSetActive={() => setActiveSection(item.id)}
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
          >
            <span>Contact Me</span>
            <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${showMenu ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={showMenu}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${showMenu ? 'active' : ''}`}>
          <div className="mobile-nav-content">
            <div className="mobile-nav-header">
              <img src={logo} alt="Logo" className="mobile-logo" />
              <h3>Navigation</h3>
            </div>
            
            <ul className="mobile-nav-list">
              {navItems.map((item, index) => (
                <li key={item.id} className="mobile-nav-item" style={{ '--delay': `${index * 0.1}s` }}>
                  <Link
                    activeClass="active"
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={item.offset}
                    duration={500}
                    className="mobile-nav-link"
                    onClick={handleNavClick}
                  >
                    <span className="mobile-nav-number">0{index + 1}</span>
                    <span className="mobile-nav-text">{item.label}</span>
                    <svg className="mobile-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </li>
              ))}
              <li className="mobile-nav-item mobile-cta-item" style={{ '--delay': `${navItems.length * 0.1}s` }}>
                <button className="mobile-cta-button" onClick={handleContactClick}>
                  <span className="mobile-nav-number">0{navItems.length + 1}</span>
                  <span className="mobile-nav-text">Contact</span>
                  <svg className="mobile-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </button>
              </li>
            </ul>

            {/* Mobile Social Links */}
            <div className="mobile-social">
              <p>Let's connect</p>
              <div className="mobile-social-links">
                <a href="#" className="mobile-social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="mobile-social-link" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="mobile-social-link" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {showMenu && <div className="mobile-backdrop" onClick={() => setShowMenu(false)}></div>}
    </>
  );
}
