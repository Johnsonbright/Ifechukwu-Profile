import React, { useState, useEffect, useRef } from 'react';
import './Work.css';

// Updated portfolio data from GitHub projects
const portfolioData = [
  // React Projects
  {
    id: 1,
    title: "Ecommerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop",
    description: "Full-featured e-commerce solution built with React",
    technologies: ["React", "Stripe", "MongoDB"],
    link: "https://github.com/Johnsonbright/Ecommerce"
  },
  {
    id: 2,
    title: "Gemini Clone",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1611171711914-0b2e2a3f3bd6?w=500&h=400&fit=crop",
    description: "Recreated Gemini web interface using modern frontend tools",
    technologies: ["React", "Vite"],
    link: "https://github.com/Johnsonbright/Gemini-Clone"
  },
  {
    id: 3,
    title: "Bankist App",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=400&fit=crop",
    description: "Simulated online banking experience using React",
    technologies: ["React", "JavaScript"],
    link: "https://github.com/Johnsonbright/Bankist"
  },
  {
    id: 4,
    title: "News App",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&h=400&fit=crop",
    description: "Live news headlines built with React and APIs",
    technologies: ["React", "API", "CSS"],
    link: "https://github.com/Johnsonbright/NewsApp"
  },

  // React Native Projects
  {
    id: 5,
    title: "Chitchat - Social Media App",
    category: "Mobile Design",
    image: "https://images.unsplash.com/photo-1611605691625-62d201f20fda?w=500&h=400&fit=crop",
    description: "A full-fledged social platform with posts, mentions, and messaging",
    technologies: ["React Native", "Redux", "Firebase"],
    link: "https://github.com/Johnsonbright"
  },
  {
    id: 6,
    title: "ShopAndDeliver Onboarding",
    category: "Mobile Design",
    image: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?w=500&h=400&fit=crop",
    description: "Onboarding flow for a logistics/delivery mobile app",
    technologies: ["React Native", "Animations"],
    link: "https://github.com/Johnsonbright/shopanddeliver"
  },
  {
    id: 7,
    title: "iMovieApp",
    category: "Mobile Design",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&h=400&fit=crop",
    description: "Movie discovery and playback mobile app",
    technologies: ["React Native"],
    link: "https://github.com/Johnsonbright"
  },
  {
    id: 8,
    title: "React Native Password Generator",
    category: "Mobile Design",
    image: "https://images.unsplash.com/photo-1608315398428-e17340a0a93d?w=500&h=400&fit=crop",
    description: "Secure password generator app for mobile devices",
    technologies: ["React Native", "Random Logic"],
    link: "https://github.com/Johnsonbright/React-Native-Password-Generator"
  },
  {
    id: 9,
    title: "Aora - Video Upload Platform",
    category: "Mobile Design",
    image: "https://images.unsplash.com/photo-1611605691625-62d201f20fda?w=500&h=400&fit=crop",
    description: "Video creation and upload app supporting creators",
    technologies: ["React Native", "Video API"],
    link: "https://github.com/Johnsonbright"
  }
];

const categories = ["All", "Web Development", "Mobile Design"];

export default function Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(portfolioData);
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(portfolioData);
    } else {
      setFilteredProjects(
        portfolioData.filter((project) => project.category === activeCategory)
      );
    }
  }, [activeCategory]);

  const handleCategoryChange = (category) => setActiveCategory(category);

  return (
    <section id="works" className="portfolio-section" ref={sectionRef}>
      {/* Background Elements */}
      <div className="portfolio-bg-elements">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="portfolio-container">
        {/* Header Section */}
        <div className={`portfolio-header ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="work-title">
            My Portfolio
            <span className="title-highlight">.</span>
          </h2>
          <div className="title-decoration"></div>
          <p className="work-description">
            I take pride in crafting digital experiences that combine beautiful design with 
            flawless functionality. Each project represents my commitment to excellence, 
            attention to detail, and passion for creating solutions that drive results.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`category-filter ${isVisible ? 'animate-in-delayed' : ''}`}>
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
              <span className="filter-count">
                {category === "All" ? portfolioData.length : portfolioData.filter(p => p.category === category).length}
              </span>
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className={`portfolio-grid ${isVisible ? 'animate-in-grid' : ''}`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`portfolio-item ${isVisible ? 'animate-in' : ''}`}
              style={{ animationDelay: `${0.1 * index}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                  onError={(e) => {
                   e.target.onerror = null;
                   e.target.src = "assets/placeholder.png"; // Fallback image
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <button className="preview-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <button className="link-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="category-badge">
                  {project.category}
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {/* Technologies */}
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effects */}
              <div className={`project-glow ${hoveredProject === project.id ? 'active' : ''}`}></div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className={`load-more-section ${isVisible ? 'animate-in-final' : ''}`}>
          <div className="load-more-content">
            <p className="load-more-text">
              Want to see more of my work? Check out my complete portfolio and case studies.
            </p>
                <a
            href="https://github.com/Johnsonbright?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="load-more-btn-link"
          >
            <button className="load-more-btn">
              <span>View Complete Portfolio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
              </a>
          </div>
          
          {/* Stats */}
          <div className="portfolio-stats">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="floating-contact">
        <button className="fab-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span className="fab-tooltip">Let's Work Together</span>
        </button>
      </div>
    </section>
  );
}