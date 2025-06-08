
import React, { useState, useEffect, useRef } from 'react';

// Mock images - replace with your actual imports
const ui = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop&crop=center';
const webdesign = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop&crop=center';
const appdesign = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop&crop=center';

export default function Skill() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    {
      id: 1,
      title: "Front-End Development",
      description: "Specialized in building responsive, high-performance user interfaces using React, JavaScript, and TypeScript. Committed to clean, maintainable code and seamless user experiences.",
      shortDesc: "Building responsive UIs with React & TypeScript for seamless user experiences.",
      image: webdesign,
      technologies: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Git"],
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Experienced in building and optimizing cross-platform mobile applications with React Native. Focused on clean architecture, state management, and feature-rich user interfaces.",
      shortDesc: "Cross-platform mobile apps with React Native & clean architecture.",
      image: appdesign,
      technologies: ["React Native", "Redux", "TypeScript", "Android", "iOS"],
      color: "from-green-600 to-teal-600"
    },
    {
      id: 3,
      title: "UI/UX Implementation",
      description: "Collaborates closely with product and design teams to bring wireframes and prototypes to life, ensuring intuitive and engaging user experiences.",
      shortDesc: "Bringing wireframes to life with intuitive user experiences.",
      image: ui,
      technologies: ["Figma", "Prototyping", "User Flow", "Component Design"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Responsive breakpoint detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const styles = {
    skillsSection: {
      minHeight: '100vh',
      padding: isMobile ? '2rem 1rem' : isTablet ? '3rem 1.5rem' : '4rem 2rem',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      position: 'relative',
      overflow: 'hidden'
    },
    
    skillsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    },

    skillsBgElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    },

    skillsBgCircle: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
      animation: 'backgroundFloat 8s ease-in-out infinite'
    },

    circle1: {
      width: isMobile ? '150px' : '300px',
      height: isMobile ? '150px' : '300px',
      top: '10%',
      left: '-10%',
      animationDelay: '0s'
    },

    circle2: {
      width: isMobile ? '100px' : '200px',
      height: isMobile ? '100px' : '200px',
      top: '50%',
      right: '-5%',
      animationDelay: '3s'
    },

    circle3: {
      width: isMobile ? '75px' : '150px',
      height: isMobile ? '75px' : '150px',
      bottom: '20%',
      left: '20%',
      animationDelay: '6s'
    },

    skillsHeader: {
      textAlign: 'center',
      marginBottom: isMobile ? '2rem' : '4rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease-out'
    },

    skillsTitle: {
      fontSize: isMobile ? '2rem' : isTablet ? '3rem' : 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: 800,
      color: 'white',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      position: 'relative'
    },

    skillsTitleDecoration: {
      width: isMobile ? '60px' : '100px',
      height: '4px',
      background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
      margin: isMobile ? '0.5rem auto 1rem' : '1rem auto 2rem',
      borderRadius: '2px',
      animation: isVisible ? 'expandWidth 1s ease-out 0.5s both' : 'none'
    },

    skillsDescription: {
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: isMobile ? '100%' : '600px',
      margin: '0 auto',
      animation: isVisible ? 'fadeInUp 0.8s ease-out 0.3s both' : 'none'
    },

    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: isMobile ? '1.5rem' : '2rem',
      marginBottom: isMobile ? '2rem' : '4rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease-out',
      transitionDelay: '0.4s'
    },

    skillCard: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: isMobile ? '15px' : '20px',
      padding: isMobile ? '1.5rem' : '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.4s ease',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
      cursor: 'pointer'
    },

    skillCardHover: {
      transform: 'translateY(-10px) scale(1.02)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
    },

    cardGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: hoveredCard ? 0.2 : 0.1,
      transition: 'opacity 0.3s ease'
    },

    cardContent: {
      position: 'relative',
      zIndex: 2
    },

    skillImageContainer: {
      position: 'relative',
      width: isMobile ? '60px' : '80px',
      height: isMobile ? '60px' : '80px',
      marginBottom: '1.5rem'
    },

    imageBackdrop: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      borderRadius: isMobile ? '15px' : '20px',
      backdropFilter: 'blur(10px)'
    },

    skillImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: isMobile ? '15px' : '20px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease'
    },

    skillImageHover: {
      transform: 'scale(1.1)',
      borderColor: 'rgba(255, 255, 255, 0.4)'
    },

    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: isMobile ? '15px' : '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: hoveredCard ? 1 : 0,
      transition: 'opacity 0.3s ease'
    },

    overlayIcon: {
      width: '30px',
      height: '30px',
      color: 'white'
    },

    skillContent: {
      flex: 1
    },

    skillTitle: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },

    skillDesc: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '1.5rem'
    },

    skillTechnologies: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },

    techTag: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      color: 'rgba(255, 255, 255, 0.9)',
      padding: isMobile ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      fontWeight: 500,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease'
    },

    techTagHover: {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)'
    },

    cardGlow: {
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      width: 'calc(100% + 4px)',
      height: 'calc(100% + 4px)',
      background: 'linear-gradient(45deg, #ff6b6b, #ffd93d, #ff9a9e, #fecfef)',
      borderRadius: isMobile ? '17px' : '22px',
      opacity: hoveredCard ? 0.7 : 0,
      zIndex: -1,
      animation: hoveredCard ? 'glowRotate 3s linear infinite' : 'none',
      transition: 'opacity 0.3s ease'
    },

    floatingParticles: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden'
    },

    particle: {
      position: 'absolute',
      width: '4px',
      height: '4px',
      background: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '50%',
      animation: 'particleFloat 4s ease-in-out infinite'
    },

    particle1: {
      top: '15%',
      left: '15%',
      animationDelay: '0s'
    },

    particle2: {
      top: '25%',
      right: '20%',
      animationDelay: '1.5s'
    },

    particle3: {
      bottom: '20%',
      left: '25%',
      animationDelay: '3s'
    },

    skillsCta: {
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: isMobile ? '15px' : '20px',
      padding: isMobile ? '2rem 1rem' : '3rem 2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease-out',
      transitionDelay: '0.8s'
    },

    ctaContentH3: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },

    ctaContentP: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '2rem'
    },

    ctaButton: {
      background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
      color: 'white',
      border: 'none',
      padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
      borderRadius: '50px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)'
    },

    ctaButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 15px 40px rgba(255, 107, 107, 0.4)'
    },

    ctaButtonSvg: {
      width: isMobile ? '16px' : '20px',
      height: isMobile ? '16px' : '20px',
      transition: 'transform 0.3s ease'
    },

    scrollProgress: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'rgba(255, 255, 255, 0.1)',
      zIndex: 1000
    },

    progressBar: {
      height: '100%',
      background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
      width: isVisible ? '100%' : '0%',
      transition: 'width 0.1s ease'
    }
  };

  // CSS keyframes as a style tag
  const keyframes = `
    @keyframes cardSlideIn {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes expandWidth {
      from {
        width: 0;
      }
      to {
        width: ${isMobile ? '60px' : '100px'};
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes backgroundFloat {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(50px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-30px, 30px) scale(0.9);
      }
    }

    @keyframes glowRotate {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes particleFloat {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-30px) rotate(180deg);
        opacity: 1;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <section id="skill" style={styles.skillsSection} ref={sectionRef}>
        {/* Background Elements */}
        <div style={styles.skillsBgElements}>
          <div style={{...styles.skillsBgCircle, ...styles.circle1}}></div>
          <div style={{...styles.skillsBgCircle, ...styles.circle2}}></div>
          <div style={{...styles.skillsBgCircle, ...styles.circle3}}></div>
        </div>

        <div style={styles.skillsContainer}>
          {/* Header */}
          <div style={styles.skillsHeader}>
            <h2 style={styles.skillsTitle}>What I Do</h2>
            <div style={styles.skillsTitleDecoration}></div>
            <p style={styles.skillsDescription}>
              {isMobile 
                ? "I'm a passionate developer creating digital experiences with modern technologies and clean code."
                : "I'm a passionate developer and designer who creates digital experiences that matter. With expertise spanning UI/UX design, web development, and mobile applications, I bring ideas to life through clean code and innovative design solutions."
              }
            </p>
          </div>

          {/* Skills Grid */}
          <div style={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                style={{
                  ...styles.skillCard,
                  ...(hoveredCard === skill.id ? styles.skillCardHover : {}),
                  animationDelay: `${0.2 * index}s`
                }}
                onMouseEnter={() => setHoveredCard(skill.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Background Gradient */}
                <div style={{
                  ...styles.cardGradient,
                  background: skill.color === 'from-blue-600 to-indigo-600' ? 'linear-gradient(to bottom right, #2563eb, #4f46e5)' :
                             skill.color === 'from-green-600 to-teal-600' ? 'linear-gradient(to bottom right, #059669, #0d9488)' :
                             'linear-gradient(to bottom right, #a855f7, #ec4899)'
                }}></div>
                
                {/* Card Content */}
                <div style={styles.cardContent}>
                  {/* Image Container */}
                  <div style={styles.skillImageContainer}>
                    <div style={styles.imageBackdrop}></div>
                    <img 
                      src={skill.image} 
                      alt={skill.title} 
                      style={{
                        ...styles.skillImage,
                        ...(hoveredCard === skill.id ? styles.skillImageHover : {})
                      }}
                    />
                    <div style={styles.imageOverlay}>
                      <div style={styles.overlayIcon}>
                        {skill.id === 1 && (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        )}
                        {skill.id === 2 && (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                          </svg>
                        )}
                        {skill.id === 3 && (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1Z"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div style={styles.skillContent}>
                    <h3 style={styles.skillTitle}>{skill.title}</h3>
                    <p style={styles.skillDesc}>
                      {isMobile ? skill.shortDesc : skill.description}
                    </p>
                    
                    {/* Technologies */}
                    <div style={styles.skillTechnologies}>
                      {(isMobile ? skill.technologies.slice(0, 4) : skill.technologies).map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          style={styles.techTag}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {isMobile && skill.technologies.length > 4 && (
                        <span style={styles.techTag}>+{skill.technologies.length - 4}</span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div style={{
                    ...styles.cardGlow,
                    opacity: hoveredCard === skill.id ? 0.7 : 0
                  }}></div>
                </div>

                {/* Floating Particles */}
                {!isMobile && (
                  <div style={styles.floatingParticles}>
                    <div style={{...styles.particle, ...styles.particle1}}></div>
                    <div style={{...styles.particle, ...styles.particle2}}></div>
                    <div style={{...styles.particle, ...styles.particle3}}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div style={styles.skillsCta}>
            <div>
              <h3 style={styles.ctaContentH3}>
                {isMobile ? "Let's Work Together" : "Ready to bring your ideas to life?"}
              </h3>
              <p style={styles.ctaContentP}>
                {isMobile 
                  ? "Let's create something amazing together." 
                  : "Let's collaborate and create something amazing together."
                }
              </p>
              <button 
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(255, 107, 107, 0.4)';
                  e.target.querySelector('svg').style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.3)';
                  e.target.querySelector('svg').style.transform = 'translateX(0)';
                }}
              >
                <span>Get In Touch</span>
                <svg style={styles.ctaButtonSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div style={styles.scrollProgress}>
          <div style={styles.progressBar}></div>
        </div>
      </section>
    </>
  );
}