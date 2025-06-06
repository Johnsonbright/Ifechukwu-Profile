// import React from 'react'
// import './Work.css';
// import portfolio1 from '../../assets/porfolio1.jpeg'
// import portfolio2 from '../../assets/portfolio2.jpg'
// import portfolio3 from '../../assets/portfolio3.png'
// import portfolio4 from '../../assets/portfolio4.jpeg'
// import portfolio5 from '../../assets/Portfolio5.jpeg'
// import portfolio6 from '../../assets/portfolio6.avif'

// export default function Work() {
//   return (
//     <section id='works'>
//       <h2 className="workTitle">My Portfolio</h2>
//       <p className="workDesc">I take pride in paying attention to the smallest details and making sure that my work is pixel perfect. I am excited to bring my skills and experience to help business achive their goals and create a strong online presence.</p>
//       <div className="worksImgs">
//         <img src={portfolio1} alt="portfolio1" className="worksimg" />
//         <img src={portfolio2} alt="portfolio2" className="worksimg" /><img src={portfolio3} alt="portfolio3" className="worksimg" /><img src={portfolio4} alt="portfolio4" className="worksimg" />
//         <img src={portfolio5} alt="portfolio5" className="worksimg" /><img src={portfolio6} alt="porfolio6"className="worksimg" />
//       </div>
//       <button className="worksBtn">See More</button>
//     </section>
//   )
// }


import React, { useState, useEffect, useRef } from 'react';
import './Work.css';

// Mock portfolio data - replace with your actual imports and data
const portfolioData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop",
    description: "Modern e-commerce solution with advanced features",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    category: "Mobile Design",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=400&fit=crop",
    description: "Secure banking application with intuitive UX",
    technologies: ["React Native", "Firebase", "Biometrics"],
    link: "#"
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop",
    description: "Analytics dashboard for business intelligence",
    technologies: ["Vue.js", "D3.js", "Chart.js"],
    link: "#"
  },
  {
    id: 4,
    title: "Real Estate Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop",
    description: "Property listing and management system",
    technologies: ["React", "Express", "PostgreSQL"],
    link: "#"
  },
  {
    id: 5,
    title: "Food Delivery App",
    category: "Mobile Design",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop",
    description: "On-demand food delivery mobile application",
    technologies: ["Flutter", "Firebase", "Maps API"],
    link: "#"
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=400&fit=crop",
    description: "Creative portfolio with modern animations",
    technologies: ["React", "Three.js", "GSAP"],
    link: "#"
  }
];

const categories = ["All", "Web Development", "Mobile Design", "UI/UX Design"];

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(portfolioData);
    } else {
      setFilteredProjects(portfolioData.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

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
            <button className="load-more-btn">
              <span>View Complete Portfolio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
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