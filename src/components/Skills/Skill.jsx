// import React from 'react';
// import './skill.css';
// import ui from '../../assets/ui.jpeg';
// import webdesign from '../../assets/webdesign.jpeg';
// import appdesign from '../../assets/appdesign.jpg'


// export default function skill() {
//   return (
//     <section id="skill">
//       <span className="skillTitle">What I do </span>
//       <span className="skillDesc">I am a skilled and passionate web designer with experience in creating visually appealing and user-friendly websites. I have a strong understanding of design and a keen eye for detail. i am proficient in HTML, CSS, and Javascript.</span>
//       <div className="skillBars">
//         <div className="skillBar">
//           <img src={ui} alt="Uidesign" className="skillBarImg" />
//           <div className="skillBarText">
//             <h2>UI/UX Design</h2>
//             <p>This is a demo text</p>
//           </div>
//         </div>

//         <div className="skillBar">
//           <img src={webdesign} alt="webdesign" className="skillBarImg" />
//           <div className="skillBarText">
//             <h2>Website Design</h2>
//             <p>This is a demo text</p>
//           </div>
//         </div>

//         <div className="skillBar">
//           <img src={appdesign} alt="appdesign" className="skillBarImg" />
//           <div className="skillBarText">
//             <h2>App Design</h2>
//             <p>This is a demo text</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


import React, { useState, useEffect, useRef } from 'react';
import './skill.css';

// Mock images - replace with your actual imports
const ui = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop&crop=center';
const webdesign = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop&crop=center';
const appdesign = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop&crop=center';

export default function Skill() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  const skills = [
    {
      id: 1,
      title: "UI/UX Design",
      description: "Creating intuitive and visually stunning user interfaces that provide exceptional user experiences across all platforms.",
      image: ui,
      technologies: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Web Development",
      description: "Building responsive, high-performance websites using modern technologies and best practices for optimal user engagement.",
      image: webdesign,
      technologies: ["React", "HTML5", "CSS3", "JavaScript"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Mobile App Design",
      description: "Designing beautiful, functional mobile applications that deliver seamless experiences on iOS and Android platforms.",
      image: appdesign,
      technologies: ["React Native", "Flutter", "iOS", "Android"],
      color: "from-green-500 to-teal-500"
    }
  ];

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

  return (
    <section id="skill" className="skills-section" ref={sectionRef}>
      {/* Background Elements */}
      <div className="skills-bg-elements">
        <div className="skills-bg-circle circle-1"></div>
        <div className="skills-bg-circle circle-2"></div>
        <div className="skills-bg-circle circle-3"></div>
      </div>

      <div className="skills-container">
        {/* Header */}
        <div className={`skills-header ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="skills-title">What I Do</h2>
          <div className="skills-title-decoration"></div>
          <p className="skills-description">
            I'm a passionate developer and designer who creates digital experiences that matter. 
            With expertise spanning UI/UX design, web development, and mobile applications, 
            I bring ideas to life through clean code and innovative design solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div className={`skills-grid ${isVisible ? 'animate-in-delayed' : ''}`}>
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className={`skill-card ${isVisible ? 'animate-in' : ''}`}
              style={{ animationDelay: `${0.2 * index}s` }}
              onMouseEnter={() => setHoveredCard(skill.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Background Gradient */}
              <div className={`card-gradient bg-gradient-to-br ${skill.color}`}></div>
              
              {/* Card Content */}
              <div className="card-content">
                {/* Image Container */}
                <div className="skill-image-container">
                  <div className="image-backdrop"></div>
                  <img 
                    src={skill.image} 
                    alt={skill.title} 
                    className="skill-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-icon">
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
                <div className="skill-content">
                  <h3 className="skill-title">{skill.title}</h3>
                  <p className="skill-desc">{skill.description}</p>
                  
                  {/* Technologies */}
                  <div className="skill-technologies">
                    {skill.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effects */}
                <div className={`card-glow ${hoveredCard === skill.id ? 'active' : ''}`}></div>
              </div>

              {/* Floating Particles */}
              <div className="floating-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`skills-cta ${isVisible ? 'animate-in-final' : ''}`}>
          <div className="cta-content">
            <h3>Ready to bring your ideas to life?</h3>
            <p>Let's collaborate and create something amazing together.</p>
            <button className="cta-button">
              <span>Get In Touch</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress">
        <div className="progress-bar"></div>
      </div>
    </section>
  );
}